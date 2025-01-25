import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { User, Sprout, LineChart } from "lucide-react";

type Role = "farmer" | "investor" | "admin";

interface RoleCardProps {
  role: Role;
  selected: boolean;
  onClick: () => void;
}

const roleData = {
  farmer: {
    title: "Farmer",
    description: "List your agricultural projects and receive funding",
    icon: Sprout,
  },
  investor: {
    title: "Investor",
    description: "Browse and invest in agricultural projects",
    icon: LineChart,
  },
  admin: {
    title: "Administrator",
    description: "Manage platform users and content",
    icon: User,
  },
};

export function RoleCard({ role, selected, onClick }: RoleCardProps) {
  const { title, description, icon: Icon } = roleData[role];

  return (
    <Card
      className={cn(
        "cursor-pointer card-hover",
        selected ? "border-forest-500 bg-forest-50" : "hover:border-forest-500"
      )}
      onClick={onClick}
    >
      <CardHeader>
        <Icon className={cn("w-10 h-10 mb-2", selected ? "text-forest-500" : "text-gray-400")} />
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}