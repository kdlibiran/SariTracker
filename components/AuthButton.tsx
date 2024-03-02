import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action={signOut}>
        <button className="bg-btn-background hover:bg-btn-background-hover rounded-md px-4 py-2 no-underline">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <div className="flex flex-row gap-4">
      <Link
        href="/login"
        className="bg-btn-background hover:bg-btn-background-hover flex rounded-md px-3 py-2 no-underline"
      >
        Log In
      </Link>
      <Link
        href="/signup"
        className="flex rounded-md bg-black px-3 py-2 text-white no-underline hover:bg-slate-900"
      >
        Sign Up
      </Link>
    </div>
  );
}
