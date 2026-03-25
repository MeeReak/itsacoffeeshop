export const CategorySkeleton = () => {
  return (
    <div className="flex gap-3 flex-wrap">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse h-10 w-16.75 bg-gray-200 rounded-full"
        />
      ))}
    </div>
  );
};
