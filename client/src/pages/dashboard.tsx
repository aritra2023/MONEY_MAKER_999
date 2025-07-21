import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogOut, Play, Square } from "lucide-react";

export default function Dashboard() {
  const [siteUrl, setSiteUrl] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const handleAddUrl = () => {
    if (siteUrl.trim()) {
      // Add URL logic here
      setSiteUrl("");
    }
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen p-6" style={{ background: '#0d0221', color: '#fff', fontFamily: 'Poppins, sans-serif' }}>
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-400">Welcome, User</h1>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">
          <LogOut className="mr-2 w-4 h-4" />
          Logout
        </Button>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="glass p-4 rounded-lg shadow-lg text-center bg-white/5 border border-white/10 backdrop-blur-[10px]">
          <h2 className="text-xl font-semibold">Today's Hits</h2>
          <p className="text-2xl text-purple-300 font-bold mt-2">1540</p>
        </div>
        <div className="glass p-4 rounded-lg shadow-lg text-center bg-white/5 border border-white/10 backdrop-blur-[10px]">
          <h2 className="text-xl font-semibold">Top Country</h2>
          <p className="text-2xl text-purple-300 font-bold mt-2">India</p>
        </div>
        <div className="glass p-4 rounded-lg shadow-lg text-center bg-white/5 border border-white/10 backdrop-blur-[10px]">
          <h2 className="text-xl font-semibold">Bot Status</h2>
          <p className="text-2xl text-green-400 font-bold mt-2">{isRunning ? 'Active' : 'Stopped'}</p>
        </div>
        <div className="glass p-4 rounded-lg shadow-lg text-center bg-white/5 border border-white/10 backdrop-blur-[10px]">
          <h2 className="text-xl font-semibold">Ad Loads</h2>
          <p className="text-2xl text-purple-300 font-bold mt-2">92%</p>
        </div>
      </div>

      {/* URL Manager */}
      <div className="glass p-6 rounded-lg mb-6 bg-white/5 border border-white/10 backdrop-blur-[10px]">
        <h2 className="text-2xl font-bold mb-4 text-purple-300">URL Traffic Manager</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            type="text"
            placeholder="Enter site URL"
            value={siteUrl}
            onChange={(e) => setSiteUrl(e.target.value)}
            className="flex-1 p-2 rounded bg-gray-900 border border-purple-500 text-white"
          />
          <Button 
            onClick={handleAddUrl}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
          >
            Add URL
          </Button>
          <Button 
            onClick={handleStart}
            disabled={isRunning}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            <Play className="mr-1 w-4 h-4" />
            Start
          </Button>
          <Button 
            onClick={handleStop}
            disabled={!isRunning}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            <Square className="mr-1 w-4 h-4" />
            Stop
          </Button>
        </div>
      </div>

      {/* Banner Preview */}
      <div className="glass p-6 rounded-lg mb-6 bg-white/5 border border-white/10 backdrop-blur-[10px]">
        <h2 className="text-2xl font-bold mb-4 text-purple-300">Banner Preview</h2>
        <div className="w-full h-48 bg-white rounded-lg shadow-md flex items-center justify-center">
          <div className="w-96 h-32 bg-gray-300 rounded flex items-center justify-center text-gray-600">
            Banner Placeholder
          </div>
        </div>
      </div>

      {/* Live Console */}
      <div className="glass p-6 rounded-lg mb-6 bg-white/5 border border-white/10 backdrop-blur-[10px]">
        <h2 className="text-2xl font-bold mb-4 text-purple-300">Bot Console</h2>
        <div className="bg-black text-green-400 font-mono p-4 h-40 overflow-y-auto rounded">
          {isRunning ? (
            <>
              Hit started on https://your-site.com<br />
              Ad loaded successfully<br />
              Proxy rotated<br />
              Waiting 5s before next hit...
            </>
          ) : (
            <>
              Bot is stopped<br />
              Awaiting start command...
            </>
          )}
        </div>
      </div>

      {/* Premium Panel */}
      <div className="glass p-6 rounded-lg mb-6 bg-white/5 border border-white/10 backdrop-blur-[10px]">
        <h2 className="text-2xl font-bold mb-4 text-purple-300">Upgrade to Premium</h2>
        <p className="mb-3">Unlock features like residential proxies, faster threads, cloaked ad loading and country targeting.</p>
        <Button className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded text-black font-bold">
          Upgrade Now
        </Button>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-center text-gray-400 text-sm">
        © 2025 AutoTrafficPro. All rights reserved.
      </footer>
    </div>
  );
}