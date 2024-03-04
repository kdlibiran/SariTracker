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

export default function AddItemBtn({
  formAction,
}: {
  formAction: (formData: FormData) => Promise<any> | null;
}) {
  const categories = ["Food", "Non-Food", "Beverage"];
  const [open, setOpen] = useState(false);

  const passForm = async (formData: FormData) => {
    const response = await formAction(formData);
    if (response == 1) {
      setOpen(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="rounded-md border border-black px-4 py-2">
        Add
      </SheetTrigger>
      <SheetContent className="bg-white">
        <SheetHeader>
          <SheetTitle>Add Item</SheetTitle>
          <SheetDescription>
            Fill in the form below to add a new item to the inventory
            <div>
              <form className="flex flex-1 flex-col justify-start gap-2 rounded-md p-2 pt-5">
                <label htmlFor="name" className="text-md">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="rounded-md border bg-inherit px-4 py-2"
                />
                <label htmlFor="category" className="text-md">
                  Category
                </label>
                <select
                  className="appearance-none rounded-md border bg-inherit px-4 py-2"
                  name="category"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <label htmlFor="price" className="text-md">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  className="rounded-md border bg-inherit px-4 py-2"
                />

                <SubmitButton
                  formAction={passForm}
                  className="mb-2 rounded-md border bg-black px-4 py-2 text-white"
                  pendingText="Adding..."
                >
                  Add Item
                </SubmitButton>
              </form>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
