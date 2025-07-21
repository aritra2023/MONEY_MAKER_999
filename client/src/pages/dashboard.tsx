import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LogOut, 
  Plus, 
  Play, 
  Square,
  Globe,
  Settings,
  BarChart3,
  Target,
  Shield,
  Activity,
  Clock,
  Users
} from "lucide-react";

export default function Dashboard() {
  const [websites, setWebsites] = useState<string[]>([]);
  const [newWebsite, setNewWebsite] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState("");

  const handleAddWebsite = () => {
    if (newWebsite.trim() && !websites.includes(newWebsite.trim())) {
      setWebsites([...websites, newWebsite.trim()]);
      setNewWebsite("");
    }
  };

  const handleRemoveWebsite = (website: string) => {
    setWebsites(websites.filter(w => w !== website));
    if (selectedWebsite === website) {
      setSelectedWebsite("");
    }
  };

  const handleStartTraffic = () => {
    if (selectedWebsite) {
      setIsRunning(true);
    }
  };

  const handleStopTraffic = () => {
    setIsRunning(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-purple-900 to-indigo-900 text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-800/90 to-purple-900/90 backdrop-blur-sm border-b border-purple-700/30">
        <div className="flex justify-between items-center p-6">
          <div className="flex items-center space-x-4">
            <img 
              src="https://files.catbox.moe/hlexdm.png" 
              alt="Logo" 
              className="h-12 w-auto"
            />
            <h1 className="text-2xl font-bold">Traffic Booster Dashboard</h1>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="border-purple-400 text-purple-200 hover:bg-purple-700"
          >
            <LogOut className="mr-2 w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        <Tabs defaultValue="traffic" className="space-y-6">
          <TabsList className="bg-purple-800/50 border-purple-700">
            <TabsTrigger value="traffic" className="data-[state=active]:bg-purple-600">
              <Globe className="mr-2 w-4 h-4" />
              Traffic Control
            </TabsTrigger>
            <TabsTrigger value="websites" className="data-[state=active]:bg-purple-600">
              <Settings className="mr-2 w-4 h-4" />
              Website Manager
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
              <BarChart3 className="mr-2 w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Traffic Control Tab */}
          <TabsContent value="traffic" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Website Selection */}
              <Card className="bg-white/10 backdrop-blur-md border-purple-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-200">
                    <Target className="mr-2 w-5 h-5" />
                    Select Target Website
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <select 
                    value={selectedWebsite}
                    onChange={(e) => setSelectedWebsite(e.target.value)}
                    className="w-full p-3 rounded-lg bg-purple-900/50 border border-purple-500/50 text-white"
                  >
                    <option value="">Choose a website...</option>
                    {websites.map((website, index) => (
                      <option key={index} value={website}>{website}</option>
                    ))}
                  </select>
                  
                  {selectedWebsite && (
                    <div className="p-4 bg-purple-800/30 rounded-lg border border-purple-500/30">
                      <p className="text-sm text-purple-300 mb-2">Selected Target:</p>
                      <p className="font-medium text-white">{selectedWebsite}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Traffic Controls */}
              <Card className="bg-white/10 backdrop-blur-md border-purple-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-200">
                    <Activity className="mr-2 w-5 h-5" />
                    Traffic Controls
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-4">
                    <Button 
                      onClick={handleStartTraffic}
                      disabled={!selectedWebsite || isRunning}
                      className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600"
                    >
                      <Play className="mr-2 w-4 h-4" />
                      Start Traffic
                    </Button>
                    <Button 
                      onClick={handleStopTraffic}
                      disabled={!isRunning}
                      variant="destructive"
                      className="flex-1"
                    >
                      <Square className="mr-2 w-4 h-4" />
                      Stop Traffic
                    </Button>
                  </div>
                  
                  <div className="text-center">
                    <Badge 
                      variant={isRunning ? "default" : "secondary"}
                      className={isRunning ? "bg-green-600" : "bg-gray-600"}
                    >
                      Status: {isRunning ? "Running" : "Stopped"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Live Console */}
            <Card className="bg-white/10 backdrop-blur-md border-purple-500/30">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-200">
                  <Clock className="mr-2 w-5 h-5" />
                  Live Activity Console
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-black/80 rounded-lg p-4 h-40 overflow-y-auto font-mono text-sm">
                  {isRunning && selectedWebsite ? (
                    <div className="text-green-400 space-y-1">
                      <div>[{new Date().toLocaleTimeString()}] Traffic generation started for {selectedWebsite}</div>
                      <div>[{new Date().toLocaleTimeString()}] Initializing traffic bots...</div>
                      <div>[{new Date().toLocaleTimeString()}] System ready - waiting for traffic requests</div>
                    </div>
                  ) : (
                    <div className="text-gray-400">
                      Console ready. Select a website and start traffic generation to see live activity.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Website Manager Tab */}
          <TabsContent value="websites" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-purple-500/30">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-200">
                  <Globe className="mr-2 w-5 h-5" />
                  Website Manager
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    type="url"
                    placeholder="Enter website URL (e.g., https://example.com)"
                    value={newWebsite}
                    onChange={(e) => setNewWebsite(e.target.value)}
                    className="flex-1 bg-purple-900/50 border-purple-500/50 text-white placeholder:text-purple-300"
                  />
                  <Button 
                    onClick={handleAddWebsite}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Plus className="mr-2 w-4 h-4" />
                    Add Website
                  </Button>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-purple-200">Managed Websites</h3>
                  {websites.length === 0 ? (
                    <div className="text-center py-8 text-purple-300">
                      No websites added yet. Add your first website above.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {websites.map((website, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between p-3 bg-purple-800/30 rounded-lg border border-purple-500/30"
                        >
                          <span className="text-white">{website}</span>
                          <Button
                            onClick={() => handleRemoveWebsite(website)}
                            variant="destructive"
                            size="sm"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/10 backdrop-blur-md border-purple-500/30">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-purple-200 text-base">
                    <Users className="mr-2 w-4 h-4" />
                    Active Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {isRunning ? "1" : "0"}
                  </div>
                  <p className="text-sm text-purple-300">Currently running</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-purple-500/30">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-purple-200 text-base">
                    <Globe className="mr-2 w-4 h-4" />
                    Websites
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{websites.length}</div>
                  <p className="text-sm text-purple-300">Total managed</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-purple-500/30">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-purple-200 text-base">
                    <Shield className="mr-2 w-4 h-4" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400">Online</div>
                  <p className="text-sm text-purple-300">All systems operational</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/10 backdrop-blur-md border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-200">System Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-purple-300">Current Session</span>
                  <Badge variant="outline" className="border-purple-400 text-purple-200">
                    Active
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-300">Last Activity</span>
                  <span className="text-white">{new Date().toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-300">Traffic Status</span>
                  <Badge 
                    variant={isRunning ? "default" : "secondary"}
                    className={isRunning ? "bg-green-600" : "bg-gray-600"}
                  >
                    {isRunning ? "Running" : "Idle"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}