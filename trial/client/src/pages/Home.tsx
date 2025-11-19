import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { ArrowRight, Zap, GitBranch, Shield, Workflow, BarChart3 } from "lucide-react";

export default function Home() {
  const { user, loading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center gap-2">
              {APP_LOGO && <img src={APP_LOGO} alt="Logo" className="w-8 h-8" />}
              <span className="font-bold text-lg">{APP_TITLE}</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setLocation('/settings')}
              >
                Settings
              </Button>
              <Button onClick={() => setLocation('/dashboard')}>
                Go to Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </nav>

        {/* Welcome Section */}
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">Welcome back, {user?.name || 'User'}!</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Ready to automate your workflows?
            </p>
            <Button size="lg" onClick={() => setLocation('/dashboard')}>
              <Workflow className="w-5 h-5 mr-2" />
              Open Dashboard
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <Zap className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Quick Start</h3>
              <p className="text-muted-foreground">
                Create your first workflow in minutes with our intuitive builder.
              </p>
            </Card>

            <Card className="p-6">
              <GitBranch className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Integrations</h3>
              <p className="text-muted-foreground">
                Connect with 100+ apps and services to build powerful automations.
              </p>
            </Card>

            <Card className="p-6">
              <BarChart3 className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Analytics</h3>
              <p className="text-muted-foreground">
                Track execution history and monitor workflow performance in real-time.
              </p>
            </Card>

            <Card className="p-6">
              <Shield className="w-8 h-8 text-red-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Secure</h3>
              <p className="text-muted-foreground">
                Enterprise-grade security with encrypted credentials and audit logs.
              </p>
            </Card>

            <Card className="p-6">
              <Workflow className="w-8 h-8 text-orange-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Scalable</h3>
              <p className="text-muted-foreground">
                Handle millions of executions with our distributed architecture.
              </p>
            </Card>

            <Card className="p-6">
              <ArrowRight className="w-8 h-8 text-cyan-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">API First</h3>
              <p className="text-muted-foreground">
                Full REST and WebSocket APIs for complete programmatic control.
              </p>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-card/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {APP_LOGO && <img src={APP_LOGO} alt="Logo" className="w-8 h-8" />}
            <span className="font-bold text-lg">{APP_TITLE}</span>
          </div>
          <Button asChild>
            <a href={getLoginUrl()}>Sign In</a>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Automate Everything
          </h1>
          <p className="text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Build powerful workflow automations without writing code. Connect your favorite apps and services.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <a href={getLoginUrl()}>
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          <div className="p-6 rounded-lg border border-border bg-card/50">
            <Zap className="w-10 h-10 text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Drag & Drop Builder</h3>
            <p className="text-muted-foreground">
              Visually create workflows with our intuitive drag-and-drop interface.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-border bg-card/50">
            <GitBranch className="w-10 h-10 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">100+ Integrations</h3>
            <p className="text-muted-foreground">
              Connect with popular apps like Slack, Gmail, Stripe, and more.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-border bg-card/50">
            <BarChart3 className="w-10 h-10 text-purple-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Real-time Monitoring</h3>
            <p className="text-muted-foreground">
              Track execution history and monitor workflow performance live.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-border bg-card/50">
            <Shield className="w-10 h-10 text-red-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Enterprise Security</h3>
            <p className="text-muted-foreground">
              End-to-end encryption and compliance with industry standards.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-border bg-card/50">
            <Workflow className="w-10 h-10 text-orange-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Unlimited Scale</h3>
            <p className="text-muted-foreground">
              Handle millions of executions with our cloud infrastructure.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-border bg-card/50">
            <ArrowRight className="w-10 h-10 text-cyan-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">API & Webhooks</h3>
            <p className="text-muted-foreground">
              Full REST API and webhook support for advanced integrations.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center p-12 rounded-lg border border-border bg-card">
          <h2 className="text-3xl font-bold mb-4">Ready to automate?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of teams automating their workflows with our platform.
          </p>
          <Button size="lg" asChild>
            <a href={getLoginUrl()}>
              Sign Up Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
