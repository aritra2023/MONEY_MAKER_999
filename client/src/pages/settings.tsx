import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, 
  User, 
  Mail, 
  Lock, 
  Save, 
  Trash2, 
  AlertTriangle,
  Shield,
  Home,
  Menu,
  X,
  Rocket,
  BarChart3
} from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useLocation } from 'wouter';

export default function SettingsPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Form states
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load user data on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserInfo(prev => ({
        ...prev,
        username: user.username || '',
        email: user.email || ''
      }));
    }
  }, []);

  const handleUpdateProfile = async () => {
    if (!userInfo.username.trim()) {
      toast({
        title: "Error",
        description: "Username is required",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call - in real app, this would be an actual API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update localStorage
      const updatedUser = {
        username: userInfo.username,
        email: userInfo.email
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!userInfo.currentPassword || !userInfo.newPassword || !userInfo.confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill all password fields",
        variant: "destructive"
      });
      return;
    }

    if (userInfo.newPassword !== userInfo.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (userInfo.newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Password Changed",
        description: "Your password has been updated successfully",
      });
      
      // Clear password fields
      setUserInfo(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change password",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear all user data
      localStorage.removeItem('user');
      localStorage.removeItem('campaigns');
      
      toast({
        title: "Account Deleted",
        description: "Your account has been permanently deleted",
      });
      
      // Redirect to login
      setTimeout(() => {
        setLocation('/login');
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete account",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent)]"></div>
        
        {/* Animated particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-white/20 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-300/40 rounded-full animate-ping delay-700"></div>
        <div className="absolute bottom-32 left-16 w-1.5 h-1.5 bg-blue-300/30 rounded-full animate-pulse delay-1200"></div>
        <div className="absolute top-60 right-20 w-1 h-1 bg-pink-300/50 rounded-full animate-bounce delay-1800"></div>
      </div>

      {/* Navigation */}
      <nav className="relative bg-white/10 backdrop-blur-md border-b border-white/20 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Rocket className="w-5 h-5 text-white transform rotate-45" />
            </div>
            <span className="text-2xl font-bold text-white">
              SkyHit
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => setLocation('/')}
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            <button 
              onClick={() => setLocation('/dashboard')}
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <div className="text-white font-medium flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-white border border-white/30"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/30 backdrop-blur-md border-b border-white/20 px-4 py-6 z-50">
            <div className="space-y-4">
              <button 
                onClick={() => setLocation('/')}
                className="w-full text-left text-white/80 hover:text-white transition-colors text-lg font-medium py-3 px-4 rounded-lg hover:bg-white/10"
              >
                Home
              </button>
              <button 
                onClick={() => setLocation('/dashboard')}
                className="w-full text-left text-white/80 hover:text-white transition-colors text-lg font-medium py-3 px-4 rounded-lg hover:bg-white/10"
              >
                Dashboard
              </button>
              <button className="w-full text-left text-white hover:text-white transition-colors text-lg font-medium py-3 px-4 rounded-lg bg-white/20">
                Settings
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="relative max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">Account Settings</h1>
          <p className="text-white/70">Manage your account information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Information */}
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <User className="w-5 h-5 text-purple-400" />
                <span>Profile Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="username" className="text-white/90 font-medium">Username</Label>
                <Input
                  id="username"
                  value={userInfo.username}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, username: e.target.value }))}
                  className="mt-2 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/50 focus:bg-white/20"
                  placeholder="Enter your username"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-white/90 font-medium">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-2 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/50 focus:bg-white/20"
                  placeholder="Enter your email"
                />
              </div>

              <Button
                onClick={handleUpdateProfile}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg py-3 font-medium shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    <span>Updating...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>Update Profile</span>
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Lock className="w-5 h-5 text-purple-400" />
                <span>Change Password</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="current-password" className="text-white/90 font-medium">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={userInfo.currentPassword}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, currentPassword: e.target.value }))}
                  className="mt-2 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/50 focus:bg-white/20"
                  placeholder="Enter current password"
                />
              </div>
              
              <div>
                <Label htmlFor="new-password" className="text-white/90 font-medium">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={userInfo.newPassword}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="mt-2 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/50 focus:bg-white/20"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <Label htmlFor="confirm-password" className="text-white/90 font-medium">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={userInfo.confirmPassword}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="mt-2 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/50 focus:bg-white/20"
                  placeholder="Confirm new password"
                />
              </div>

              <Button
                onClick={handleChangePassword}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-lg py-3 font-medium shadow-lg hover:shadow-green-500/25 transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    <span>Changing...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Change Password</span>
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Danger Zone */}
        <Card className="mt-8 bg-red-900/20 backdrop-blur-md border border-red-500/30 rounded-2xl shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-400">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span>Danger Zone</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div>
                <h3 className="text-lg font-medium text-red-400 mb-1">Delete Account</h3>
                <p className="text-red-300/80 text-sm">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
              </div>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-500 text-white rounded-lg px-6 py-3 font-medium md:ml-4 shadow-lg hover:shadow-red-500/25 transition-all duration-300"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-gray-900 border border-gray-700 rounded-2xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center space-x-2 text-red-400">
                      <AlertTriangle className="w-5 h-5" />
                      <span>Delete Account</span>
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-300">
                      Are you absolutely sure you want to delete your account? This will permanently delete all your campaigns, traffic data, and account information. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-lg">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      disabled={isDeleting}
                      className="bg-red-600 hover:bg-red-700 rounded-lg"
                    >
                      {isDeleting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                          <span>Deleting...</span>
                        </div>
                      ) : (
                        "Yes, delete my account"
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}