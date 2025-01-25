import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChartContainer } from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis, Tooltip } from "recharts";
import { Users, Shield, AlertTriangle } from "lucide-react";

export default function AdminDashboard() {
  const mockData = [
    { month: "Jan", value: 50 },
    { month: "Feb", value: 75 },
    { month: "Mar", value: 60 },
    { month: "Apr", value: 90 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Total Users</h3>
              <Users className="h-5 w-5 text-forest-500" />
            </div>
            <p className="text-3xl font-bold">1,247</p>
            <p className="text-sm text-gray-500">Active accounts</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Projects</h3>
              <Shield className="h-5 w-5 text-navy-500" />
            </div>
            <p className="text-3xl font-bold">45</p>
            <p className="text-sm text-gray-500">Under management</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Reports</h3>
              <AlertTriangle className="h-5 w-5 text-gold-500" />
            </div>
            <p className="text-3xl font-bold">3</p>
            <p className="text-sm text-gray-500">Pending review</p>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Platform Growth</h2>
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
            <h2 className="text-xl font-semibold mb-6">Compliance Status</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span>KYC Verification</span>
                  <span>95%</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Project Verification</span>
                  <span>88%</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Risk Assessment</span>
                  <span>92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}