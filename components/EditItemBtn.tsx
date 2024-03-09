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

export default function EditItemBtn({
  item,
  formAction,
}: {
  item: any;
  formAction: (data: any) => Promise<any>;
}) {
  const [open, setOpen] = useState(false);
  const editItem = async (formData: FormData) => {
    const response = await formAction(formData);
    if (response == 1) {
      setOpen(false);
      window.location.reload();
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Edit Item
        </DropdownMenuItem>
      </SheetTrigger>
      <SheetContent className="bg-white">
        <SheetHeader>
          <SheetTitle>{item.name}: Edit Item</SheetTitle>
          <SheetDescription>
            Fill in the form below to edit {item.name}
            <div>
              <form className="flex flex-1 flex-col justify-start gap-2 rounded-md p-2 pt-5">
                <label htmlFor="name" className="text-md">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={item.name}
                  className="rounded-md border bg-inherit px-4 py-2"
                />
                <label htmlFor="price" className="text-md">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  defaultValue={item.price}
                  className="rounded-md border bg-inherit px-4 py-2"
                />
                <SubmitButton
                  formAction={editItem}
                  className="mb-2 rounded-md border bg-black px-4 py-2 text-white"
                  pendingText="Editing..."
                >
                  Edit Item
                </SubmitButton>
              </form>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
