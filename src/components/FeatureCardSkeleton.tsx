import { Skeleton } from './ui/skeleton/Skeleton';

export const FeatureCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      {/* Image */}
      <Skeleton className="h-56 w-full rounded-none" />

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <Skeleton className="h-4 w-1/2" />

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-3 w-2/3" />
        </div>

        {/* Price + Button */}
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-7 w-14" />
        </div>
      </div>
    </div>
  );
};
