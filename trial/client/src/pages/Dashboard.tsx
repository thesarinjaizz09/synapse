import React from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Play, Edit2, Trash2, Copy, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { useAuth } from '@/_core/hooks/useAuth';

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { data: workflows, isLoading } = trpc.workflow.list.useQuery();
  const createMutation = trpc.workflow.create.useMutation();
  const deleteMutation = trpc.workflow.delete.useMutation();
  const duplicateMutation = trpc.workflow.duplicate.useMutation();

  const handleCreateWorkflow = async () => {
    try {
      const result = await createMutation.mutateAsync({
        name: 'New Workflow',
        description: 'Untitled workflow',
      });
      setLocation(`/builder/${result.id}`);
    } catch (error) {
      console.error('Failed to create workflow:', error);
    }
  };

  const handleDeleteWorkflow = async (id: string) => {
    if (confirm('Are you sure you want to delete this workflow?')) {
      try {
        await deleteMutation.mutateAsync({ id });
      } catch (error) {
        console.error('Failed to delete workflow:', error);
      }
    }
  };

  const handleDuplicateWorkflow = async (id: string, name: string) => {
    try {
      const result = await duplicateMutation.mutateAsync({
        id,
        newName: `${name} (Copy)`,
      });
      setLocation(`/builder/${result.id}`);
    } catch (error) {
      console.error('Failed to duplicate workflow:', error);
    }
  };

  const totalRuns = 0; // TODO: Fetch from execution stats
  const activeWorkflows = workflows?.filter(wf => wf.isActive).length || 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Workflows</h1>
              <p className="text-muted-foreground mt-1">Manage and monitor your automation workflows</p>
            </div>
            <Button onClick={handleCreateWorkflow} size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Create Workflow
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Workflows</p>
                <p className="text-3xl font-bold mt-2">{workflows?.length || 0}</p>
              </div>
              <div className="text-4xl opacity-20">📋</div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Workflows</p>
                <p className="text-3xl font-bold mt-2">{activeWorkflows}</p>
              </div>
              <div className="text-4xl opacity-20">✅</div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Runs</p>
                <p className="text-3xl font-bold mt-2">{totalRuns}</p>
              </div>
              <div className="text-4xl opacity-20">🚀</div>
            </div>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            placeholder="Search workflows..."
            className="max-w-md"
          />
        </div>

        {/* Workflows List */}
        <div className="space-y-4">
          {isLoading ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">Loading workflows...</p>
            </Card>
          ) : workflows && workflows.length > 0 ? (
            workflows.map((workflow) => (
              <Card key={workflow.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold">{workflow.name}</h3>
                      <Badge variant={workflow.isActive ? 'default' : 'secondary'}>
                        {workflow.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {workflow.description || 'No description'}
                    </p>
                    <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Created {new Date(workflow.createdAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        0 runs
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setLocation(`/builder/${workflow.id}`)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setLocation(`/executions/${workflow.id}`)}
                    >
                      <Clock className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDuplicateWorkflow(workflow.id, workflow.name)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteWorkflow(workflow.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-12 text-center">
              <div className="text-5xl mb-4">📭</div>
              <h3 className="text-lg font-semibold mb-2">No workflows yet</h3>
              <p className="text-muted-foreground mb-6">Create your first workflow to get started</p>
              <Button onClick={handleCreateWorkflow}>
                <Plus className="w-4 h-4 mr-2" />
                Create Workflow
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
