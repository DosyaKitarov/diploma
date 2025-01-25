import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { RoleCard } from "@/components/ui/RoleCard";
import { UserPlus } from "lucide-react";

type Role = "farmer" | "investor" | "admin";

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      toast({
        title: "Error",
        description: "Please select a role",
        variant: "destructive",
      });
      return;
    }
    // TODO: Implement actual registration logic
    toast({
      title: "Registration Successful",
      description: "Welcome to the platform!",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md animate-fade-up">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="space-y-4">
        <Label>Select Your Role</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["farmer", "investor", "admin"].map((role) => (
            <RoleCard
              key={role}
              role={role as Role}
              selected={selectedRole === role}
              onClick={() => setSelectedRole(role as Role)}
            />
          ))}
        </div>
      </div>
      <Button type="submit" className="w-full" size="lg">
        <UserPlus className="mr-2 h-4 w-4" /> Create Account
      </Button>
    </form>
  );
}