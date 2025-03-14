const NoResult = () => {
  return (
    <div className="flex min-h-[calc(100vh-12rem)] flex-col items-center justify-center gap-4 md:min-h-[calc(100vh-8rem)]">
      <svg
        className="h-16 w-16 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-xl font-semibold text-gray-600">
        Không tìm thấy kết quả nào
      </p>
      <p className="text-base text-gray-500">
        Vui lòng thử tìm kiếm với từ khóa khác
      </p>
    </div>
  );
};

export default NoResult;
