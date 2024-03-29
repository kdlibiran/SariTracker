import NavBar from "@/components/NavBar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import InventoryTable from "@/components/InventoryTable";
import { item } from "@/types/supabase";

export default async function Index() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("items")
    .select("*, purchaserecord(*), salesrecord(*)")
    .eq("user_id", user?.id);
  if (error) {
    console.error(error);
  }

  const addItem = async (formData: FormData) => {
    "use server";
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const store_id = user?.user_metadata?.store_id;
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
      return 1;
    }
  };

  if (user) {
    return (
      <div className="flex w-full flex-1 flex-col items-center gap-20">
        <NavBar />
        <div className="flex w-3/4 flex-col px-10">
          <InventoryTable
            data={data as item[]}
            owner={true}
            formAction={addItem}
          />
        </div>
      </div>
    );
  } else {
    return redirect("/");
  }
}
