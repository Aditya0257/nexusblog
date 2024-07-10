export const SkeletonBlogCard = () => {
  return (
    <div className="bg-white shadow-md rounded-lg my-2 p-4">
      <div role="status" className="p-2 animate-pulse ">
        <div className="flex flex-col ">
          <div className="flex h-4 bg-gray-200 rounded-full mb-4 w-3/4"></div>
          <div className="flex h-3  bg-gray-200 rounded-full w-full mt-4 mb-2.5"></div>
          <div className="mt-1 h-2 bg-gray-200 rounded-full w-full mb-2.5"></div>
          <div className="mt-1 h-2 bg-gray-200 rounded-full w-full mb-2.5"></div>

          <div className="mt-7 mb-4 h-2 bg-gray-200 rounded-full w-1/2"></div>
        </div>
      </div>
    </div>
  );
};
