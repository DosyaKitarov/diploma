import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { LogOut } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  userRole: "farmer" | "investor" | "admin";
}

export function DashboardLayout({ children, userRole }: DashboardLayoutProps) {
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    // TODO: Implement actual logout logic
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-forest-500">
            {userRole === "farmer" && "Farmer Dashboard"}
            {userRole === "investor" && "Investor Dashboard"}
            {userRole === "admin" && "Admin Dashboard"}
          </h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}