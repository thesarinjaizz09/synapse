import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import WorkflowBuilder from "./components/WorkflowBuilder";
import ExecutionLogs from "./pages/ExecutionLogs";
import Settings from "./pages/Settings";
import { useAuth } from "./_core/hooks/useAuth";
import { Loader2 } from "lucide-react";

function ProtectedRoute({ component: Component, ...props }: any) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <NotFound />;
  }

  return <Component {...props} />;
}

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/dashboard"}>
        {() => <ProtectedRoute component={Dashboard} />}
      </Route>
      <Route path={"/builder/:id"}>
        {(params) => (
          <ProtectedRoute
            component={WorkflowBuilder}
            workflowId={params.id}
          />
        )}
      </Route>
      <Route path={"/executions/:id"}>
        {(params) => (
          <ProtectedRoute
            component={ExecutionLogs}
            workflowId={params.id}
          />
        )}
      </Route>
      <Route path={"/settings"}>
        {() => <ProtectedRoute component={Settings} />}
      </Route>
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
