import Fallback from "@/components/fallback";
import Loader from "@/components/loader";
import PostItem from "@/components/post/post-item";
import { usePostsData } from "@/hooks/mutations/post/use-posts-data";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function PostFeed() {
  const { data, error, isPending } = usePostsData();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      // 데이터 추가
    }
  }, [inView]);

  if (error) return <Fallback />;

  if (isPending) return <Loader />;

  return (
    <div className="flex flex-col gap-10">
      {data.map((post) => (
        <PostItem key={post.id} {...post} />
      ))}
      <div ref={ref} className="h-4 bg-amber-800"></div>
    </div>
  );
}
