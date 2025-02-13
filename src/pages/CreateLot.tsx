import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { ImagePlus } from "lucide-react";

export interface LotData {
  id: number;
  title: string;
  description: string;
  targetAmount: string;
  expectedReturns: string;
  duration: string;
  location: string;
  farmer: string;
  images: string[];
  status: 'pending' | 'approved' | 'rejected';
  feedback?: string; // Added feedback as optional property
}

export default function CreateLot() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    targetAmount: "",
    expectedReturns: "",
    duration: "",
    location: "",
  });
  const [images, setImages] = useState<FileList | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImages(e.target.files);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a new lot object
    const newLot: LotData = {
      id: Date.now(), // Use timestamp as temporary ID
      ...formData,
      farmer: "Current Farmer", // This would come from auth
      images: images ? Array.from(images).map(file => URL.createObjectURL(file)) : [],
      status: 'pending'
    };

    // Get existing lots or initialize empty array
    const existingLots = JSON.parse(localStorage.getItem('pendingLots') || '[]');
    
    // Add new lot
    localStorage.setItem('pendingLots', JSON.stringify([...existingLots, newLot]));

    toast({
      title: "Investment lot created",
      description: "Your lot has been submitted for approval",
    });
    navigate("/farmer-dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto p-6">
          <h1 className="text-2xl font-bold text-forest-600 mb-6">Create Investment Lot</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Project Title</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter project title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your agricultural project"
                className="min-h-[100px]"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Target Amount ($)</label>
                <Input
                  type="number"
                  value={formData.targetAmount}
                  onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                  placeholder="50000"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Expected Returns (%)</label>
                <Input
                  type="number"
                  value={formData.expectedReturns}
                  onChange={(e) => setFormData({ ...formData, expectedReturns: e.target.value })}
                  placeholder="12"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Duration (months)</label>
                <Input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="24"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Project location"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Project Images</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <ImagePlus className="h-12 w-12 text-gray-400" />
                  <span className="mt-2 text-sm text-gray-500">
                    Click to upload project images
                  </span>
                </label>
                {images && (
                  <div className="mt-4 space-y-2">
                    {Array.from(images).map((file, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        {file.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <Button type="submit" className="w-full">Submit for Approval</Button>
          </form>
        </Card>
      </main>
    </div>
  );
}
