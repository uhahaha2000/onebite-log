import { Button } from "@/components/ui/button";
import { useOpenEditPostModal } from "@/store/post-editor-modal";

import type { PostEntity } from "@/types";

export default function EditPostItemButton(props: PostEntity) { 
  const openEditPostModal = useOpenEditPostModal();

  const handelButtonClick = () => { 
    openEditPostModal({
      PostId: props.id,
      content: props.content,
      imageUrls:props.image_urls
    });
  }

  return (
    <Button onClick={handelButtonClick} className="cursor-pointer" variant={"ghost"}>
      수정
    </Button>
  );
}