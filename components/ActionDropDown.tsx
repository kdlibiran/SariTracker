"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import AddStockBtn from "./AddStockBtn";
import { createClient } from "@/utils/supabase/client";
import EditItemBtn from "./EditItemBtn";
import DeleteItemBtn from "./DeleteItemBtn";
import RemoveStockBtn from "./RemoveStockBtn";

export default function ActionDropDown({ item }: { item: any }) {
  const addStock = async (formData: FormData) => {
    const supabase = createClient();
    const quantity = formData.get("quantity") ?? "0";
    const expiry = formData.get("expiry");
    const date = new Date().toLocaleDateString();
    const { data, error } = await supabase.from("purchaserecord").insert({
      item_id: item.id,
      quantity,
      currentquantity: quantity,
      expiry,
      date,
    });
    if (error) {
      console.log(error);
    }
    //compare expiry date with current earliest expiry date
    const earliestExpiry = item.expiry?.date > expiry! ? item.expiry : expiry;

    const { data: itemData, error: itemError } = await supabase
      .from("items")
      .update({
        quantity: parseInt(item.quantity) + parseInt(quantity.toString()),
        expiry: earliestExpiry,
      })
      .eq("id", item.id);
    return 1;
  };

  const editItem = async (formData: FormData) => {
    const supabase = createClient();
    const name = formData.get("name");
    const { data: editData, error: editError } = await supabase
      .from("items")
      .update({ name })
      .eq("id", item.id);
    if (editError) {
      console.log(editError);
    }
    return 1;
  };

  const removeStock = async (formData: FormData) => {
    const supabase = createClient();
    const quantity = formData.get("quantity") ?? 0;
    const date = new Date().toLocaleDateString();
    const quantityInt = parseInt(quantity.toString());
    const itemQuantity: number = item.quantity ?? 0;
    const itemSales: number = item.sales ?? 0;
    if (quantityInt > itemQuantity) {
      alert("Not enough stock!");
      return;
    }
    try {
      const { data, error } = await supabase.from("salesrecord").insert([
        {
          itemid: item.id,
          quantity: quantityInt,
          date,
        },
      ]);
      if (error) throw error;

      const newQuantity = (itemQuantity ?? 0) - quantityInt;
      const newSales = (itemSales ?? 0) + quantityInt;

      //get earliest expiry date from purchase record and its current quantity

      let buffer: number = quantityInt;
      do {
        let { data: earliestExpiryData, error: earliestExpiryError } =
          await supabase
            .from("purchaserecord")
            .select("id, expiry, currentquantity")
            .eq("item_id", item.id)
            .order("expiry", { ascending: true })
            .gt("currentquantity", 0)
            .limit(1)
            .single();

        if (earliestExpiryError) throw earliestExpiryError;
        let newCurrentQuantity = 0;
        const currQuantity: number = earliestExpiryData?.currentquantity ?? 0;

        if (earliestExpiryData?.currentquantity > buffer) {
          newCurrentQuantity = currQuantity - buffer;
          buffer = 0;
        } else {
          buffer = quantityInt - currQuantity;
        }
        const { error: updatePurchaseError } = await supabase
          .from("purchaserecord")
          .update({
            currentquantity: newCurrentQuantity,
          })
          .eq("id", parseInt(earliestExpiryData?.id));

        if (updatePurchaseError) throw updatePurchaseError;
        console.log(newCurrentQuantity);
      } while (buffer !== 0);

      const { data: earliestExpiryData, error: earliestExpiryError } =
        await supabase
          .from("purchaserecord")
          .select("expiry, currentquantity")
          .eq("item_id", item.id)
          .order("expiry", { ascending: true })
          .gt("currentquantity", 0)
          .limit(1)
          .single();

      const newExpiry = earliestExpiryData?.expiry ?? null;

      const { error: updateError } = await supabase
        .from("items")
        .update({
          quantity: newQuantity,
          sales: newSales,
          expiry: newExpiry,
        })
        .eq("id", item.id);
      if (updateError) throw updateError;
    } catch (error: any) {
      alert(error.message);
    } finally {
      return 1;
    }
  };

  const deleteItem = async () => {
    const supabase = createClient();

    const { data: deleteData, error: deleteError } = await supabase
      .from("items")
      .delete()
      .eq("id", item.id);
    if (deleteError) {
      console.log(deleteError);
    }
    return 1;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        <DropdownMenuLabel>{item?.name} Actions </DropdownMenuLabel>
        <div className="flex flex-col ">
          <AddStockBtn item={item} formAction={addStock} />
          <RemoveStockBtn item={item} formAction={removeStock} />
        </div>
        <DropdownMenuSeparator />
        <div className="flex flex-col ">
          <EditItemBtn item={item} formAction={editItem} />
          <DeleteItemBtn item={item} formAction={deleteItem} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
