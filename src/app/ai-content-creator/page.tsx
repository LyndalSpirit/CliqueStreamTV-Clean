'use client';

import {Button} from '@/components/ui/button';
import {Form} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {useState} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {AlertTriangle} from 'lucide-react';

// Import ai instance to access plugins
import {createChannel} from '@/ai/flows/create-channel';
import {generateScriptFromPrompt} from '@/ai/flows/generate-script-from-prompt';
import {generateVideoThumbnail} from '@/ai/flows/generate-video-thumbnail';

export default function AIContentCreator() {
  const [script, setScript] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [scriptError, setScriptError] = useState<string | null>(null);
  const [thumbnailError, setThumbnailError] = useState<string | null>(null);

  // New states for channel creation
  const [channelName, setChannelName] = useState<string>('');
  const [channelDescription, setChannelDescription] = useState<string>('');
  const [channelCreationResult, setChannelCreationResult] = useState<string | null>(null);
  const [channelCreationError, setChannelCreationError] = useState<string | null>(null);

  const handleGenerateScript = async () => {
    setScriptError(null);
    try {
      const result = await generateScriptFromPrompt({prompt: prompt});
      if (result && result.script) {
        setScript(result.script);
      } else {
        setScriptError('Failed to generate script: No script returned.');
        setScript(null);
      }
    } catch (error: any) {
      console.error('Error generating script:', error);
      setScript(null);
      setScriptError('Failed to generate script. ' + error.message);
    }
  };

  const handleGenerateThumbnail = async () => {
    setThumbnailError(null);
    try {
      const result = await generateVideoThumbnail({prompt: prompt});
      if (result && result.imageUrl) {
        setThumbnailUrl(result.imageUrl);
      } else {
        setThumbnailError('Failed to generate thumbnail: No image URL returned.');
        setThumbnailUrl(null);
      }
    } catch (error: any) {
      console.error('Error generating thumbnail:', error);
      setThumbnailUrl(null);
      setThumbnailError('Failed to generate thumbnail. ' + error.message);
    }
  };

  const handleCreateChannel = async () => {
    setChannelCreationError(null);
    setChannelCreationResult(null);

    try {
      // Replace 'user123' with the actual user ID
      const result = await createChannel({
        userId: 'user123',
        channelName: channelName,
        channelDescription: channelDescription,
      });

      setChannelCreationResult(result.message);
    } catch (error: any) {
      console.error('Error creating channel:', error);
      setChannelCreationError('Failed to create channel. ' + error.message);
      setChannelCreationResult(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>AI Content Creator</CardTitle>
          <CardDescription>
            Enter a prompt to generate a video script and thumbnail.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="prompt">Prompt</Label>
                <Input
                  type="text"
                  id="prompt"
                  placeholder="e.g., A day in the life of a software engineer"
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button type="button" onClick={handleGenerateScript}>
                  Generate Script
                </Button>
                <Button type="button" onClick={handleGenerateThumbnail}>
                  Generate Thumbnail
                </Button>
              </div>
              {scriptError && (
                <Alert variant="destructive">
                  <AlertTitle>Error generating script</AlertTitle>
                  <AlertDescription>{scriptError}</AlertDescription>
                </Alert>
              )}
              {script && (
                <div className="grid gap-2">
                  <Label htmlFor="script">Generated Script</Label>
                  <Textarea id="script" readOnly value={script} className="min-h-[100px]" />
                </div>
              )}
              {thumbnailError && (
                <Alert variant="destructive">
                  <AlertTitle>Error generating thumbnail</AlertTitle>
                  <AlertDescription>{thumbnailError}</AlertDescription>
                </Alert>
              )}
              {thumbnailUrl && (
                <div className="grid gap-2">
                  <Label>Generated Thumbnail</Label>
                  <img
                    src={thumbnailUrl}
                    alt="Generated Thumbnail"
                    className="w-full rounded-md aspect-video"
                  />
                </div>
              )}
            </div>
          </Form>
        </CardContent>
      </Card>

      {/* Channel Creation Section */}
      <Card>
        <CardHeader>
          <CardTitle>Create Channel</CardTitle>
          <CardDescription>Create a new channel for your content.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="channelName">Channel Name</Label>
                <Input
                  type="text"
                  id="channelName"
                  placeholder="e.g., My Awesome Channel"
                  value={channelName}
                  onChange={e => setChannelName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="channelDescription">Channel Description</Label>
                <Textarea
                  id="channelDescription"
                  placeholder="e.g., A channel about awesome things"
                  value={channelDescription}
                  onChange={e => setChannelDescription(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
              <Button type="button" onClick={handleCreateChannel}>
                Create Channel
              </Button>

              {channelCreationError && (
                <Alert variant="destructive">
                  <AlertTitle>Error creating channel</AlertTitle>
                  <AlertDescription>{channelCreationError}</AlertDescription>
                </Alert>
              )}
              {channelCreationResult && (
                <Alert>
                  <AlertTitle>Channel Creation Result</AlertTitle>
                  <AlertDescription>{channelCreationResult}</AlertDescription>
                </Alert>
              )}
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

