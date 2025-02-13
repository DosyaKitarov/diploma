import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Settings, Info, Edit, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
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
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Form schemas
const accountFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  twoFactorEnabled: z.boolean().default(false),
});

const notificationFormSchema = z.object({
  emailNotifications: z.boolean().default(true),
  investmentUpdates: z.boolean().default(true),
  projectMilestones: z.boolean().default(true),
  marketingEmails: z.boolean().default(false),
});

const privacyFormSchema = z.object({
  profileVisibility: z.boolean().default(true),
  showInvestments: z.boolean().default(false),
  allowMessages: z.boolean().default(true),
});

export default function Profile() {
  const { toast } = useToast();
  const [activeDialog, setActiveDialog] = useState<string | null>(null);

  // Forms
  const accountForm = useForm({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: "John Doe",
      email: "john@example.com",
      twoFactorEnabled: false,
    },
  });

  const notificationForm = useForm({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      emailNotifications: true,
      investmentUpdates: true,
      projectMilestones: true,
      marketingEmails: false,
    },
  });

  const privacyForm = useForm({
    resolver: zodResolver(privacyFormSchema),
    defaultValues: {
      profileVisibility: true,
      showInvestments: false,
      allowMessages: true,
    },
  });

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

  const handleSettingsSave = (setting: string, data: any) => {
    console.log(`Saving ${setting} settings:`, data);
    toast({
      title: "Settings Updated",
      description: `Your ${setting} settings have been saved successfully.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />
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
                  <Form {...accountForm}>
                    <form onSubmit={accountForm.handleSubmit((data) => handleSettingsSave('account', data))} className="space-y-4">
                      <FormField
                        control={accountForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={accountForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={accountForm.control}
                        name="twoFactorEnabled"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Enable Two-Factor Authentication</FormLabel>
                              <FormDescription>
                                Add an extra layer of security to your account
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full">Save Changes</Button>
                    </form>
                  </Form>
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
                  <Form {...notificationForm}>
                    <form onSubmit={notificationForm.handleSubmit((data) => handleSettingsSave('notification', data))} className="space-y-4">
                      <FormField
                        control={notificationForm.control}
                        name="emailNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Email Notifications</FormLabel>
                              <FormDescription>
                                Receive important updates via email
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={notificationForm.control}
                        name="investmentUpdates"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Investment Updates</FormLabel>
                              <FormDescription>
                                Get notified about changes in your investments
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={notificationForm.control}
                        name="projectMilestones"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Project Milestones</FormLabel>
                              <FormDescription>
                                Receive updates about project progress
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full">Save Preferences</Button>
                    </form>
                  </Form>
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
                  <Form {...privacyForm}>
                    <form onSubmit={privacyForm.handleSubmit((data) => handleSettingsSave('privacy', data))} className="space-y-4">
                      <FormField
                        control={privacyForm.control}
                        name="profileVisibility"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Public Profile</FormLabel>
                              <FormDescription>
                                Make your profile visible to other users
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={privacyForm.control}
                        name="showInvestments"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Show Investments</FormLabel>
                              <FormDescription>
                                Display your investment activity on your profile
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={privacyForm.control}
                        name="allowMessages"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Allow Messages</FormLabel>
                              <FormDescription>
                                Let other users send you messages
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full">Update Settings</Button>
                    </form>
                  </Form>
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
    </div>
  );
}
