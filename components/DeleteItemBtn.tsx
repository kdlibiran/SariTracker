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

export default function DeleteItemBtn({
  item,
  formAction,
}: {
  item: any;
  formAction: (data: any) => Promise<any>;
}) {
  const [open, setOpen] = useState(false);
  const deleteItem = async () => {
    const response = await formAction(null);
    if (response == 1) {
      setOpen(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Delete Item
        </DropdownMenuItem>
      </SheetTrigger>
      <SheetContent className="bg-white">
        <SheetHeader>
          <SheetTitle>{item.name}: Delete Item</SheetTitle>
          <SheetDescription>
            Are you sure you want to delete {item.name}?
            <div>
              <form className="flex flex-1 flex-col justify-start gap-2 rounded-md p-2 pt-5">
                <SubmitButton
                  formAction={deleteItem}
                  className="mb-2 rounded-md border bg-red-500 px-4 py-2 text-white"
                  pendingText="Deleting..."
                >
                  Delete Item
                </SubmitButton>
              </form>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
