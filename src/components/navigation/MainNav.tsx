import { Link } from "react-router-dom";
import { Home, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MainNav() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-forest-500 hover:text-forest-600">
              <Home className="h-5 w-5" />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/marketplace"
              className="text-gray-600 hover:text-forest-500"
            >
              Projects
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-forest-500"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}