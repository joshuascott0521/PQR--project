// import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const PerfilSkeleton = () => {
  return (
    <div className="h-full flex flex-col animate-pulse">
      {/* <div className="flex flex-row mb-[15px] items-center gap-[15px]">
        <Skeleton circle width={35} height={35} />
        <Skeleton height={33} width={180} />
      </div> */}
      <div className="flex-1 flex-col overflow-y-auto bg-gray-100 px-6 py-4 rounded-lg space-y-4">
        <form className="flex flex-col bg-white px-6 py-2.5 rounded-lg shadow-md w-full">
          <Skeleton height={24} width={200} className=" mb-[-20px]" />
          <Skeleton height={2} className="bg-gray-300 m-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pb-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="w-full">
                <Skeleton height={20} width={100} className="mb-1" />
                <Skeleton height={36} className="rounded-md" />
              </div>
            ))}
          </div>

          <Skeleton height={2} className="bg-gray-300" />

          <Skeleton height={20} width={160} className="mb-4 mt-2" />

          <div className="flex justify-between items-start gap-4">
            <div className="w-1/2 text-xs text-gray-600 space-y-2">
              <Skeleton count={3} height={12} />
              <Skeleton height={36} width={120} className="mt-4" />
            </div>
            <div className="w-full md:w-1/2">
              <Skeleton height={20} width={100} className="mb-1" />
              <Skeleton height={128} className="rounded-lg w-full" />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-auto pt-2">
            <Skeleton height={36} width={100} className="rounded-md" />
            <Skeleton height={36} width={100} className="rounded-md" />
          </div>
        </form>
      </div>
    </div>
  );
};
