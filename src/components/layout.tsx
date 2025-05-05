import React, { useContext, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { CircleUserRound, Smile } from "lucide-react";
import UserContext from "./contexts/user-context";

export default function layout({ children }: { children: ReactNode }) {
  const context = useContext(UserContext);
  const user = context ? context.user : null;
  const today = new Date();
  const dayNumber = today.getDate();
  const dayName = today.toLocaleString("en-US", { weekday: "long" });
  const monthName = today.toLocaleString("en-US", { month: "long" });
  const displayName = user?.name?.split(" ")[0];
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <header className="w-full bg-rose-300 flex items-center justify-between px-4 py-2">
          <SidebarTrigger />
          <div className="flex gap-x-2 items-center">
            <div className="flex gap-x-2 items-center">
              <div className="flex justify-center items-center rounded-full bg-rose-400 w-8 h-8 font-semibold text-center">
                <p className="text-md font-bold text-rose-800">{dayNumber}</p>
              </div>
              <div>
                <p className="text-sm text-rose-500">{dayName}</p>
                <p className="text-sm text-rose-500">{monthName}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-rose-950">
            {user != null ? (
              <>
                <Smile className="h-10 w-10 rounded-full bg-rose-400 p-2" />
                <p className="font-semibold">{displayName}</p>
              </>
            ) : (
              <>
                <CircleUserRound className="h-10 w-10 rounded-full bg-rose-400 p-2" />
                <p>Login</p>
              </>
            )}
          </div>
        </header>
        {children}
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
