import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  LogOut, 
  Plus, 
  Play,
  Pause,
  Settings,
  Globe,
  Target,
  Clock,
  Zap,
  Trash2,
  ExternalLink,
  Download,
  TrendingUp,
  Users,
  Activity,
  BarChart3,
  RefreshCw,
  Eye,
  MousePointer,
  Rocket,
  Square
} from "lucide-react";

interface Campaign {
  id: string;
  website: string;
  targetHits: number;
  duration: number; // in hours
  hitType: 'page-view' | 'unique-visitor' | 'click';
  isActive: boolean;
  currentHits: number;
  startTime?: Date;
}

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [newWebsite, setNewWebsite] = useState("");
  const [targetHits, setTargetHits] = useState(100);
  const [duration, setDuration] = useState(1);
  const [hitType, setHitType] = useState<'page-view' | 'unique-visitor' | 'click'>('page-view');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Load campaigns from backend and auto-refresh
  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch('/api/campaigns', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCampaigns(data);
        }
      } catch (error) {
        console.error('Failed to load campaigns:', error);
      }
    };

    loadCampaigns();
    // Auto-refresh every 5 seconds for real-time updates
    const interval = setInterval(loadCampaigns, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCreateCampaign = async () => {
    if (!newWebsite.trim() || targetHits <= 0 || duration <= 0) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          website: newWebsite.trim(),
          targetHits,
          duration,
          hitType,
        }),
      });

      if (response.ok) {
        const newCampaign = await response.json();
        setCampaigns(prev => [...prev, newCampaign]);
        setNewWebsite("");
        setTargetHits(100);
        setDuration(1);
        setHitType('page-view');
      } else {
        console.error('Failed to create campaign');
      }
    } catch (error) {
      console.error('Failed to create campaign:', error);
    }
  };

  const handleDeleteCampaign = async (campaignId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`/api/campaigns/${campaignId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setCampaigns(prev => prev.filter(c => c.id !== campaignId));
      } else {
        console.error('Failed to delete campaign');
      }
    } catch (error) {
      console.error('Failed to delete campaign:', error);
    }
  };

  const handleRunCampaign = async (campaignId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`/api/campaigns/${campaignId}/start`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Reload campaigns to get updated state
        const updatedResponse = await fetch('/api/campaigns', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (updatedResponse.ok) {
          const data = await updatedResponse.json();
          setCampaigns(data);
        }
      }
    } catch (error) {
      console.error('Failed to start campaign:', error);
    }
  };

  const handlePauseCampaign = async (campaignId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`/api/campaigns/${campaignId}/stop`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Reload campaigns to get updated state
        const updatedResponse = await fetch('/api/campaigns', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (updatedResponse.ok) {
          const data = await updatedResponse.json();
          setCampaigns(data);
        }
      }
    } catch (error) {
      console.error('Failed to pause campaign:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const totalActiveCampaigns = campaigns.filter(c => c.isActive).length;
  const totalHitsToday = campaigns.reduce((sum, c) => sum + c.currentHits, 0);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">


      {/* Sticky Top Website Navbar with curved container design */}
      <div className="sticky top-0 z-50 px-8 py-4">
        <nav className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg rounded-2xl">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo - Like pre-login */}
              <div className="flex items-center space-x-3">
                <Rocket className="w-8 h-8 text-purple-600" />
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  SkyHit
                </span>
              </div>

              {/* Navigation Links */}
              <div className="hidden lg:flex items-center space-x-8">
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors text-sm font-medium">How It Works?</a>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors text-sm font-medium">FAQ</a>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors text-sm font-medium">Menu ▾</a>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors text-sm font-medium">Pages ▾</a>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors text-sm font-medium">Legal ▾</a>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors text-sm font-medium">Media ▾</a>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors text-sm font-medium">SEO Tools ▾</a>
              </div>

              {/* User Info & Sign Out */}
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center text-sm">
                  <span className="text-gray-700">Hello, </span>
                  <span className="text-purple-600 font-medium ml-1">
                    {JSON.parse(localStorage.getItem("user") || '{"username":"Aritra Mahatma"}').username}
                  </span>
                </div>
                <Button 
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Traffic Statistics Section */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-8">
            <TrendingUp className="w-8 h-8 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-800">Traffic Statistics</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-purple-600">{totalHitsToday.toLocaleString()}</div>
                    <div className="text-gray-600 font-medium">Hits Available</div>
                  </div>
                  <Zap className="w-12 h-12 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-purple-600">{campaigns.reduce((sum, c) => sum + c.currentHits, 0).toLocaleString()}</div>
                    <div className="text-gray-600 font-medium">Hits Received</div>
                  </div>
                  <Download className="w-12 h-12 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-purple-600">{campaigns.length}</div>
                    <div className="text-gray-600 font-medium">No. of Domains</div>
                  </div>
                  <Globe className="w-12 h-12 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-purple-600">{campaigns.length * 2}</div>
                    <div className="text-gray-600 font-medium">No. of Links</div>
                  </div>
                  <ExternalLink className="w-12 h-12 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-purple-600">12</div>
                    <div className="text-gray-600 font-medium">Referrals</div>
                  </div>
                  <Users className="w-12 h-12 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-purple-600">{totalActiveCampaigns}</div>
                    <div className="text-gray-600 font-medium">Active Sessions</div>
                  </div>
                  <RefreshCw className="w-12 h-12 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Campaign Launch Center */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-8">
            <Target className="w-8 h-8 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-800">Campaign Launch Center</h2>
          </div>
          
          <Card className="bg-white border-gray-200 rounded-2xl shadow-lg">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Target Website</label>
                    <Input
                      value={newWebsite}
                      onChange={(e) => setNewWebsite(e.target.value)}
                      placeholder="Enter your website URL..."
                      className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 rounded-xl focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Target Volume: {targetHits} hits</label>
                    <input
                      type="range"
                      min="1"
                      max="10000"
                      value={targetHits}
                      onChange={(e) => setTargetHits(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider accent-purple-600"
                    />
                    <div className="flex justify-between text-gray-500 text-sm mt-1">
                      <span>1</span>
                      <span>10,000</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Duration</label>
                    <Select value={duration.toString()} onValueChange={(value) => setDuration(Number(value))}>
                      <SelectTrigger className="bg-gray-50 border-gray-300 text-gray-900 rounded-xl focus:border-purple-500 focus:ring-purple-500">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.5">30 minutes</SelectItem>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="2">2 hours</SelectItem>
                        <SelectItem value="6">6 hours</SelectItem>
                        <SelectItem value="12">12 hours</SelectItem>
                        <SelectItem value="24">24 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Traffic Quality</label>
                    <Select value={hitType} onValueChange={(value: any) => setHitType(value)}>
                      <SelectTrigger className="bg-gray-50 border-gray-300 text-gray-900 rounded-xl focus:border-purple-500 focus:ring-purple-500">
                        <SelectValue placeholder="Select traffic type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="page-view">Page Views</SelectItem>
                        <SelectItem value="click">Clicks</SelectItem>
                        <SelectItem value="unique-visitor">Unique Visitors</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex flex-col justify-center items-center space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Ready to Launch?</h3>
                    <p className="text-gray-600">Start driving quality traffic to your website</p>
                  </div>
                  
                  <Button
                    onClick={handleCreateCampaign}
                    disabled={!newWebsite.trim() || targetHits <= 0 || duration <= 0}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-12 py-4 rounded-full text-lg font-bold shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105"
                  >
                    <Zap className="w-6 h-6 mr-3" />
                    Launch Campaign
                  </Button>
                  
                  <div className="flex items-center space-x-4 text-gray-500 text-sm">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Instant Start</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Real-time Analytics</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Campaign Control Panel */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-8">
            <Activity className="w-8 h-8 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-800">Campaign Control Panel</h2>
          </div>
          
          <Card className="bg-white border-gray-200 rounded-2xl shadow-lg">
            <CardContent className="p-8">
              {campaigns.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No campaigns running</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Launch your first traffic campaign to start driving visitors to your website.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="bg-gray-50 rounded-xl p-6 space-y-4 border border-gray-200">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${campaign.isActive ? 'bg-violet-500 animate-pulse' : 'bg-gray-400'}`}></div>
                          <span className="font-bold text-gray-800 text-lg">{campaign.website}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-violet-300 text-violet-600 hover:bg-violet-50 rounded-full px-4 py-2 text-sm font-medium"
                            onClick={() => window.open(campaign.website, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Visit
                          </Button>
                          
                          <div className="flex items-center space-x-3">
                            <Switch
                              checked={campaign.isActive}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  handleRunCampaign(campaign.id);
                                } else {
                                  handlePauseCampaign(campaign.id);
                                }
                              }}
                              className="data-[state=checked]:bg-violet-600 data-[state=unchecked]:bg-gray-300"
                            />
                          </div>
                          
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-violet-300 text-violet-600 hover:bg-violet-50 rounded-full px-3 py-2 text-sm font-medium"
                            onClick={() => handleDeleteCampaign(campaign.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">{campaign.currentHits.toLocaleString()}</div>
                          <div className="text-gray-600 text-sm">Hits Received</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">{campaign.targetHits.toLocaleString()}</div>
                          <div className="text-gray-600 text-sm">Target Hits</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">{Math.round((campaign.currentHits / campaign.targetHits) * 100)}%</div>
                          <div className="text-gray-600 text-sm">Progress</div>
                        </div>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-500 ${
                            campaign.isActive 
                              ? 'bg-gradient-to-r from-violet-500 to-purple-600 animate-pulse' 
                              : 'bg-gradient-to-r from-violet-400 to-purple-500'
                          }`}
                          style={{ width: `${Math.min((campaign.currentHits / campaign.targetHits) * 100, 100)}%` }}
                        ></div>
                      </div>

                      {campaign.isActive && campaign.startTime && (
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Started: {campaign.startTime ? new Date(campaign.startTime).toLocaleTimeString() : 'Not started'}</span>
                          {campaign.duration && (
                            <span>
                              Remaining: {campaign.startTime ? Math.max(0, campaign.duration - ((new Date().getTime() - new Date(campaign.startTime).getTime()) / (1000 * 60 * 60))).toFixed(1) : campaign.duration}h
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-8 mb-4">
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Twitter</a>
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Telegram</a>
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">GitHub</a>
          </div>
          <p className="text-gray-500 text-sm">© 2025 SkyHit - Built on Replit</p>
        </footer>
      </div>
    </div>
  );
}