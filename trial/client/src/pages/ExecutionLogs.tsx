import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, CheckCircle, AlertCircle, Clock, Loader } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface ExecutionLogsProps {
  workflowId: string;
}

export default function ExecutionLogs({ workflowId }: ExecutionLogsProps) {
  const [, setLocation] = useLocation();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { data: executions, isLoading } = trpc.execution.list.useQuery({ workflowId });
  const { data: workflow } = trpc.workflow.get.useQuery({ id: workflowId });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'running':
        return <Loader className="w-4 h-4 text-blue-500 animate-spin" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'running':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const filteredExecutions = executions?.filter(exec => 
    statusFilter === 'all' || exec.status === statusFilter
  ) || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation('/dashboard')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Execution Logs</h1>
            <p className="text-muted-foreground mt-1">
              {workflow?.name || 'Workflow'} - Run history and details
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="mb-6 flex gap-2">
          {['all', 'success', 'failed', 'running', 'pending'].map(status => (
            <Button
              key={status}
              variant={statusFilter === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter(status)}
              className="capitalize"
            >
              {status}
            </Button>
          ))}
        </div>

        {/* Executions Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Started At</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Duration</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Error</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                      Loading executions...
                    </td>
                  </tr>
                ) : filteredExecutions.length > 0 ? (
                  filteredExecutions.map((execution) => (
                    <tr key={execution.id} className="border-b border-border hover:bg-muted/50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(execution.status)}
                          <Badge className={`capitalize ${getStatusColor(execution.status)}`}>
                            {execution.status}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {new Date(execution.startedAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {execution.duration ? `${execution.duration}ms` : '—'}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {execution.errorMessage ? (
                          <span className="text-destructive truncate max-w-xs">
                            {execution.errorMessage}
                          </span>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setLocation(`/execution/${execution.id}`)}
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center">
                      <div className="text-muted-foreground">
                        <p className="text-lg mb-2">No executions found</p>
                        <p className="text-sm">Run this workflow to see execution logs</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
