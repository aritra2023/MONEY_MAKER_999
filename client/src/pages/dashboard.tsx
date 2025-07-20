import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Rocket, 
  BarChart3, 
  Globe, 
  Play, 
  Square, 
  Plus,
  Settings,
  LogOut,
  Eye,
  MapPin,
  MousePointer,
  Crown
} from 'lucide-react';

export default function Dashboard() {
  const [isTrafficActive, setIsTrafficActive] = useState(false);
  const [siteUrl, setSiteUrl] = useState('');

  const handleStartTraffic = () => {
    setIsTrafficActive(true);
  };

  const handleStopTraffic = () => {
    setIsTrafficActive(false);
  };

  const handleAddSite = () => {
    if (siteUrl.trim()) {
      // Add site logic here
      setSiteUrl('');
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0f2e]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-indigo-900 to-purple-900 shadow-md">
        <div className="text-2xl font-bold text-white flex items-center">
          <Rocket className="w-6 h-6 mr-2" />
          SkyHit
        </div>
        <div className="hidden md:flex space-x-6 text-sm text-white">
          <button className="hover:text-purple-300 transition-colors">Dashboard</button>
          <button className="hover:text-purple-300 transition-colors">My Campaigns</button>
          <button className="hover:text-purple-300 transition-colors">Premium</button>
          <button className="hover:text-purple-300 transition-colors">
            <Settings className="w-4 h-4 inline mr-1" />
            Settings
          </button>
          <button 
            className="text-red-400 hover:text-red-300 transition-colors"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/";
            }}
          >
            <LogOut className="w-4 h-4 inline mr-1" />
            Logout
          </button>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#1a1c3b] p-6 space-y-4 hidden md:block min-h-screen">
          <h2 className="text-lg font-semibold text-purple-400">Quick Access</h2>
          <ul className="space-y-3 text-sm text-white">
            <li className="flex items-center">
              <BarChart3 className="w-4 h-4 mr-2 text-blue-400" />
              Traffic Sources
            </li>
            <li className="flex items-center">
              <Globe className="w-4 h-4 mr-2 text-green-400" />
              Bots / Proxies Used
            </li>
            <li className="flex items-center">
              <Crown className="w-4 h-4 mr-2 text-yellow-400" />
              Credits Left
            </li>
          </ul>
          <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 mt-6">
            <Crown className="w-4 h-4 mr-2" />
            Upgrade to Premium
          </Button>
        </aside>

        {/* Main Panel */}
        <main className="flex-1 p-6 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#242449] border-purple-800/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-green-400" />
                  Live Traffic Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-40 bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-2xl font-bold">
                      {isTrafficActive ? '🟢 ACTIVE' : '🔴 STOPPED'}
                    </div>
                    <div className="text-sm opacity-60 mt-2">
                      {isTrafficActive ? 'Traffic is flowing' : 'No active traffic'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#242449] border-purple-800/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
                  Last 7-day Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-40 bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-lg">Performance Chart</div>
                    <div className="text-sm opacity-60 mt-2">Analytics coming soon</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#242449] border-purple-800/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-purple-400" />
                  Website Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <iframe 
                  src="https://example.com" 
                  className="w-full h-40 rounded-lg border border-gray-700"
                  title="Website Preview"
                />
              </CardContent>
            </Card>

            <Card className="bg-[#242449] border-purple-800/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-cyan-400" />
                  Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-3 text-white">
                  <li className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-2 text-blue-400" />
                      Views
                    </span>
                    <Badge variant="secondary">23,492</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-green-400" />
                      Geo
                    </span>
                    <Badge variant="outline">India, US, UK</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center">
                      <MousePointer className="w-4 h-4 mr-2 text-purple-400" />
                      Clicks
                    </span>
                    <Badge variant="secondary">12,391</Badge>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Control Panel */}
          <div className="text-center space-x-4">
            <Button 
              onClick={handleStartTraffic}
              className="bg-green-500 hover:bg-green-600 px-8 py-3 text-lg font-bold shadow-lg"
              disabled={isTrafficActive}
            >
              <Play className="w-5 h-5 mr-2" />
              Start Traffic
            </Button>
            <Button 
              onClick={handleStopTraffic}
              variant="destructive"
              className="bg-red-500 hover:bg-red-600 px-8 py-3 text-lg font-bold shadow-lg"
              disabled={!isTrafficActive}
            >
              <Square className="w-5 h-5 mr-2" />
              Stop Traffic
            </Button>
          </div>

          {/* Add/Remove Sites */}
          <Card className="bg-[#242449] border-purple-800/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Plus className="w-5 h-5 mr-2 text-blue-400" />
                Add / Remove Sites
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input 
                  type="url"
                  placeholder="https://yoursite.com"
                  value={siteUrl}
                  onChange={(e) => setSiteUrl(e.target.value)}
                  className="flex-1 bg-gray-800 border-gray-700 text-white"
                />
                <Button 
                  onClick={handleAddSite}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Add Site
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Premium Section */}
          <Card className="bg-gradient-to-r from-purple-700 to-indigo-700 border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-yellow-300 flex items-center text-2xl">
                <Crown className="w-6 h-6 mr-2" />
                Premium Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-3 text-white">
                <li className="flex items-center">
                  <Globe className="w-4 h-4 mr-2 text-blue-400" />
                  Geo-targeting (by country)
                </li>
                <li className="flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2 text-green-400" />
                  Proxy Rotation Controls
                </li>
                <li className="flex items-center">
                  <Eye className="w-4 h-4 mr-2 text-purple-400" />
                  Human Behavior Emulation
                </li>
                <li className="flex items-center">
                  <MousePointer className="w-4 h-4 mr-2 text-red-400" />
                  Heatmaps + Session Time Analytics
                </li>
              </ul>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}