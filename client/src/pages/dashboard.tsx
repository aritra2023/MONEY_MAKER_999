import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Users,
  Settings,
  Activity,
  LogOut,
  Eye,
  DollarSign,
  Cpu,
  Target,
  ShieldCheck,
  Sliders,
  Briefcase,
  Gift
} from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const features = [
    { icon: <Eye size={36} />, title: "Live Traffic Monitor", value: "1.2M views" },
    { icon: <DollarSign size={36} />, title: "Revenue Tracking", value: "$432.00" },
    { icon: <Cpu size={36} />, title: "Bot Engine Status", value: "Running" },
    { icon: <Target size={36} />, title: "Traffic Goals", value: "5K/hr" },
    { icon: <ShieldCheck size={36} />, title: "Security Protection", value: "Active" },
    { icon: <Sliders size={36} />, title: "Traffic Controls", value: "Optimized" },
    { icon: <Settings size={36} />, title: "System Settings", value: "Configured" },
    { icon: <Briefcase size={36} />, title: "Campaign Manager", value: "Active" },
    { icon: <Gift size={36} />, title: "Premium Features", value: "Unlocked" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1d1e4e] via-[#2c2f83] to-[#000428] text-white p-6 font-sans">
      <header className="flex justify-between items-center mb-10 animate-fade-in">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
            <div className="w-8 h-8 bg-gray-300 rounded"></div>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">SkyHit Dashboard</h1>
        </div>
        <Button
          variant="outline"
          className="text-white border-white hover:bg-white hover:text-[#1d1e4e] px-6 py-2 rounded-full shadow-lg transition-all duration-300"
        >
          <LogOut className="mr-2" /> Logout
        </Button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="transition-transform duration-300"
          >
            <Card className="bg-white/10 backdrop-blur-xl border-none text-white shadow-xl rounded-2xl">
              <CardContent className="flex flex-col gap-3 p-6">
                {feature.icon}
                <h2 className="text-xl font-semibold">{feature.title}</h2>
                <p className="text-3xl font-bold">{feature.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}