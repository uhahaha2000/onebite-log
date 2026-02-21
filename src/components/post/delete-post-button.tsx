import { deletePost } from "@/api/post";
import { Button } from "@/components/ui/button";
import { useDeletePost } from "@/hooks/mutations/post/use-delete-post";
import { useOpenAlertModal } from "@/store/alert-modal";

import { use } from "react";
import { Navigate, replace, useNavigate } from "react-router";
import { toast } from "sonner";

export default function DeletePostButton({ id }: { id: number }) {
  const openAlertModal = useOpenAlertModal();
  const navigate = useNavigate();
  
  const { mutate: deletePost, isPending: isDeletePostPending } = useDeletePost({
    onSuccess: () => {
      const pathname = window.location.pathname;
      if (pathname.startsWith(`/post/${id}`)) {
        navigate("/", { replace: true });
      }

      toast.success("포스트 삭제 성공 했습니다", {
        position: "top-center",
      });
    },
    onError: (error) => {
      toast.error("포스트 삭제 실패 했습니다", {
        position: "top-center",
      });
    },
  });
  const handelDeleteClick = () => { 
    openAlertModal({
      title: "포스트 삭제",
      description:
        "삭제한 게시글은 복구할 수 없습니다.정말로 이 게시글을 삭제하시겠습니까?",
      onPositive: () => {
        deletePost(id);
      }
    });
  }

  return (
    <Button onClick={handelDeleteClick} className="cursor-pointer" variant={"ghost"} disabled={isDeletePostPending}>
      삭제
    </Button>
  );
}