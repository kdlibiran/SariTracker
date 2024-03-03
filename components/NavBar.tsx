import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NavBar() {
  const supabase = createClient();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return (
    <nav className="border-b-foreground/10 flex h-16 w-full justify-center border-b">
      <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
        SariTracker
        <div className="flex flex-row justify-center gap-2">
          <Link href="/" className="rounded-md  px-4 py-2">
            Home
          </Link>
          <Link href="/inventory" className="rounded-md  px-4 py-2">
            Inventory
          </Link>
          <a href="#" className="rounded-md  px-4 py-2">
            Settings
          </a>
          <form action={signOut}>
            <button className="rounded-md bg-black px-4 py-2 text-white no-underline hover:bg-gray-900">
              Logout
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
