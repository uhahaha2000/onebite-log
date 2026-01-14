import { TriangleAlert } from "lucide-react";

export default function Fallback() { 
  return (
    <div className="text-muted-foreground flex flex-col item-center justify-center gap-2 text-center">
      <TriangleAlert className="h-6 w-6 m-auto"/>
      <div>오류가 발생했습니다. 잠시후 다시 시도해주세효</div>
    </div>
  )
}