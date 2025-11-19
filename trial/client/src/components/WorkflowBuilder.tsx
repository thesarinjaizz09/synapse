import React, { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Play, Save } from 'lucide-react';

interface Node {
  id: string;
  type: 'trigger' | 'action';
  label: string;
  position: { x: number; y: number };
  config: Record<string, any>;
}

interface Edge {
  id: string;
  source: string;
  target: string;
}

interface WorkflowBuilderProps {
  workflowId: string;
  initialNodes?: Node[];
  initialEdges?: Edge[];
  onSave?: (nodes: Node[], edges: Edge[]) => void;
  onRun?: () => void;
}

export const WorkflowBuilder: React.FC<WorkflowBuilderProps> = ({
  workflowId,
  initialNodes = [],
  initialEdges = [],
  onSave,
  onRun,
}) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const triggerNodes = [
    { id: 'webhook', label: 'Webhook Trigger', icon: '🔗' },
    { id: 'schedule', label: 'Schedule Trigger', icon: '⏰' },
    { id: 'email', label: 'Email Trigger', icon: '📧' },
  ];

  const actionNodes = [
    { id: 'http', label: 'HTTP Request', icon: '🌐' },
    { id: 'email-send', label: 'Send Email', icon: '📤' },
    { id: 'slack', label: 'Send to Slack', icon: '💬' },
    { id: 'sheets', label: 'Google Sheets', icon: '📊' },
  ];

  const addNode = (type: 'trigger' | 'action', nodeType: string, label: string) => {
    const newNode: Node = {
      id: `${nodeType}-${Date.now()}`,
      type,
      label,
      position: { x: Math.random() * 400, y: Math.random() * 300 },
      config: {},
    };
    setNodes([...nodes, newNode]);
  };

  const deleteNode = (nodeId: string) => {
    setNodes(nodes.filter(n => n.id !== nodeId));
    setEdges(edges.filter(e => e.source !== nodeId && e.target !== nodeId));
    setSelectedNode(null);
  };

  const handleNodeMouseDown = (e: React.MouseEvent, node: Node) => {
    setIsDragging(true);
    setSelectedNode(node);
    setDragOffset({
      x: e.clientX - node.position.x,
      y: e.clientY - node.position.y,
    });
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (isDragging && selectedNode) {
      const newPosition = {
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      };
      setNodes(nodes.map(n =>
        n.id === selectedNode.id ? { ...n, position: newPosition } : n
      ));
    }
  };

  const handleCanvasMouseUp = () => {
    setIsDragging(false);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(nodes, edges);
    }
  };

  const handleRun = () => {
    if (onRun) {
      onRun();
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r border-border bg-card p-4 overflow-y-auto">
        <h3 className="font-semibold mb-4">Nodes</h3>
        
        <div className="mb-6">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Triggers</h4>
          <div className="space-y-2">
            {triggerNodes.map(node => (
              <Button
                key={node.id}
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => addNode('trigger', node.id, node.label)}
              >
                <span className="mr-2">{node.icon}</span>
                {node.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Actions</h4>
          <div className="space-y-2">
            {actionNodes.map(node => (
              <Button
                key={node.id}
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => addNode('action', node.id, node.label)}
              >
                <span className="mr-2">{node.icon}</span>
                {node.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="border-b border-border bg-card p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Workflow Builder</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleRun}>
              <Play className="w-4 h-4 mr-2" />
              Run
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Canvas Area */}
        <div
          className="flex-1 bg-background relative overflow-hidden"
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          onMouseLeave={handleCanvasMouseUp}
        >
          {/* Grid background */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }} />

          {/* Nodes */}
          <div className="absolute inset-0">
            {nodes.map(node => (
              <div
                key={node.id}
                className={`absolute w-48 p-3 rounded-lg border-2 cursor-move transition-all ${
                  selectedNode?.id === node.id
                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                    : 'border-border bg-card'
                }`}
                style={{
                  left: `${node.position.x}px`,
                  top: `${node.position.y}px`,
                }}
                onMouseDown={(e) => handleNodeMouseDown(e, node)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground">
                      {node.type === 'trigger' ? '🔴 Trigger' : '🟢 Action'}
                    </div>
                    <div className="font-medium text-sm">{node.label}</div>
                  </div>
                  <button
                    onClick={() => deleteNode(node.id)}
                    className="text-destructive hover:bg-destructive/10 p-1 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs text-muted-foreground">
                  ID: {node.id.substring(0, 12)}...
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inspector Panel */}
      {selectedNode && (
        <div className="w-80 border-l border-border bg-card p-4 overflow-y-auto">
          <h3 className="font-semibold mb-4">Node Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Node Type</label>
              <p className="text-sm text-muted-foreground mt-1">{selectedNode.type}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Node Label</label>
              <Input
                value={selectedNode.label}
                onChange={(e) => {
                  const updated = { ...selectedNode, label: e.target.value };
                  setSelectedNode(updated);
                  setNodes(nodes.map(n => n.id === selectedNode.id ? updated : n));
                }}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Configuration</label>
              <Card className="mt-2 p-3 bg-muted">
                <p className="text-xs text-muted-foreground">
                  Configuration options will appear here based on node type.
                </p>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowBuilder;
