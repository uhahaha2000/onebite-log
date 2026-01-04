import supabase from "@/lib/supabase";
import type { Post } from "@/types";

export async function fetchPosts(): Promise<Post[]> {
  const { data: posts, error: postsError } = await supabase
    .from("post")
    .select("*")
    .order("created_at", { ascending: false });

  if (postsError) throw postsError;
  if (!posts || posts.length === 0) return [];

  // author_id들을 수집
  const authorIds = [...new Set(posts.map((post) => post.author_id))];

  // profile 데이터를 한 번에 조회
  const { data: profiles, error: profilesError } = await supabase
    .from("profile")
    .select("*")
    .in("id", authorIds);

  if (profilesError) throw profilesError;

  // profile을 id로 매핑
  const profileMap = new Map(
    (profiles || []).map((profile) => [profile.id, profile])
  );

  // posts와 profiles를 조인
  return posts.map((post) => ({
    ...post,
    author: profileMap.get(post.author_id)!,
  })) as Post[];
}

export async function createPost(content: string) {
  const { data, error } = await supabase.from("post").insert({
    content,
  });

  if (error) throw error;
  return data;
}
