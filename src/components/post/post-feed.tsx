import Fallback from "@/components/fallback";
import Loader from "@/components/loader";
import PostItem from "@/components/post/post-item";
import { usePostsData } from "@/hooks/mutations/post/use-posts-data";
import { useInfinitePostData } from "@/hooks/queries/use-infinite-posts-data";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function PostFeed() {
  const { data, error, isPending, fetchNextPage , isFetchingNextPage} = useInfinitePostData();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      // 데이터 추가
      fetchNextPage();
    }
  }, [inView]);

  if (error) return <Fallback />;

  if (isPending) return <Loader />;

  return (
    <div className="flex flex-col gap-10">
      {data.pages.map((page) =>
        page.map((postId) => <PostItem key={postId} postId={postId} />),
      )}
      {isFetchingNextPage && <Loader/>}
      <div ref={ref} className="h-4 bg-amber-800"></div>
    </div>
  );
}

