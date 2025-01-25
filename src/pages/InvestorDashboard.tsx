import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChartContainer } from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis, Tooltip } from "recharts";
import { Trophy, TrendingUp, Star } from "lucide-react";

export default function InvestorDashboard() {
  const mockData = [
    { month: "Jan", value: 5000 },
    { month: "Feb", value: 7000 },
    { month: "Mar", value: 6500 },
    { month: "Apr", value: 9000 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Total Invested</h3>
              <TrendingUp className="h-5 w-5 text-forest-500" />
            </div>
            <p className="text-3xl font-bold">$27,500</p>
            <p className="text-sm text-gray-500">Across 5 projects</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Returns</h3>
              <Star className="h-5 w-5 text-gold-500" />
            </div>
            <p className="text-3xl font-bold">12.5%</p>
            <p className="text-sm text-gray-500">Average annual return</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Rank</h3>
              <Trophy className="h-5 w-5 text-navy-500" />
            </div>
            <p className="text-3xl font-bold">Silver</p>
            <p className="text-sm text-gray-500">Top 25% of investors</p>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Portfolio Growth</h2>
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
            <h2 className="text-xl font-semibold mb-6">Achievements</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span>First Investment</span>
                  <span className="text-forest-500">Completed</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Diversification Master</span>
                  <span>3/5 Projects</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Green Impact</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}