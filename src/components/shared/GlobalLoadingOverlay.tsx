import React from "react";
import { useLoading } from "../../contexts/LoadingContext";
import LoadingSpinner from "./LoadingSpinner";

const GlobalLoadingOverlay: React.FC = () => {
  const { isLoading, loadingText } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 shadow-2xl">
        <LoadingSpinner size="lg" text={loadingText} />
      </div>
    </div>
  );
};

export default GlobalLoadingOverlay;
