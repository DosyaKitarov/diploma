import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { DashboardNav } from "@/components/dashboard/DashboardNav";

export default function Marketplace() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [approvedLots, setApprovedLots] = useState<any[]>([]);

  useEffect(() => {
    // Load approved lots from localStorage
    const lots = JSON.parse(localStorage.getItem('approvedLots') || '[]');
    setApprovedLots(lots);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-forest-600 mb-4 md:mb-0">
            Project Marketplace
          </h1>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-initial">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        {approvedLots.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="text-gray-600">No approved investment lots available at the moment.</p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {approvedLots.map((lot) => (
              <Card key={lot.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {lot.images && lot.images.length > 0 && (
                  <img
                    src={lot.images[0]}
                    alt={lot.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{lot.title}</h3>
                  <p className="text-gray-600 mb-4">{lot.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Funding: {lot.fundingProgress}%
                    </div>
                    <Button onClick={() => navigate(`/project/${lot.id}`)}>
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
