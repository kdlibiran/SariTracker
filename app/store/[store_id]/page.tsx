import { createClient } from "@/utils/supabase/server";
import NavBar from "@/components/NavBar";
import InventoryTable from "@/components/InventoryTable";
import AuthButton from "@/components/AuthButton";
import { item, store } from "@/types/supabase";
import Link from "next/link";

export default async function ({ params }: { params: { store_id: string } }) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("store_id", params.store_id)
    .gte("quantity", 1);
  const { data: storeData, error: storeError } = await supabase
    .from("stores")
    .select("*")
    .eq("id", params.store_id);
  return (
    <div className="flex w-full flex-1 flex-col items-center">
      <Link
        href="/"
        className="text-foreground bg-btn-background hover:bg-btn-background-hover group absolute left-8 top-8 flex items-center rounded-md border border-black px-4 py-2 text-sm no-underline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>

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
