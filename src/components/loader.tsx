import { LoaderCircleIcon } from "lucide-react";

export default function Loader() {
  return (
    <div className="text-muted-foreground item-center flex flex-col justify-center gap-5 text-center">
      <LoaderCircleIcon className="animate-spin m-auto h-6 w-6" />
      <div className="text-sm">데이터를 불러오는 중입니다.</div>
    </div>
  );
}
