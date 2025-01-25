import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChartContainer } from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis, Tooltip } from "recharts";
import { Plus, Users, Sprout, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FarmerDashboard() {
  const navigate = useNavigate();
  
  const mockData = [
    { month: "Jan", value: 10000 },
    { month: "Feb", value: 15000 },
    { month: "Mar", value: 12000 },
    { month: "Apr", value: 20000 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Farmer Dashboard</h1>
          <Button onClick={() => navigate("/new-project")} className="bg-forest-500">
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Total Funding</h3>
              <TrendingUp className="h-5 w-5 text-forest-500" />
            </div>
            <p className="text-3xl font-bold">$47,500</p>
            <p className="text-sm text-gray-500">From 3 active projects</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Investors</h3>
              <Users className="h-5 w-5 text-navy-500" />
            </div>
            <p className="text-3xl font-bold">24</p>
            <p className="text-sm text-gray-500">Across all projects</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Success Rate</h3>
              <Sprout className="h-5 w-5 text-gold-500" />
            </div>
            <p className="text-3xl font-bold">92%</p>
            <p className="text-sm text-gray-500">Project completion rate</p>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Funding Overview</h2>
            <div className="h-[300px]">
              <ChartContainer config={{}}>
                <AreaChart data={mockData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#2F855A"
                    fill="#F0FDF4"
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Active Projects</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Organic Farm Expansion</span>
                  <span>75% Funded</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Sustainable Irrigation</span>
                  <span>45% Funded</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Greenhouse Project</span>
                  <span>90% Funded</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}