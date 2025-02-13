
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { DashboardNav } from "@/components/dashboard/DashboardNav";

export default function AdminLotReview() {
  const { toast } = useToast();
  const [feedback, setFeedback] = useState("");
  const [pendingLots, setPendingLots] = useState([
    {
      id: 1,
      title: "Organic Farm Expansion",
      farmer: "John Doe",
      targetAmount: 50000,
      expectedReturns: 12,
      description: "Sustainable farming initiative with expected returns of 12% annually.",
      images: [],
    },
  ]);

  const handleApprove = (id: number) => {
    // Here we would typically update the backend
    setPendingLots(pendingLots.filter(lot => lot.id !== id));
    toast({
      title: "Lot Approved",
      description: "The investment lot has been approved and will appear in the marketplace",
    });
  };

  const handleReject = (id: number) => {
    if (!feedback.trim()) {
      toast({
        title: "Feedback Required",
        description: "Please provide feedback for rejection",
        variant: "destructive",
      });
      return;
    }
    // Here we would typically update the backend
    setPendingLots(pendingLots.filter(lot => lot.id !== id));
    toast({
      title: "Lot Rejected",
      description: "The feedback has been sent to the farmer",
    });
    setFeedback("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-forest-600 mb-6">Review Investment Lots</h1>
        {pendingLots.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="text-gray-600">No pending lots to review.</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {pendingLots.map((lot) => (
              <Card key={lot.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{lot.title}</h2>
                    <p className="text-gray-600 mb-2">Farmer: {lot.farmer}</p>
                    <p className="text-gray-600 mb-2">Target Amount: ${lot.targetAmount}</p>
                    <p className="text-gray-600 mb-2">Expected Returns: {lot.expectedReturns}%</p>
                    <p className="text-gray-600">{lot.description}</p>
                  </div>
                  <Badge>Pending Review</Badge>
                </div>
                {lot.images && lot.images.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {lot.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Project image ${index + 1}`}
                        className="rounded-lg object-cover w-full h-48"
                      />
                    ))}
                  </div>
                )}
                <div className="space-y-4">
                  <Textarea
                    placeholder="Provide feedback (required for rejection)"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full"
                  />
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleReject(lot.id)}
                    >
                      Reject
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={() => handleApprove(lot.id)}
                    >
                      Approve
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
