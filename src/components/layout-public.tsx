import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <main className="w-full h-full">
      <Outlet />
    </main>
  );
}
