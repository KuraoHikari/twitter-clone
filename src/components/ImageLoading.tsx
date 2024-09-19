import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="mx-auto flex size-fit h-[200px] w-full animate-pulse items-center justify-center rounded-2xl bg-secondary">
      <Loader2 className="animate-spin" />
    </div>
  );
};

export default Loading;
