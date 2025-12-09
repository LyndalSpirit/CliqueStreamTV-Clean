// src/components/VideoGrid.tsx
import VideoCard, { VideoCardData } from "@/components/VideoCard";

interface VideoGridProps {
  videos: VideoCardData[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
  return (
    <div
      className="
        grid gap-3
        grid-cols-1
        sm:grid-cols-3
        lg:grid-cols-5
        xl:grid-cols-7
      "
    >
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
