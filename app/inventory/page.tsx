import NavBar from "@/components/NavBar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AddItemBtn from "@/components/AddItemBtn";
import InventoryTable from "@/components/InventoryTable";

export default async function Index() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("user_id", user?.id);
  if (error) {
    console.error(error);
  }

  if (user) {
    return (
      <div className="flex w-full flex-1 flex-col items-center gap-20">
        <NavBar />
        <div className="flex flex-col">
          <AddItemBtn />
          <InventoryTable data={data} />
        </div>
      </div>
    );
  } else {
    return redirect("/");
  }
}
