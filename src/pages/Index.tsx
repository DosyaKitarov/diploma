import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Button } from "@/components/ui/button";
import { Sprout } from "lucide-react";

const Index = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <div className="space-y-4">
            <Sprout className="h-16 w-16 text-forest-500 mx-auto" />
            <h1 className="text-4xl font-bold tracking-tight">
              Agricultural Investment Platform
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect farmers with investors to grow sustainable agricultural projects
            </p>
          </div>

          <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
            <div className="flex space-x-4 mb-8">
              <Button
                variant={isLogin ? "default" : "outline"}
                className="flex-1"
                onClick={() => setIsLogin(true)}
              >
                Login
              </Button>
              <Button
                variant={!isLogin ? "default" : "outline"}
                className="flex-1"
                onClick={() => setIsLogin(false)}
              >
                Register
              </Button>
            </div>
            {isLogin ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;