
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis, Tooltip } from "recharts";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { useEffect, useState } from "react";
import { LotData } from "./CreateLot";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState<LotData | null>(null);

  useEffect(() => {
    // Try to find the project in approved lots
    const approvedLots = JSON.parse(localStorage.getItem('approvedLots') || '[]');
    const foundProject = approvedLots.find((lot: LotData) => lot.id.toString() === id);
    if (foundProject) {
      setProject(foundProject);
    }
  }, [id]);

  const mockData = [
    { month: "Jan", value: 1000 },
    { month: "Feb", value: 2000 },
    { month: "Mar", value: 1800 },
    { month: "Apr", value: 2500 },
  ];

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardNav />
        <main className="container mx-auto px-4 py-8">
          <Card className="p-6 text-center">
            <p className="text-gray-600">Project not found.</p>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />
      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-forest-600 mb-4">
              {project.title}
            </h1>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                {project.images && project.images.length > 0 ? (
                  <>
                    <div className="h-64 relative mb-4">
                      <img 
                        src={project.images[0]} 
                        alt={project.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    {project.images.length > 1 && (
                      <div className="grid grid-cols-3 gap-4">
                        {project.images.slice(1, 4).map((image, index) => (
                          <div key={index} className="h-20 relative">
                            <img 
                              src={image} 
                              alt={`${project.title} ${index + 2}`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="h-64 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <p className="text-gray-500">No images available</p>
                  </div>
                )}
              </div>
              <div>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Funding Progress</span>
                    <span className="font-semibold">0%</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Target Amount</span>
                    <span className="font-semibold">${project.targetAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expected Returns</span>
                    <span className="font-semibold">{project.expectedReturns}% Annually</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold">{project.duration} Months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location</span>
                    <span className="font-semibold">{project.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Farmer</span>
                    <span className="font-semibold">{project.farmer}</span>
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
                {project.description}
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
                  <div className="text-sm text-gray-500 mb-1">Project Created</div>
                  <p className="text-gray-600">Project has been approved and listed on the marketplace.</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
