import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetClose,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { createClient } from "@/utils/supabase/server";
import { SubmitButton } from "@/components/submit-button";

export default function AddItemBtn() {
  const categories = ["Food", "Non-Food", "Beverage"];

  const addItem = async (formData: FormData) => {
    "use server";
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const store_id = user?.user_metadata?.store_id;
    console.log(store_id);
    const name = formData.get("name");
    const category = formData.get("category");
    const price = formData.get("price");

    const { data, error } = await supabase.from("items").insert({
      name: name,
      category: category,
      quantity: 0,
      sales: 0,
      price: price,
      store_id: store_id,
    });
    if (error) {
      console.error(error);
    } else {
    }
  };

  return (
    <Sheet>
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
                  formAction={addItem}
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
