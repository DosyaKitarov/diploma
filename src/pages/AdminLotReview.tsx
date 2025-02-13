
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { LotData } from "./CreateLot";

export default function AdminLotReview() {
  const { toast } = useToast();
  const [feedback, setFeedback] = useState("");
  const [pendingLots, setPendingLots] = useState<LotData[]>([]);

  useEffect(() => {
    // Load pending lots from localStorage
    const lots = JSON.parse(localStorage.getItem('pendingLots') || '[]');
    setPendingLots(lots);
  }, []);

  const handleApprove = (id: number) => {
    // Update local storage
    const updatedLots = pendingLots.filter(lot => lot.id !== id);
    localStorage.setItem('pendingLots', JSON.stringify(updatedLots));
    
    // Get existing approved lots
    const approvedLots = JSON.parse(localStorage.getItem('approvedLots') || '[]');
    const lotToApprove = pendingLots.find(lot => lot.id === id);
    
    if (lotToApprove) {
      lotToApprove.status = 'approved';
      localStorage.setItem('approvedLots', JSON.stringify([...approvedLots, lotToApprove]));
    }

    // Update state
    setPendingLots(updatedLots);
    
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

    // Update local storage
    const updatedLots = pendingLots.filter(lot => lot.id !== id);
    localStorage.setItem('pendingLots', JSON.stringify(updatedLots));

    // Get the rejected lot and update its status
    const lotToReject = pendingLots.find(lot => lot.id === id);
    if (lotToReject) {
      lotToReject.status = 'rejected';
      lotToReject.feedback = feedback;
      
      // Store rejected lots separately
      const rejectedLots = JSON.parse(localStorage.getItem('rejectedLots') || '[]');
      localStorage.setItem('rejectedLots', JSON.stringify([...rejectedLots, lotToReject]));
    }

    // Update state
    setPendingLots(updatedLots);
    
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
                    <p className="text-gray-600 mb-2">Duration: {lot.duration} months</p>
                    <p className="text-gray-600 mb-2">Location: {lot.location}</p>
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
