import Menu from "@/Components/App/Menu";
import Navbar from "@/Components/App/Navbar";
import ToggleThemeButton from "@/Components/App/ToggleThemeButton";
import { PropsWithChildren } from "react";

function AppLayout({ children, auth }: PropsWithChildren<any>) {
  return (
    <div className="bg-zinc-100 text-gray-900 dark:bg-[#020617] dark:text-white h-full flex transition-colors">
      <Navbar>
        <ToggleThemeButton />
        <Menu user={auth.user} />
      </Navbar>
      <main className="p-4 mt-16 flex-grow flex flex-col">{children}</main>
    </div>
  );
}

export default AppLayout;
