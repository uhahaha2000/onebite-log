import { HeartIcon } from "lucide-react";

export default function LikePostButton({ id, likeCount }: { id: number; likeCount: number }) {
  
  return (
    <div className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border-1 p-2 px-4 text-sm">
      <HeartIcon className="h-4 w-4" />
      <span>{likeCount}</span>
    </div>
  );
}
