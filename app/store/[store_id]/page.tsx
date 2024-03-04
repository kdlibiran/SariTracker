import { createClient } from "@/utils/supabase/server";
import NavBar from "@/components/NavBar";
import InventoryTable from "@/components/InventoryTable";
import AuthButton from "@/components/AuthButton";
import { item, store } from "@/types/supabase";

export default async function ({ params }: { params: { store_id: string } }) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("store_id", params.store_id);
  const { data: storeData, error: storeError } = await supabase
    .from("stores")
    .select("*")
    .eq("id", params.store_id);
  return (
    <div className="flex w-full flex-1 flex-col items-center">
      <nav className="border-b-foreground/10 flex h-16 w-full justify-center border-b">
        <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
          SariTracker
          <AuthButton />
        </div>
      </nav>
      <div className="flex w-3/4 flex-col px-10">
        <h1 className="mt-10 text-4xl font-bold">
          {storeData ? storeData[0].name : "Store"} Inventory
        </h1>
        <h2 className="text-foreground/60 mb-12 text-lg">
          {storeData ? storeData[0].location : "Location"}
        </h2>
        <InventoryTable data={data as item[]} owner={false} formAction={null} />
      </div>
    </div>
  );
}
