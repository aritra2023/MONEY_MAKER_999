import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Rocket, Eye, EyeOff } from "lucide-react";
import { useLocation } from "wouter";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: z.infer<typeof loginSchema>) => {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Login failed");
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast({
        title: "Login successful!",
        description: "Welcome back to SkyHit.",
      });
      setLocation("/dashboard");
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (data: z.infer<typeof signupSchema>) => {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Signup failed");
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast({
        title: "Account created successfully!",
        description: "Welcome to SkyHit.",
      });
      setLocation("/dashboard");
    },
    onError: (error: Error) => {
      toast({
        title: "Signup failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onLoginSubmit = (data: z.infer<typeof loginSchema>) => {
    loginMutation.mutate(data);
  };

  const onSignupSubmit = (data: z.infer<typeof signupSchema>) => {
    signupMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center shadow-xl mx-auto mb-4">
            <Rocket className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">SkyHit</h1>
          <p className="text-purple-200 mt-2">
            {isLogin ? "Welcome back" : "Join us today"}
          </p>
        </div>

        <Card className="bg-gray-900/90 backdrop-blur-md border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-center">
              {isLogin ? "Sign In" : "Create Account"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {isLogin ? (
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="your@email.com"
                            autoComplete="email"
                            className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="Your password"
                              autoComplete="current-password"
                              className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 h-12 pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 text-white/60 hover:text-white"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </Form>
            ) : (
              <div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Username</label>
                    <input
                      type="text"
                      placeholder="Your username"
                      value={signupForm.watch("username") || ""}
                      onChange={(e) => signupForm.setValue("username", e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={signupForm.watch("email") || ""}
                      onChange={(e) => signupForm.setValue("email", e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Choose a strong password"
                        value={signupForm.watch("password") || ""}
                        onChange={(e) => signupForm.setValue("password", e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  <Button
                    onClick={signupForm.handleSubmit(onSignupSubmit)}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 py-3"
                    disabled={signupMutation.isPending}
                  >
                    {signupMutation.isPending ? "Creating account..." : "Create Account"}
                  </Button>
                </div>
              </div>
            )}

            <div className="text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-purple-200 hover:text-white transition-colors"
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}