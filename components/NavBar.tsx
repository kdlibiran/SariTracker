import AuthButton from "./AuthButton";

export default function NavBar() {
  return (
    <nav className="border-b-foreground/10 flex h-16 w-full justify-center border-b">
      <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
        SariTracker
        <div className="flex flex-row justify-center gap-2">
          <a href="#" className="rounded-md  px-4 py-2">
            Home
          </a>
          <a href="#" className="rounded-md  px-4 py-2">
            Inventory
          </a>
          <a href="#" className="rounded-md  px-4 py-2">
            Settings
          </a>
          <a href=" " className="rounded-md bg-black px-4 py-2 text-white">
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
}
