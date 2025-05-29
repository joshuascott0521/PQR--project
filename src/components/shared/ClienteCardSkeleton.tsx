const ClienteCardSkeleton = () => {
  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 p-3 sm:p-4 flex items-center gap-4 animate-pulse">
      <div className="w-[45px] h-[45px] rounded-full bg-gray-300 flex-shrink-0" />

      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        <div className="space-y-1.5">
          <div className="h-3 bg-gray-300 rounded w-3/4"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        </div>
        <div className="space-y-1.5">
          <div className="h-3 bg-gray-300 rounded w-full"></div>
          <div className="h-3 bg-gray-300 rounded w-3/4"></div>
        </div>
        <div className="space-y-1.5">
          <div className="h-3 bg-gray-300 rounded w-5/6"></div>
          <div className="h-3 bg-gray-300 rounded w-2/3"></div>
        </div>
      </div>

      <div className="w-[26px] h-[26px] bg-gray-300 rounded-full" />
    </div>
  );
};

export default ClienteCardSkeleton;
