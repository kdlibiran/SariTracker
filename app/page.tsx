import NavBar from "@/components/NavBar";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import GoogleMaps from "@/components/GoogleMaps";
import StoreMap from "@/components/StoreMap";

export default async function Index() {
  const supabase = createClient();

  const { data: stores, error: storeError } = await supabase
    .from("stores")
    .select("*");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return (
      <div className="flex w-full flex-1 flex-col items-center gap-20">
        <NavBar />
        <div>Home Page Placeholder</div>
      </div>
    );
  } else {
    return (
      <div className="flex w-full flex-1 flex-col items-center gap-20">
        <nav className="border-b-foreground/10 flex h-16 w-full justify-center border-b">
          <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
            SariTracker
            <AuthButton />
          </div>
        </nav>
        <div className="flex w-full flex-1 flex-row items-center justify-center gap-20">
          <div className="text-5xl">Find a store near you</div>
          <StoreMap data={stores} />
        </div>
      </div>
    );
  }
}
