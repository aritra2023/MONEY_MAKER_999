import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Rocket
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const totalActiveCampaigns = campaigns.filter(c => c.isActive).length;
  const totalHitsToday = campaigns.reduce((sum, c) => sum + c.currentHits, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large floating orbs */}
        <div className="absolute top-32 left-20 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-64 right-32 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl animate-bounce-slow"></div>
        <div className="absolute bottom-64 left-64 w-72 h-72 bg-pink-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 right-48 w-56 h-56 bg-purple-300/15 rounded-full blur-2xl animate-bounce-slow" style={{animationDelay: '2s'}}></div>
        
        {/* Medium orbs */}
        <div className="absolute top-96 left-1/3 w-40 h-40 bg-violet-400/8 rounded-full blur-xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-20 right-1/4 w-32 h-32 bg-indigo-300/12 rounded-full blur-lg animate-bounce-slow" style={{animationDelay: '1.5s'}}></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/6 w-3 h-3 bg-white/30 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/5 w-2 h-2 bg-purple-300/40 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-2/3 left-1/4 w-2.5 h-2.5 bg-indigo-300/35 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/3 right-1/6 w-2 h-2 bg-pink-300/40 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-violet-300/45 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-white/25 rounded-full animate-ping" style={{animationDelay: '2.5s'}}></div>
        
        {/* Subtle light rays */}
        <div className="absolute top-0 left-1/4 w-px h-64 bg-gradient-to-b from-white/20 to-transparent rotate-12 animate-pulse"></div>
        <div className="absolute top-0 right-1/3 w-px h-48 bg-gradient-to-b from-purple-300/20 to-transparent -rotate-12 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Modern SkyHit Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Rocket className="w-8 h-8 text-white" />
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent font-['Poppins']">
                SkyHit
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#" className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/20 text-white font-medium backdrop-blur-sm border border-white/30">
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-all duration-300 font-medium">Download & Earn Hits</a>
              <a href="#" className="text-white/80 hover:text-white transition-all duration-300 font-medium">Websites</a>
              <a href="#" className="text-white/80 hover:text-white transition-all duration-300 font-medium">My Referrals</a>
              <a href="#" className="text-white/80 hover:text-white transition-all duration-300 font-medium">Settings</a>
            </div>

            {/* User Info & Sign Out */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3">
                <Users className="w-5 h-5 text-white" />
                <span className="text-white font-medium">Hello, Aritra Mahatma</span>
              </div>
              <Button 
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Traffic Statistics Section */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-8">
            <TrendingUp className="w-8 h-8 text-white" />
            <h2 className="text-3xl font-bold text-white font-['Poppins']">Traffic Statistics</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white/20 backdrop-blur-xl border-white/30 hover:shadow-2xl transition-all duration-300 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-white">✨ {totalHitsToday.toLocaleString()}</div>
                    <div className="text-white/70 font-medium">Hits Available</div>
                  </div>
                  <Zap className="w-12 h-12 text-yellow-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/20 backdrop-blur-xl border-white/30 hover:shadow-2xl transition-all duration-300 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-white">📩 {campaigns.reduce((sum, c) => sum + c.currentHits, 0).toLocaleString()}</div>
                    <div className="text-white/70 font-medium">Hits Received</div>
                  </div>
                  <Download className="w-12 h-12 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/20 backdrop-blur-xl border-white/30 hover:shadow-2xl transition-all duration-300 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-white">🌐 {campaigns.length}</div>
                    <div className="text-white/70 font-medium">No. of Domains</div>
                  </div>
                  <Globe className="w-12 h-12 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/20 backdrop-blur-xl border-white/30 hover:shadow-2xl transition-all duration-300 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-white">🔗 {campaigns.length * 2}</div>
                    <div className="text-white/70 font-medium">No. of Links</div>
                  </div>
                  <ExternalLink className="w-12 h-12 text-purple-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/20 backdrop-blur-xl border-white/30 hover:shadow-2xl transition-all duration-300 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-white">👥 12</div>
                    <div className="text-white/70 font-medium">Referrals</div>
                  </div>
                  <Users className="w-12 h-12 text-pink-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/20 backdrop-blur-xl border-white/30 hover:shadow-2xl transition-all duration-300 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-white">🔁 {totalActiveCampaigns}</div>
                    <div className="text-white/70 font-medium">Active Sessions</div>
                  </div>
                  <RefreshCw className="w-12 h-12 text-cyan-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Campaign Launch Center */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-8">
            <Target className="w-8 h-8 text-white" />
            <h2 className="text-3xl font-bold text-white font-['Poppins']">Campaign Launch Center</h2>
          </div>
          
          <Card className="bg-white/20 backdrop-blur-xl border-white/30 rounded-2xl">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Target Website</label>
                    <Input
                      value={newWebsite}
                      onChange={(e) => setNewWebsite(e.target.value)}
                      placeholder="Enter your website URL..."
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50 rounded-xl"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Target Volume: {targetHits} hits</label>
                    <input
                      type="range"
                      min="1"
                      max="10000"
                      value={targetHits}
                      onChange={(e) => setTargetHits(Number(e.target.value))}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-white/70 text-sm mt-1">
                      <span>1</span>
                      <span>10,000</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Duration</label>
                    <Select value={duration.toString()} onValueChange={(value) => setDuration(Number(value))}>
                      <SelectTrigger className="bg-white/10 border-white/30 text-white rounded-xl">
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
                    <label className="block text-white font-medium mb-2">Traffic Quality</label>
                    <Select value={hitType} onValueChange={(value: any) => setHitType(value)}>
                      <SelectTrigger className="bg-white/10 border-white/30 text-white rounded-xl">
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
                    <h3 className="text-2xl font-bold text-white mb-2">Ready to Launch?</h3>
                    <p className="text-white/70">Start driving quality traffic to your website</p>
                  </div>
                  
                  <Button
                    onClick={handleCreateCampaign}
                    disabled={!newWebsite.trim() || targetHits <= 0 || duration <= 0}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-12 py-4 rounded-full text-lg font-bold shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105"
                  >
                    <Zap className="w-6 h-6 mr-3" />
                    Launch Campaign
                  </Button>
                  
                  <div className="flex items-center space-x-4 text-white/60 text-sm">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Instant Start</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
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
            <Activity className="w-8 h-8 text-white" />
            <h2 className="text-3xl font-bold text-white font-['Poppins']">Campaign Control Panel</h2>
          </div>
          
          <Card className="bg-white/20 backdrop-blur-xl border-white/30 rounded-2xl">
            <CardContent className="p-8">
              {campaigns.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="w-12 h-12 text-white/70" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No campaigns running</h3>
                  <p className="text-white/70 max-w-md mx-auto">
                    Launch your first traffic campaign to start driving visitors to your website.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="bg-white/10 rounded-xl p-6 space-y-4 border border-white/20">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${campaign.isActive ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                          <span className="font-bold text-white text-lg">{campaign.website}</span>
                          <Badge className={`${campaign.isActive ? 'bg-green-500' : 'bg-gray-500'} text-white`}>
                            {campaign.isActive ? 'LIVE' : 'STOPPED'}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-white/30 text-white hover:bg-white/10"
                            onClick={() => window.open(campaign.website, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Visit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-red-300 text-red-300 hover:bg-red-500/20"
                            onClick={() => handleDeleteCampaign(campaign.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Stop
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">{campaign.currentHits.toLocaleString()}</div>
                          <div className="text-white/70 text-sm">Hits Received</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">{campaign.targetHits.toLocaleString()}</div>
                          <div className="text-white/70 text-sm">Target Hits</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">{Math.round((campaign.currentHits / campaign.targetHits) * 100)}%</div>
                          <div className="text-white/70 text-sm">Progress</div>
                        </div>
                      </div>
                      
                      <div className="w-full bg-white/20 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-500 ${
                            campaign.isActive 
                              ? 'bg-gradient-to-r from-green-400 to-blue-400 animate-pulse' 
                              : 'bg-gradient-to-r from-gray-400 to-gray-500'
                          }`}
                          style={{ width: `${Math.min((campaign.currentHits / campaign.targetHits) * 100, 100)}%` }}
                        ></div>
                      </div>

                      {campaign.isActive && campaign.startTime && (
                        <div className="flex justify-between text-sm text-white/70">
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
        <footer className="text-center py-8 border-t border-white/20">
          <div className="flex items-center justify-center space-x-8 mb-4">
            <a href="#" className="text-white/70 hover:text-white transition-colors">Twitter</a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">Telegram</a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">GitHub</a>
          </div>
          <p className="text-white/60 text-sm">© 2025 SkyHit - Built on Replit</p>
        </footer>
      </div>
    </div>
  );
}