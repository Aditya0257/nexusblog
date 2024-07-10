import { useParams } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks/usebloghook";

export const Blog = () => {
  const { no } = useParams<{ no: string }>();
  const blogNo = parseInt(no ?? "");
  const { loading, blog } = useBlog(blogNo);

  if (loading) {
    return (
      <div>
        <Appbar />
        <SkeletonBlog />
      </div>
    );
  }

  return (
    <div className="flex w-full">
      <Appbar />
      {blog ? (
        <FullBlog blog={blog} />
      ) : (
        <div className="font-extrabold text-4xl mt-40 ml-40">No blog found</div>
      )}
    </div>
  );
};

function SkeletonBlog() {
  const numOfSkeletontoRender = 28;
  return (
    <div role="status" className="mt-20 flex w-full p-2 animate-pulse">
      <div className="w-full grid grid-cols-12 gap-x-10 pt-5 px-10">
        <div className="col-span-8">
          <div className="flex flex-col items-start w-full ">
            <div className="bg-gray-200 w-2/4 rounded-full h-5 mb-0.5"></div>
            <div className="pl-1 mt-3 h-4 bg-gray-200 rounded-full w-1/4 mb-4"></div>

            {Array.from({ length: numOfSkeletontoRender }).map((_, index) => (
              <div
                key={index}
                className="pl-1 mt-1 mb-1 h-3 bg-gray-200 rounded-full w-5/6  "
              ></div>
            ))}
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col w-full ">
            <div className="  h-3 bg-gray-200 rounded-full w-2/5  mb-2"></div>

            <div className="flex w-full gap-x-3">
              <div className="h-20 w-10 flex flex-col justify-center">
                <div className=" h-6 w-6 bg-gray-200 rounded-full   mb-2"></div>
              </div>
              <div className="flex flex-col w-full justify-center">
                <div className=" h-2 bg-gray-200 rounded-full w-2/4  mb-2"></div>
                <div className="  h-2 mt-1 mb-1 bg-gray-200 rounded-full w-3/4 "></div>
                <div className="  h-2  mt-1 mb-1  bg-gray-200 rounded-full w-3/4 "></div>
                <div className="  h-2  mt-1 mb-1  bg-gray-200 rounded-full w-3/4 "></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
