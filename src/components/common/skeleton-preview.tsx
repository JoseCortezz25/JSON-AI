import { Skeleton } from "../ui/skeleton";

const skeletonPreview = () => {
  return (
    <div className="w-[90%] mt-5 mx-auto flex flex-col gap-3">
      <Skeleton className="w-full h-[20px] bg-gray-200 dark:bg-neutral-800" />
      <Skeleton className="w-[80%] h-[20px] bg-gray-200 dark:bg-neutral-800" />
      <Skeleton className="w-[50%] h-[20px] bg-gray-200 dark:bg-neutral-800" />
      <Skeleton className="w-full h-[20px] bg-gray-200 dark:bg-neutral-800" />
      <Skeleton className="w-[85%] h-[20px] bg-gray-200 dark:bg-neutral-800" />
      <Skeleton className="w-[18%] h-[20px] bg-gray-200 dark:bg-neutral-800" />
    </div>
  );
};

export default skeletonPreview;