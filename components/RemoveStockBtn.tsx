"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetClose,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SubmitButton } from "@/components/submit-button";
import { useState } from "react";
import { DropdownMenuItem } from "./ui/dropdown-menu";

export default function RemoveStockBtn({
  item,
  formAction,
}: {
  item: any;
  formAction: (data: any) => Promise<any>;
}) {
  const [open, setOpen] = useState(false);
  const removeStock = async (formData: FormData) => {
    const response = await formAction(formData);
    if (response == 1) {
      setOpen(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Remove Stock
        </DropdownMenuItem>
      </SheetTrigger>
      <SheetContent className="bg-white">
        <SheetHeader>
          <SheetTitle>{item.name}: Remove Stock</SheetTitle>
          <SheetDescription>
            Fill in the form below to remove stocks for {item.name}
            <div>
              <form className="flex flex-1 flex-col justify-start gap-2 rounded-md p-2 pt-5">
                <label htmlFor="quantity" className="text-md">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  className="rounded-md border bg-inherit px-4 py-2"
                />
                <SubmitButton
                  formAction={removeStock}
                  className="mb-2 rounded-md border bg-black px-4 py-2 text-white"
                  pendingText="Removing..."
                >
                  Remove Stock
                </SubmitButton>
              </form>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
