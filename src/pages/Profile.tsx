import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Settings, Info, Edit, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const { toast } = useToast();
  const [activeDialog, setActiveDialog] = useState<string | null>(null);

  const mockUser = {
    name: "John Doe",
    email: "john@example.com",
    joinDate: "January 2024",
    badges: [
      { id: 1, name: "Early Adopter", description: "Joined during platform launch" },
      { id: 2, name: "First Investment", description: "Made first investment" },
      { id: 3, name: "Green Impact", description: "Supported 5 sustainable projects" },
    ],
    stats: {
      totalInvested: "$25,000",
      projectsSupported: 8,
      averageReturn: "12.5%",
    },
  };

  const handleSettingsSave = (setting: string) => {
    toast({
      title: "Settings Updated",
      description: `Your ${setting} settings have been saved successfully.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Personal Information Card */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-forest-500" />
              Personal Information
            </CardTitle>
            <Button variant="ghost" size="icon">
              <Edit className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6 mb-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{mockUser.name}</h2>
                <p className="text-gray-500">{mockUser.email}</p>
                <p className="text-sm text-gray-400">Member since {mockUser.joinDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-navy-500" />
              Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  Account Settings
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Account Settings</DialogTitle>
                  <DialogDescription>
                    Manage your account preferences and personal information.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Email Preferences</h4>
                    <p className="text-sm text-gray-500">
                      Receive notifications about your investments, project updates, and platform news.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-500">
                      Enable additional security for your account.
                    </p>
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => handleSettingsSave('account')}
                  >
                    Save Changes
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  Notification Preferences
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Notification Settings</DialogTitle>
                  <DialogDescription>
                    Customize how and when you receive notifications.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Investment Updates</h4>
                    <p className="text-sm text-gray-500">
                      Get notified about changes in your investment portfolio.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Project Milestones</h4>
                    <p className="text-sm text-gray-500">
                      Receive updates when your supported projects reach important milestones.
                    </p>
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => handleSettingsSave('notification')}
                  >
                    Save Preferences
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  Privacy & Security
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Privacy & Security Settings</DialogTitle>
                  <DialogDescription>
                    Manage your privacy preferences and security settings.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Profile Visibility</h4>
                    <p className="text-sm text-gray-500">
                      Control who can see your investment activity and profile information.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Security Settings</h4>
                    <p className="text-sm text-gray-500">
                      Update your password and security preferences.
                    </p>
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => handleSettingsSave('privacy and security')}
                  >
                    Update Settings
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Badges Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-gold-500" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {mockUser.badges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-start gap-3 p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
                >
                  <Award className="h-8 w-8 text-gold-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">{badge.name}</h3>
                    <p className="text-sm text-gray-500">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Investment Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-forest-500" />
              Investment Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Total Invested</p>
              <p className="text-2xl font-bold">{mockUser.stats.totalInvested}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Projects Supported</p>
              <p className="text-2xl font-bold">{mockUser.stats.projectsSupported}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Average Return</p>
              <p className="text-2xl font-bold">{mockUser.stats.averageReturn}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}