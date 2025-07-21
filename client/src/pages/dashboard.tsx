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
  Moon,
  Sun,
  Bell,
  Search,
  Filter,
  MoreVertical,
  Eye,
  MousePointer,
  Clock,
  Zap
} from "lucide-react";

export default function Dashboard() {
  const [websites, setWebsites] = useState<string[]>([]);
  const [newWebsite, setNewWebsite] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(true);
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
    { label: "Active Campaigns", value: websites.length, icon: Target, color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Traffic Status", value: isRunning ? "Running" : "Stopped", icon: Activity, color: isRunning ? "text-green-400" : "text-red-400", bg: isRunning ? "bg-green-500/10" : "bg-red-500/10" },
    { label: "Total Hits", value: "1,234", icon: Eye, color: "text-purple-400", bg: "bg-purple-500/10" },
    { label: "Click Rate", value: "3.2%", icon: MousePointer, color: "text-orange-400", bg: "bg-orange-500/10" }
  ];

  const recentActivity = [
    { action: "Traffic started", website: "example.com", time: "2 minutes ago", status: "success" },
    { action: "Website added", website: "newsite.com", time: "5 minutes ago", status: "info" },
    { action: "Campaign paused", website: "testsite.com", time: "10 minutes ago", status: "warning" },
    { action: "Hit milestone", website: "mysite.com", time: "15 minutes ago", status: "success" }
  ];

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'} z-30`}>
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">TrafficFlow</h1>
              <p className="text-xs text-gray-400">Pro Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <div className="space-y-1">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">Main</h3>
            <a href="#" className="flex items-center px-3 py-2 rounded-lg bg-purple-500/20 text-purple-400">
              <BarChart3 className="w-5 h-5 mr-3" />
              Dashboard
            </a>
            <a href="#" className="flex items-center px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white">
              <Globe className="w-5 h-5 mr-3" />
              Websites
            </a>
            <a href="#" className="flex items-center px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white">
              <TrendingUp className="w-5 h-5 mr-3" />
              Analytics
            </a>
            <a href="#" className="flex items-center px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white">
              <Users className="w-5 h-5 mr-3" />
              Team
            </a>
          </div>
          
          <div className="space-y-1 pt-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">Tools</h3>
            <a href="#" className="flex items-center px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white">
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </a>
          </div>
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Aritra Mahatma</p>
              <p className="text-xs text-gray-400">Pro User</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Header */}
        <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} px-6 py-4`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Traffic Control Center</h1>
              <p className="text-sm text-gray-400">Manage your website traffic campaigns</p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 w-64 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'}`}
                />
              </div>

              {/* Theme Toggle */}
              <Button
                onClick={() => setDarkMode(!darkMode)}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button>

              {/* Current Time */}
              <div className="text-sm text-gray-400 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {currentTime.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">{stat.label}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bg}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Control Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Traffic Control */}
            <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Traffic Control
                  <Button
                    onClick={handleToggleTraffic}
                    className={`${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                  >
                    {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {isRunning ? 'Stop' : 'Start'}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Traffic Generation</span>
                    <span>{isRunning ? '85%' : '0%'}</span>
                  </div>
                  <Progress value={isRunning ? 85 : 0} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <p className="text-sm text-gray-400">Active Sessions</p>
                    <p className="text-xl font-bold">{isRunning ? '12' : '0'}</p>
                  </div>
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <p className="text-sm text-gray-400">Hits/Hour</p>
                    <p className="text-xl font-bold">{isRunning ? '1,247' : '0'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Website Manager */}
            <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <CardHeader>
                <CardTitle>Website Manager</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="https://example.com"
                    value={newWebsite}
                    onChange={(e) => setNewWebsite(e.target.value)}
                    className={`flex-1 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'}`}
                  />
                  <Button onClick={handleAddWebsite} className="bg-purple-500 hover:bg-purple-600">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {websites.length === 0 ? (
                    <p className="text-center text-gray-400 py-8">No websites added yet</p>
                  ) : (
                    websites.map((website, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-sm">{website}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">Active</Badge>
                          <Button
                            onClick={() => handleRemoveWebsite(website)}
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-300"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Activity
                <Button variant="ghost" size="sm">
                  <Filter className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.status === 'success' ? 'bg-green-400' :
                      activity.status === 'warning' ? 'bg-yellow-400' :
                      'bg-blue-400'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-400">{activity.website}</p>
                    </div>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}