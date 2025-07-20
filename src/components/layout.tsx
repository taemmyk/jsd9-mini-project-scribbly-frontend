import { useContext, ReactNode } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Smile } from "lucide-react";
import UserContext from "./contexts/user-context";
import { logoutUser } from "@/services/user.service";

export default function Layout({ children }: { children?: ReactNode }) {
  const { user } = useContext(UserContext);
  const today = new Date();
  const dayNumber = today.getDate();
  const dayName = today.toLocaleString("en-US", { weekday: "long" });
  const monthName = today.toLocaleString("en-US", { month: "long" });
  const displayName = user?.email;
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        alert("Logout failed: " + error.message);
      } else {
        alert("Logout failed");
      }
    }
  };

  return (
    <SidebarProvider>
      {user ? (
        <>
          <AppSidebar />
          <main className="w-full">
            <header className="w-full bg-rose-300 flex items-center justify-between px-4 py-2">
              <SidebarTrigger />
              <div className="flex gap-x-2 items-center">
                <div className="flex justify-center items-center rounded-full bg-rose-400 w-8 h-8 font-semibold text-center">
                  <p className="text-md font-bold text-rose-800">{dayNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-rose-500">{dayName}</p>
                  <p className="text-sm font-bold text-rose-800">{monthName}</p>
                </div>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex space-x-2">
                    <Smile className="h-10 w-10 rounded-full bg-rose-400 p-2" />
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2 text-rose-950 px-2 py-1"
                    >
                      {displayName}
                    </Button>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-2 bg-transparent border-0">
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </PopoverContent>
              </Popover>
            </header>
            {children}
            <Outlet />
          </main>
        </>
      ) : (
        <main className="w-full">
          {children}
          <Outlet />
        </main>
      )}
    </SidebarProvider>
  );
}
