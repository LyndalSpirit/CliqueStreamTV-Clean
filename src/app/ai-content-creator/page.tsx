'use client';

import React, { useState } from 'react';
import { generateScriptFromPrompt } from '@/ai/flows/generate-script-from-prompt';
import { generateVideoThumbnail } from '@/ai/flows/generate-video-thumbnail';

export default function AIContentCreatorPage() {
  const [promptInput, setPromptInput] = useState('');
  const [scriptOutput, setScriptOutput] = useState('');
  const [thumbnailPrompt, setThumbnailPrompt] = useState('');

  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [isGeneratingThumbnail, setIsGeneratingThumbnail] = useState(false);

  const [scriptError, setScriptError] = useState<string | null>(null);
  const [thumbnailError, setThumbnailError] = useState<string | null>(null);

  async function handleGenerateScript(e: React.FormEvent) {
    e.preventDefault();
    setScriptError(null);
    setIsGeneratingScript(true);

    try {
      const trimmed = promptInput.trim();
      if (!trimmed) {
        throw new Error('Please enter a prompt first.');
      }

      const result = await generateScriptFromPrompt({
        prompt: trimmed,
        tone: 'neutral',
        durationMinutes: 5,
      });

      setScriptOutput(result.script ?? '');
    } catch (err: unknown) {
      console.error('Error generating script:', err);
      setScriptError(
        err instanceof Error ? err.message : 'Failed to generate script.',
      );
    } finally {
      setIsGeneratingScript(false);
    }
  }

  async function handleGenerateThumbnail() {
    setThumbnailError(null);
    setIsGeneratingThumbnail(true);

    try {
      const trimmedPrompt = promptInput.trim();
      const trimmedScript = scriptOutput.trim();

      if (!trimmedPrompt && !trimmedScript) {
        throw new Error('Enter a prompt or generate a script first.');
      }

      const result = await generateVideoThumbnail({
        title: trimmedPrompt || 'Untitled video',
        description: trimmedScript || trimmedPrompt || 'No description provided',
        platform: 'YouTube',
        mood: 'cinematic',
        style: 'lo-fi digital art',
        aspectRatio: '16:9',
        tags: ['clique stream tv', 'ai content', 'thumbnail'],
      });

      // Our flow returns { prompt: string }
      setThumbnailPrompt(result.prompt ?? '');
    } catch (err: unknown) {
      console.error('Error generating thumbnail prompt:', err);
      setThumbnailError(
        err instanceof Error
          ? err.message
          : 'Failed to generate thumbnail prompt.',
      );
    } finally {
      setIsGeneratingThumbnail(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-4xl space-y-8">
        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            AI Content Creator
          </h1>
          <p className="text-sm text-muted-foreground">
            One idea in — get a structured script and a thumbnail prompt out.
          </p>
        </header>

        {/* Prompt + Script Generator */}
        <section className="rounded-xl border border-border bg-card p-4 md:p-6 space-y-4">
          <form onSubmit={handleGenerateScript} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Video concept / prompt
              </label>
              <textarea
                className="w-full min-h-[120px] rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Describe your video idea, who it’s for, and what you want it to cover…"
              />
            </div>

            {scriptError && (
              <p className="text-sm text-destructive">{scriptError}</p>
            )}

            <button
              type="submit"
              disabled={isGeneratingScript}
              className="inline-flex items-center rounded-md border border-border bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90 disabled:opacity-50"
            >
              {isGeneratingScript ? 'Generating script…' : 'Generate script'}
            </button>
          </form>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Generated script</label>
            <textarea
              className="w-full min-h-[200px] rounded-md border border-border bg-background px-3 py-2 text-sm"
              value={scriptOutput}
              onChange={(e) => setScriptOutput(e.target.value)}
              placeholder="Your generated script will appear here. You can still edit it by hand."
            />
          </div>
        </section>

        {/* Thumbnail Prompt Generator */}
        <section className="rounded-xl border border-border bg-card p-4 md:p-6 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">Thumbnail prompt</h2>
              <p className="text-xs text-muted-foreground">
                Uses your concept + script to build a detailed prompt for your image generator.
              </p>
            </div>
            <button
              type="button"
              onClick={handleGenerateThumbnail}
              disabled={isGeneratingThumbnail}
              className="inline-flex items-center rounded-md border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground hover:opacity-90 disabled:opacity-50"
            >
              {isGeneratingThumbnail ? 'Generating…' : 'Generate prompt'}
            </button>
          </div>

          {thumbnailError && (
            <p className="text-sm text-destructive">{thumbnailError}</p>
          )}

          <textarea
            className="w-full min-h-[160px] rounded-md border border-border bg-background px-3 py-2 text-sm"
            value={thumbnailPrompt}
            onChange={(e) => setThumbnailPrompt(e.target.value)}
            placeholder="Your thumbnail AI prompt will appear here. Copy this into Pika, Flux, etc."
          />
        </section>
      </div>
    </div>
  );
}
