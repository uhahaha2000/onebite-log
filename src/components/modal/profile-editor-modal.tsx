import Fallback from "@/components/fallback";
import Loader from "@/components/loader";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useProfileData } from "@/hooks/queries/use-profile-data";
import { usePostEditorModal } from "@/store/post-editor-modal";
import { useSession } from "@/store/session";
import defaultAvatar from "@/assets/default-avatar.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProfileEditorModal } from "@/store/profile-editor-modal";

export default function ProfileEditorModal() {
  const postEditorModal = usePostEditorModal();
  const session = useSession();

  const store = useProfileEditorModal();
  const { isOpen, actions: { close } } = store;

  const {
    data: profile,
    error: fetchProfileError,
    isPending: isFetchingProfilePending
  } = useProfileData(session?.user.id);
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="flex flex-col gap-5">
        <DialogTitle>프로필 수정하기</DialogTitle>

        {fetchProfileError && <Fallback />}
        {isFetchingProfilePending && <Loader />}
        {!fetchProfileError && !isFetchingProfilePending && (
          <>
            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground">프로필 이미지</div>
              <img
                src={profile.avata_url || defaultAvatar}
                className="h-20 w-20 cursor-pointer rounded-full object-cover"
              ></img>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground">닉네임</div>
              <Input defaultValue={profile.nickname}></Input>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground">소개</div>
              <Input defaultValue={profile.bio}></Input>
            </div>
            <Button className="cursor-pointer">수정하기</Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
