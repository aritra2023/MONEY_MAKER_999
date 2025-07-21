import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  LogOut, 
  Plus, 
  Play,
  Pause,
  BarChart3,
  Globe,
  TrendingUp,
  Users,
  Target,
  Activity,
  Settings,
  Eye,
  MousePointer,
  Clock,
  Zap,
  ArrowUp,
  ArrowDown,
  Trash2
} from "lucide-react";

export default function Dashboard() {
  const [websites, setWebsites] = useState<string[]>([]);
  const [newWebsite, setNewWebsite] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAddWebsite = () => {
    if (newWebsite.trim() && !websites.includes(newWebsite.trim())) {
      setWebsites([...websites, newWebsite.trim()]);
      setNewWebsite("");
    }
  };

  const handleRemoveWebsite = (website: string) => {
    setWebsites(websites.filter(w => w !== website));
  };

  const handleToggleTraffic = () => {
    setIsRunning(!isRunning);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const stats = [
    { label: "Active Campaigns", value: websites.length, icon: Target },
    { label: "Traffic Status", value: isRunning ? "Running" : "Stopped", icon: Activity },
    { label: "Active Sessions", value: isRunning && websites.length > 0 ? websites.length : 0, icon: Eye },
    { label: "Websites Added", value: websites.length, icon: MousePointer }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Header Navigation - matching your main page */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">SKYHIT</span>
          </div>
          
          <div className="hidden md:flex space-x-8 text-white/80">
            <a href="#" className="hover:text-white">Dashboard</a>
            <a href="#" className="hover:text-white">Analytics</a>
            <a href="#" className="hover:text-white">Campaigns</a>
            <a href="#" className="hover:text-white">Reports</a>
            <a href="#" className="hover:text-white">Settings</a>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-sm text-white/60 hidden md:block">
            {currentTime.toLocaleString()}
          </div>
          <Button 
            onClick={handleLogout}
            className="bg-white text-purple-600 hover:bg-white/90 px-6 py-2 rounded-full font-medium"
          >
            Sign Out
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="px-6 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Traffic Control Center
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Monitor and manage your website traffic campaigns with our advanced analytics platform
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-md border border-white/20 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="w-8 h-8 text-purple-300" />
                </div>
                <div>
                  <p className="text-2xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-white/60">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Control Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Traffic Control */}
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-white">
                <div className="flex items-center">
                  <Activity className="w-6 h-6 mr-3 text-purple-300" />
                  Traffic Generator
                </div>
                <Button
                  onClick={handleToggleTraffic}
                  className={`${
                    isRunning 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-green-500 hover:bg-green-600'
                  } text-white rounded-full px-6`}
                >
                  {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                  {isRunning ? 'Stop Traffic' : 'Start Traffic'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/80">System Status</span>
                  <span className="text-white">{isRunning ? 'Active' : 'Inactive'}</span>
                </div>
                <Progress 
                  value={isRunning ? 100 : 0} 
                  className="h-3 bg-white/20"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-sm text-white/60 mb-1">Active Websites</p>
                  <p className="text-2xl font-bold text-white">{isRunning ? websites.length : 0}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-sm text-white/60 mb-1">Status</p>
                  <p className="text-2xl font-bold text-white">{isRunning ? 'ON' : 'OFF'}</p>
                </div>
              </div>

              {isRunning && (
                <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-3"></div>
                    <span className="text-green-400 font-medium">Traffic generation is active</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Website Manager */}
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Globe className="w-6 h-6 mr-3 text-purple-300" />
                Website Manager
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex space-x-3">
                <Input
                  placeholder="https://your-website.com"
                  value={newWebsite}
                  onChange={(e) => setNewWebsite(e.target.value)}
                  className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-white/40"
                />
                <Button 
                  onClick={handleAddWebsite}
                  className="bg-purple-500 hover:bg-purple-600 text-white rounded-full px-6"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {websites.length === 0 ? (
                  <div className="text-center py-12">
                    <Globe className="w-12 h-12 text-white/30 mx-auto mb-4" />
                    <p className="text-white/60">No websites added yet</p>
                    <p className="text-sm text-white/40">Add your first website to start generating traffic</p>
                  </div>
                ) : (
                  websites.map((website, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="font-medium text-white">{website}</span>
                        <Badge className="bg-green-500/20 text-green-400 border-green-400/30">
                          Active
                        </Badge>
                      </div>
                      <Button
                        onClick={() => handleRemoveWebsite(website)}
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Overview */}
        <Card className="bg-white/10 backdrop-blur-md border border-white/20 text-white mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <BarChart3 className="w-6 h-6 mr-3 text-purple-300" />
              System Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {websites.length}
                </div>
                <p className="text-white/60">Total Websites</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {isRunning ? websites.length : 0}
                </div>
                <p className="text-white/60">Active Campaigns</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {isRunning ? 'Running' : 'Stopped'}
                </div>
                <p className="text-white/60">Current Status</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Info */}
        <div className="text-center">
          <p className="text-white/60 mb-4">Welcome to your Traffic Control Center</p>
          <p className="text-sm text-white/40">Add websites above to start managing your traffic campaigns</p>
        </div>
      </div>
    </div>
  );
}