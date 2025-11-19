import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Copy, Trash2, Plus, Eye, EyeOff } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { useAuth } from '@/_core/hooks/useAuth';

export default function Settings() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [showTokens, setShowTokens] = useState<Record<string, boolean>>({});
  const [newTokenName, setNewTokenName] = useState('');
  
  const { data: profile } = trpc.user.getProfile.useQuery();
  const { data: apiTokens } = trpc.user.listApiTokens.useQuery();
  const createTokenMutation = trpc.user.createApiToken.useMutation();
  const deleteTokenMutation = trpc.user.deleteApiToken.useMutation();

  const handleCreateToken = async () => {
    if (!newTokenName.trim()) return;
    try {
      await createTokenMutation.mutateAsync({ name: newTokenName });
      setNewTokenName('');
    } catch (error) {
      console.error('Failed to create token:', error);
    }
  };

  const handleDeleteToken = async (id: string) => {
    if (confirm('Are you sure you want to delete this token?')) {
      try {
        await deleteTokenMutation.mutateAsync({ id });
      } catch (error) {
        console.error('Failed to delete token:', error);
      }
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
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
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-8">
        {/* Profile Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                value={profile?.name || ''}
                readOnly
                className="mt-1 bg-muted"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                value={profile?.email || ''}
                readOnly
                className="mt-1 bg-muted"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Role</label>
              <div className="mt-1">
                <Badge variant={profile?.role === 'admin' ? 'default' : 'secondary'}>
                  {profile?.role || 'user'}
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* API Tokens Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">API Tokens</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Create and manage API tokens for programmatic access to your workflows.
          </p>

          {/* Create Token Form */}
          <div className="mb-6 p-4 bg-muted rounded-lg">
            <label className="text-sm font-medium block mb-2">Create New Token</label>
            <div className="flex gap-2">
              <Input
                placeholder="Token name (e.g., 'Production API')"
                value={newTokenName}
                onChange={(e) => setNewTokenName(e.target.value)}
              />
              <Button
                onClick={handleCreateToken}
                disabled={!newTokenName.trim() || createTokenMutation.isPending}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create
              </Button>
            </div>
          </div>

          {/* Tokens List */}
          <div className="space-y-3">
            {apiTokens && apiTokens.length > 0 ? (
              apiTokens.map((token) => (
                <div
                  key={token.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium">{token.name}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                        {showTokens[token.id] ? token.token : '••••••••••••••••'}
                      </code>
                      <button
                        onClick={() => setShowTokens({
                          ...showTokens,
                          [token.id]: !showTokens[token.id]
                        })}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {showTokens[token.id] ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => copyToClipboard(token.token)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Created {new Date(token.createdAt).toLocaleDateString()}
                      {token.expiresAt && ` • Expires ${new Date(token.expiresAt).toLocaleDateString()}`}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive"
                    onClick={() => handleDeleteToken(token.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                No API tokens yet. Create one to get started.
              </p>
            )}
          </div>
        </Card>

        {/* Connected Integrations Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Connected Integrations</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Manage your connected third-party services and accounts.
          </p>
          <div className="text-center py-8 text-muted-foreground">
            <p>No connected integrations yet.</p>
            <p className="text-sm mt-2">Connect services in the workflow builder.</p>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 border-destructive/50 bg-destructive/5">
          <h2 className="text-xl font-semibold mb-4 text-destructive">Danger Zone</h2>
          <p className="text-sm text-muted-foreground mb-4">
            These actions cannot be undone. Please proceed with caution.
          </p>
          <Button variant="destructive">
            Delete Account
          </Button>
        </Card>
      </div>
    </div>
  );
}
