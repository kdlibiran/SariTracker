import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";

import SearchMap from "@/components/SearchMap";
export default function Signup({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const setupStore = async (formData: FormData) => {
    "use server";
    const store = formData.get("store") as string;
    const location = formData.get("location") as string;
    const supabase = createClient();

    const { data: storeData, error: storeError } = await supabase
      .from("stores")
      .insert([
        {
          name: store,
          location: location,
        },
      ])
      .select("*");
    if (storeError) {
      return redirect(`/setup?message=${storeError.message}`);
    }

    const { data, error } = await supabase.auth.updateUser({
      data: { store_id: storeData[0]?.id, store_name: storeData[0]?.name },
    });
    if (error) {
      return redirect(`/setup?message=${error.message}`);
    }
    redirect(`/`);
  };

  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 md:w-1/2">
      <div className="w-full">
        <form className="animate-in text-foreground flex w-full flex-1 flex-col justify-center gap-2 rounded-md border border-black p-8 pt-5">
          <div className="mb-5 text-center text-4xl"> Setup Your Store </div>
          <label className="text-md" htmlFor="storeName">
            Store Name
          </label>
          <input
            className="rounded-md border bg-inherit px-4 py-2"
            type="text"
            placeholder="Enter your store name"
            name="store"
            required
          />
          <SearchMap />

          <SubmitButton
            formAction={setupStore}
            className="mb-2 rounded-md border bg-black px-4 py-2 text-white"
            pendingText="Submitting..."
          >
            Submit
          </SubmitButton>
          {searchParams?.message && (
            <p className="bg-foreground/10 text-foreground mt-4 p-4 text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
