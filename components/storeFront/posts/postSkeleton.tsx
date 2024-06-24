const PostSkeleton = () => {
  return (
    <div className="p-1 md:p-2 relative min-w-[150px] w-full animate-pulse">
      <div
        className="w-full relative bg-gray-300 rounded-md"
        style={{ paddingTop: "122%" }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-1/6 bg-gradient-to-t from-gray-400 to-transparent rounded-b-sm" />
      </div>

      <div className="absolute text-sm bottom-4 left-3 flex w-[90%] items-center justify-between">
        <div className="pl-1 w-full h-4 bg-gray-400 rounded-md"></div>
      </div>
    </div>
  );
};

export default PostSkeleton;
