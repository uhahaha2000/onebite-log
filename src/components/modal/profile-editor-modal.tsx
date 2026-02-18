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
import { useEffect, useRef, useState } from "react";
import { useUpdateProfile } from "@/hooks/mutations/profile/use-update-profile";
import { toast } from "sonner";

type Image = {
  file: File;
  previewUrl: string;
};

export default function ProfileEditorModal() {
  const postEditorModal = usePostEditorModal();
  const session = useSession();

  const store = useProfileEditorModal();
  const { isOpen, actions: { close } } = store;

  const { mutate: updateProfile, isPending: isUpdateProfilePending } =
    useUpdateProfile({
      onSuccess: () => {
        close();
      },
      onError: (error) => {
        toast.error("프로필 수정에 실패했습니다. 다시 시도해주세요.", {
          position: "top-center",
        });
      },
    });

  const {
    data: profile,
    error: fetchProfileError,
    isPending: isFetchingProfilePending,
  } = useProfileData(session?.user.id);

  const [avatarImage, setAvatarImage] = useState<Image | null>(null);
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      if (avatarImage) {
        URL.revokeObjectURL(avatarImage.previewUrl);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && profile) {
      setNickname(profile.nickname);
      setBio(profile.bio);
      setAvatarImage(null);
    }
  }, [profile, isOpen]);

  const handleUpdateProfile = () => {
    if (nickname.trim() === "") {
      return;
    }

    updateProfile({
      userId: session!.user.id,
      nickname,
      bio,
      avatarImageFile: avatarImage?.file || null,
    });
  };

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files?.[0];
    if (avatarImage) {
      URL.revokeObjectURL(avatarImage.previewUrl);
    }

    setAvatarImage({
      file,
      previewUrl: URL.createObjectURL(file),
    });
  };
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
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleSelectImage}
                disabled={isUpdateProfilePending}
              />
              <img
                onClick={() => {
                  if (fileInputRef.current) fileInputRef.current.click();
                }}
                src={
                  avatarImage?.previewUrl || profile.avata_url || defaultAvatar
                }
                className="h-20 w-20 cursor-pointer rounded-full object-cover"
              ></img>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground">닉네임</div>
              <Input
                disabled={isUpdateProfilePending}
                value={nickname || profile.nickname}
                onChange={(e) => setNickname(e.target.value)}
              ></Input>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground">소개</div>
              <Input
                disabled={isUpdateProfilePending}
                value={bio || profile.bio}
                onChange={(e) => setBio(e.target.value)}
              ></Input>
            </div>
            <Button
              disabled={isUpdateProfilePending}
              className="cursor-pointer"
              onClick={handleUpdateProfile}
            >
              수정하기
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
