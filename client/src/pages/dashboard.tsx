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
  Download
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Header Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">SKYHIT</span>
          </div>
          
          <div className="hidden md:flex space-x-8 text-white/80">
            <a href="#" className="hover:text-white border-b-2 border-white/50">Dashboard</a>
            <a href="#" className="hover:text-white">Analytics</a>
            <a href="#" className="hover:text-white">Campaigns</a>
            <a href="#" className="hover:text-white">Reports</a>
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
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Traffic Exchange Dashboard
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Create targeted traffic campaigns with specific hit counts and duration settings
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 text-purple-300 mx-auto mb-2" />
              <div className="text-2xl font-bold mb-1">{campaigns.length}</div>
              <div className="text-sm text-white/60">Total Campaigns</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Play className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold mb-1">{totalActiveCampaigns}</div>
              <div className="text-sm text-white/60">Active Campaigns</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Globe className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold mb-1">{totalHitsToday}</div>
              <div className="text-sm text-white/60">Hits Generated Today</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold mb-1">{campaigns.filter(c => c.isActive).length > 0 ? 'Running' : 'Idle'}</div>
              <div className="text-sm text-white/60">System Status</div>
            </CardContent>
          </Card>
        </div>

        {/* Campaign Creation */}
        <Card className="bg-white/10 backdrop-blur-md border border-white/20 text-white mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Plus className="w-6 h-6 mr-3 text-purple-300" />
              Create New Traffic Campaign
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
              <div>
                <label className="block text-sm text-white/70 mb-2">Website URL</label>
                <Input
                  placeholder="https://example.com"
                  value={newWebsite}
                  onChange={(e) => setNewWebsite(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-2">Target Hits</label>
                <Input
                  type="number"
                  min="1"
                  max="10000"
                  value={targetHits}
                  onChange={(e) => setTargetHits(parseInt(e.target.value) || 100)}
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-2">Duration (Hours)</label>
                <Input
                  type="number"
                  min="0.5"
                  max="24"
                  step="0.5"
                  value={duration}
                  onChange={(e) => setDuration(parseFloat(e.target.value) || 1)}
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-2">Traffic Type</label>
                <Select value={hitType} onValueChange={(value) => setHitType(value as any)}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="page-view">Page Views</SelectItem>
                    <SelectItem value="unique-visitor">Unique Visitors</SelectItem>
                    <SelectItem value="click">Clicks</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleCreateCampaign}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white rounded-full"
                  disabled={!newWebsite.trim() || targetHits <= 0 || duration <= 0}
                >
                  Create Campaign
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Campaigns List */}
        <Card className="bg-white/10 backdrop-blur-md border border-white/20 text-white">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Target className="w-6 h-6 mr-3 text-purple-300" />
              Active Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent>
            {campaigns.length === 0 ? (
              <div className="text-center py-12">
                <Globe className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <p className="text-white/60 text-lg mb-2">No campaigns created yet</p>
                <p className="text-sm text-white/40">Create your first traffic campaign above to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="p-6 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${campaign.isActive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                        <div>
                          <h3 className="font-semibold text-white">{campaign.website}</h3>
                          <div className="flex items-center space-x-4 text-sm text-white/60">
                            <span>Target: {campaign.targetHits.toLocaleString()} {campaign.hitType}s</span>
                            <span>Duration: {campaign.duration}h</span>
                            <Badge className={`${campaign.isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                              {campaign.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={() => window.open(campaign.website, '_blank')}
                          variant="ghost"
                          size="sm"
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                        {campaign.isActive ? (
                          <Button
                            onClick={() => handleStopCampaign(campaign.id)}
                            className="bg-red-500 hover:bg-red-600"
                            size="sm"
                          >
                            <Pause className="w-4 h-4 mr-2" />
                            Stop
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleStartCampaign(campaign.id)}
                            className="bg-green-500 hover:bg-green-600"
                            size="sm"
                            disabled={campaign.currentHits >= campaign.targetHits}
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Start
                          </Button>
                        )}
                        <Button
                          onClick={() => handleDeleteCampaign(campaign.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Progress</span>
                        <span className="text-white">{campaign.currentHits}/{campaign.targetHits} hits ({Math.round((campaign.currentHits / campaign.targetHits) * 100)}%)</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${campaign.isActive ? 'bg-green-400' : 'bg-gray-400'}`}
                          style={{ width: `${Math.min((campaign.currentHits / campaign.targetHits) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {campaign.isActive && campaign.startTime && (
                      <div className="mt-3 text-sm text-white/60">
                        Started: {campaign.startTime.toLocaleString()}
                        {campaign.duration && (
                          <span className="ml-4">
                            Time remaining: {Math.max(0, campaign.duration - ((new Date().getTime() - campaign.startTime.getTime()) / (1000 * 60 * 60))).toFixed(1)}h
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
    </div>
  );
}