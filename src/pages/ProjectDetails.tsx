
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis, Tooltip } from "recharts";
import { DashboardNav } from "@/components/dashboard/DashboardNav";

export default function ProjectDetails() {
  const { id } = useParams();

  const mockData = [
    { month: "Jan", value: 1000 },
    { month: "Feb", value: 2000 },
    { month: "Mar", value: 1800 },
    { month: "Apr", value: 2500 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />
      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-forest-600 mb-4">
              Sustainable Farm Project {id}
            </h1>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-20 bg-gray-200 rounded-lg"></div>
                  <div className="h-20 bg-gray-200 rounded-lg"></div>
                  <div className="h-20 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
              <div>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Funding Progress</span>
                    <span className="font-semibold">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Target Amount</span>
                    <span className="font-semibold">$100,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expected Returns</span>
                    <span className="font-semibold">12% Annually</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold">24 Months</span>
                  </div>
                </div>
                <Button className="w-full" size="lg">
                  Invest Now
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="details" className="space-y-4">
          <TabsList>
            <TabsTrigger value="details">Project Details</TabsTrigger>
            <TabsTrigger value="returns">Expected Returns</TabsTrigger>
            <TabsTrigger value="updates">Updates</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">About the Project</h2>
              <p className="text-gray-600">
                This sustainable farming project focuses on organic crop production using innovative
                agricultural techniques. The farm spans 100 acres and implements water-efficient
                irrigation systems.
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="returns">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Projected Returns</h2>
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
          </TabsContent>

          <TabsContent value="updates">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Project Updates</h2>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="text-sm text-gray-500 mb-1">March 15, 2024</div>
                  <p className="text-gray-600">Initial land preparation completed.</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
