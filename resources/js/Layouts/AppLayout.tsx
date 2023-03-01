import Menu from "@/Components/App/Menu";
import Navbar from "@/Components/App/Navbar";
import ToggleThemeButton from "@/Components/App/ToggleThemeButton";
import { PropsWithChildren } from "react";
import { User } from "vendor";

interface AppLayoutProps {
  auth: { user?: User };
}

function AppLayout({ children, auth }: PropsWithChildren<AppLayoutProps>) {
  return (
    <div className="bg-zinc-100 text-gray-900 dark:bg-[#020617] dark:text-white h-full flex transition-colors">
      <Navbar>
        <ToggleThemeButton />
        <Menu user={auth.user} />
      </Navbar>
      <main className="p-4 mt-16 flex-grow flex flex-col overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

export default AppLayout;
