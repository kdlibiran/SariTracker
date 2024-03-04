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

export default function ActionDropDown({ item }: { item: any }) {
  const addStock = async (formData: FormData) => {
    const supabase = createClient();
    const quantity = formData.get("quantity") ?? "0";
    const expiry = formData.get("expiry");
    const date = new Date().toLocaleDateString();
    console.log(date, expiry, quantity, item.id);
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
    const earliestExpiry = item.expiry?.date < expiry! ? item.expiry : expiry;

    const { data: itemData, error: itemError } = await supabase
      .from("items")
      .update({
        quantity: item.quantity + quantity.toString(),
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
    const quantity = formData.get("quantity") ?? "0";
    const date = new Date().toLocaleDateString();
    const { data, error } = await supabase.from("salesrecord").insert({
      item_id: item.id,
      quantity,
      date,
    });
    if (error) {
      console.log(error);
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
          <DropdownMenuItem>Remove Stock</DropdownMenuItem>
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
