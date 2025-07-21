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
  MousePointer
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
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [newWebsite, setNewWebsite] = useState("");
  const [targetHits, setTargetHits] = useState(100);
  const [duration, setDuration] = useState(1);
  const [hitType, setHitType] = useState<'page-view' | 'unique-visitor' | 'click'>('page-view');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate traffic generation for active campaigns
  useEffect(() => {
    const interval = setInterval(() => {
      setCampaigns(prev => prev.map(campaign => {
        if (campaign.isActive && campaign.currentHits < campaign.targetHits) {
          const timeElapsed = campaign.startTime ? 
            (new Date().getTime() - campaign.startTime.getTime()) / (1000 * 60 * 60) : 0;
          
          if (timeElapsed < campaign.duration) {
            // Generate hits at a realistic rate
            const hitsPerSecond = campaign.targetHits / (campaign.duration * 3600);
            const increment = Math.random() < hitsPerSecond * 5 ? 1 : 0;
            return { ...campaign, currentHits: Math.min(campaign.currentHits + increment, campaign.targetHits) };
          } else {
            // Campaign completed or timed out
            return { ...campaign, isActive: false };
          }
        }
        return campaign;
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleCreateCampaign = () => {
    if (!newWebsite.trim() || targetHits <= 0 || duration <= 0) return;

    const newCampaign: Campaign = {
      id: Date.now().toString(),
      website: newWebsite.trim(),
      targetHits,
      duration,
      hitType,
      isActive: false,
      currentHits: 0
    };

    setCampaigns([...campaigns, newCampaign]);
    setNewWebsite("");
    setTargetHits(100);
    setDuration(1);
  };

  const handleStartCampaign = (campaignId: string) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === campaignId 
        ? { ...campaign, isActive: true, startTime: new Date() }
        : campaign
    ));
  };

  const handleStopCampaign = (campaignId: string) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === campaignId 
        ? { ...campaign, isActive: false }
        : campaign
    ));
  };

  const handleDeleteCampaign = (campaignId: string) => {
    setCampaigns(prev => prev.filter(campaign => campaign.id !== campaignId));
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
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      </div>
      {/* Header Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg">
        <div className="flex items-center space-x-12">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">TrafficFlow</h1>
              <p className="text-xs text-gray-500">Professional Traffic Exchange</p>
            </div>
          </div>
          
          <div className="hidden lg:flex space-x-8">
            <a href="#" className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-purple-50 text-purple-700 font-medium border border-purple-200">
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:text-purple-700 hover:bg-purple-50 transition-all">
              <Activity className="w-4 h-4" />
              <span>Analytics</span>
            </a>
            <a href="#" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:text-purple-700 hover:bg-purple-50 transition-all">
              <Target className="w-4 h-4" />
              <span>Campaigns</span>
            </a>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-4 px-4 py-2 bg-gray-50 rounded-lg border">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              {currentTime.toLocaleTimeString()}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-700">Admin</span>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50 px-6 py-2 rounded-lg font-medium"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white/90 font-medium">System Online</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Professional Traffic 
            <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Exchange Platform
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Advanced campaign management system with real-time analytics, 
            precise targeting controls, and automated traffic distribution
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <Card className="bg-white/95 backdrop-blur-xl text-gray-900 border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{campaigns.length}</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">Total Campaigns</div>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div className="h-2 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full" style={{ width: `${Math.min((campaigns.length / 10) * 100, 100)}%` }}></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-xl text-gray-900 border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{totalActiveCampaigns}</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">Active Now</div>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div className="h-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full" style={{ width: `${campaigns.length > 0 ? (totalActiveCampaigns / campaigns.length) * 100 : 0}%` }}></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-xl text-gray-900 border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{totalHitsToday.toLocaleString()}</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">Total Hits</div>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full" style={{ width: `${Math.min((totalHitsToday / 1000) * 100, 100)}%` }}></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-xl text-gray-900 border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${totalActiveCampaigns > 0 ? 'bg-gradient-to-br from-orange-500 to-orange-600' : 'bg-gradient-to-br from-gray-400 to-gray-500'}`}>
                  {totalActiveCampaigns > 0 ? <RefreshCw className="w-6 h-6 text-white animate-spin" /> : <Clock className="w-6 h-6 text-white" />}
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{totalActiveCampaigns > 0 ? 'LIVE' : 'IDLE'}</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">System Status</div>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div className={`h-2 rounded-full ${totalActiveCampaigns > 0 ? 'bg-gradient-to-r from-orange-400 to-orange-500 animate-pulse' : 'bg-gradient-to-r from-gray-300 to-gray-400'}`} style={{ width: totalActiveCampaigns > 0 ? '100%' : '0%' }}></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Campaign Creation */}
        <Card className="bg-white/95 backdrop-blur-xl text-gray-900 border-0 shadow-2xl mb-12">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center text-gray-900 text-2xl">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <Plus className="w-5 h-5 text-white" />
              </div>
              Campaign Launch Center
              <Badge className="ml-auto bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border-purple-200">
                Professional
              </Badge>
            </CardTitle>
            <p className="text-gray-600 mt-2">Configure your traffic campaign with precision targeting and advanced controls</p>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Target Website</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="https://example.com"
                    value={newWebsite}
                    onChange={(e) => setNewWebsite(e.target.value)}
                    className="pl-11 h-12 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 text-gray-900 placeholder:text-gray-500 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Target Volume</label>
                <div className="relative">
                  <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="number"
                    min="1"
                    max="10000"
                    value={targetHits}
                    onChange={(e) => setTargetHits(parseInt(e.target.value) || 100)}
                    className="pl-11 h-12 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <p className="text-xs text-gray-500">1 - 10,000 hits</p>
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Campaign Duration</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="number"
                    min="0.5"
                    max="24"
                    step="0.5"
                    value={duration}
                    onChange={(e) => setDuration(parseFloat(e.target.value) || 1)}
                    className="pl-11 h-12 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <p className="text-xs text-gray-500">0.5 - 24 hours</p>
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Traffic Quality</label>
                <div className="relative">
                  <MousePointer className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                  <Select value={hitType} onValueChange={(value) => setHitType(value as any)}>
                    <SelectTrigger className="pl-11 h-12 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white rounded-xl shadow-2xl border-0">
                      <SelectItem value="page-view" className="rounded-lg">📄 Page Views</SelectItem>
                      <SelectItem value="unique-visitor" className="rounded-lg">👤 Unique Visitors</SelectItem>
                      <SelectItem value="click" className="rounded-lg">🖱️ Direct Clicks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-gray-500">Select traffic type</p>
              </div>
              <div className="flex flex-col justify-end space-y-3">
                <Button
                  onClick={handleCreateCampaign}
                  className="h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  disabled={!newWebsite.trim() || targetHits <= 0 || duration <= 0}
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Launch Campaign
                </Button>
                <p className="text-xs text-gray-500 text-center">Deploy instantly</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Campaigns List */}
        <Card className="bg-white/95 backdrop-blur-xl text-gray-900 border-0 shadow-2xl">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center text-gray-900 text-2xl">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                Campaign Control Center
              </CardTitle>
              <div className="flex items-center space-x-3">
                <Badge className={`px-3 py-1 ${totalActiveCampaigns > 0 ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                  {totalActiveCampaigns} Active
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-200 text-purple-600 hover:bg-purple-50"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
            <p className="text-gray-600 mt-2">Monitor and manage your traffic campaigns with real-time analytics</p>
          </CardHeader>
          <CardContent>
            {campaigns.length === 0 ? (
              <div className="text-center py-12">
                <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg mb-2">No campaigns created yet</p>
                <p className="text-sm text-gray-500">Create your first traffic campaign above to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="p-8 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-5">
                        <div className={`w-4 h-4 rounded-full shadow-lg ${campaign.isActive ? 'bg-green-500 animate-pulse shadow-green-200' : 'bg-gray-400'}`}></div>
                        <div>
                          <h3 className="font-bold text-xl text-gray-900 mb-2">{campaign.website}</h3>
                          <div className="flex items-center space-x-6 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Target className="w-4 h-4 text-purple-500" />
                              <span className="font-medium">{campaign.targetHits.toLocaleString()} {campaign.hitType}s</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-blue-500" />
                              <span className="font-medium">{campaign.duration}h</span>
                            </div>
                            <Badge className={`px-3 py-1 font-semibold ${campaign.isActive ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                              {campaign.isActive ? '🟢 LIVE' : '⚫ STOPPED'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button
                          onClick={() => window.open(campaign.website, '_blank')}
                          variant="outline"
                          size="sm"
                          className="border-blue-200 text-blue-600 hover:bg-blue-50 px-4 py-2"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Visit
                        </Button>
                        {campaign.isActive ? (
                          <Button
                            onClick={() => handleStopCampaign(campaign.id)}
                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2 shadow-lg"
                            size="sm"
                          >
                            <Pause className="w-4 h-4 mr-2" />
                            Stop Campaign
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleStartCampaign(campaign.id)}
                            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2 shadow-lg"
                            size="sm"
                            disabled={campaign.currentHits >= campaign.targetHits}
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Start Campaign
                          </Button>
                        )}
                        <Button
                          onClick={() => handleDeleteCampaign(campaign.id)}
                          variant="outline"
                          size="sm"
                          className="border-red-200 text-red-600 hover:bg-red-50 px-3 py-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Progress Section */}
                    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <Activity className="w-5 h-5 text-purple-500" />
                          <span className="font-semibold text-gray-800">Campaign Progress</span>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">{Math.round((campaign.currentHits / campaign.targetHits) * 100)}%</div>
                          <div className="text-sm text-gray-600">{campaign.currentHits.toLocaleString()}/{campaign.targetHits.toLocaleString()} hits</div>
                        </div>
                      </div>
                      
                      <div className="w-full bg-gray-300 rounded-full h-4 shadow-inner">
                        <div 
                          className={`h-4 rounded-full transition-all duration-500 shadow-lg ${
                            campaign.isActive 
                              ? 'bg-gradient-to-r from-green-400 to-green-500 animate-pulse' 
                              : 'bg-gradient-to-r from-gray-400 to-gray-500'
                          }`}
                          style={{ width: `${Math.min((campaign.currentHits / campaign.targetHits) * 100, 100)}%` }}
                        ></div>
                      </div>

                      {campaign.isActive && campaign.startTime && (
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2 text-blue-600">
                            <Clock className="w-4 h-4" />
                            <span>Started: {campaign.startTime.toLocaleTimeString()}</span>
                          </div>
                          {campaign.duration && (
                            <div className="flex items-center space-x-2 text-orange-600">
                              <Target className="w-4 h-4" />
                              <span>
                                Remaining: {Math.max(0, campaign.duration - ((new Date().getTime() - campaign.startTime.getTime()) / (1000 * 60 * 60))).toFixed(1)}h
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {!campaign.isActive && campaign.currentHits > 0 && (
                        <div className="text-center py-2 bg-blue-50 rounded-lg border border-blue-200">
                          <span className="text-blue-700 font-medium">Campaign Completed</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}