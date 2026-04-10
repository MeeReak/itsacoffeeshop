import { Skeleton } from './ui/skeleton/Skeleton';

export const CategorySkeleton = () => {
  return (
    <div className="flex gap-3 flex-wrap">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-16.75 rounded-full" />
      ))}
    </div>
  );
};
