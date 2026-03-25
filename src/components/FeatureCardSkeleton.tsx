export const FeatureCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden animate-pulse">
      {/* Image */}
      <div className="h-56 bg-gray-200" />

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <div className="h-4 bg-gray-200 rounded w-1/2" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
          <div className="h-3 bg-gray-200 rounded w-2/3" />
        </div>

        {/* Price + Button */}
        <div className="flex justify-between items-center pt-2">
          <div className="h-4 w-12 bg-gray-200 rounded" />

          <div className="h-7 w-14 bg-gray-200 rounded-sm" />
        </div>
      </div>
    </div>
  );
};
