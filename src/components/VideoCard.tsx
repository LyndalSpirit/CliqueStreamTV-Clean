// src/components/VideoCard.tsx
export interface VideoCardData {
  id: string;
  title: string;
  channel: string;
  views: string;
  timeAgo: string;
  duration: string;
}

interface VideoCardProps {
  video: VideoCardData;
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <article className="group flex flex-col">
      {/* Thumbnail */}
      <div className="relative mb-2 overflow-hidden rounded-xl bg-slate-800 shadow-sm transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:shadow-lg">
        <div className="aspect-video w-full bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900" />

        {/* Duration pill */}
        <span className="absolute bottom-2 right-2 rounded-md bg-black/80 px-1.5 py-0.5 text-[10px] font-semibold text-slate-100">
          {video.duration}
        </span>
      </div>

      {/* Meta */}
      <div className="flex flex-1 flex-col text-[11px] sm:text-xs">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-slate-50">
          {video.title}
        </h3>
        <p className="mt-1 text-[11px] text-slate-400">{video.channel}</p>
        <p className="mt-0.5 text-[11px] text-slate-500">
          {video.views} • {video.timeAgo}
        </p>
      </div>
    </article>
  );
}
