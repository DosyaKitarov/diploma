import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sprout, TrendingUp, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Sprout className="h-12 w-12 text-forest-500" />,
      title: "Agricultural Projects",
      description: "Connect with sustainable farming initiatives worldwide"
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-navy-500" />,
      title: "Smart Investments",
      description: "Track and manage your agricultural investments with ease"
    },
    {
      icon: <Trophy className="h-12 w-12 text-gold-500" />,
      title: "Gamified Experience",
      description: "Earn rewards and climb the leaderboard as you invest"
    }
  ];

  return (
    <div className="min-h-screen gradient-bg">
      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-forest-600 mb-6">
            Grow Your Future
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our blockchain-powered platform connecting farmers with investors through gamified agricultural investments
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/marketplace")}
            className="bg-forest-500 hover:bg-forest-600"
          >
            Explore Projects
          </Button>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder for featured projects */}
            <Card className="p-6 animate-fade-up">
              <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Sustainable Farm Project</h3>
              <p className="text-gray-600 mb-4">Organic farming initiative in California</p>
              <Button variant="outline" onClick={() => navigate("/project/1")}>
                Learn More
              </Button>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}