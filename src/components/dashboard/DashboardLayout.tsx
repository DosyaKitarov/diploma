import { ReactNode } from "react";
import { DashboardNav } from "./DashboardNav";

interface DashboardLayoutProps {
  children: ReactNode;
  userRole: "farmer" | "investor" | "admin";
}

export function DashboardLayout({ children, userRole }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}