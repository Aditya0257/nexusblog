import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { SkeletonBlogCard } from "../components/SkeletonBlogCard";
import { useBlogs } from "../hooks/useblogshook";

export const Blogs = () => {
  // store it in state (recoil)
  // store it directly here
  // store it in context variable
  // create our own custom hook called useBlogs -> doing this

  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div>
        <Appbar />
        <SkeletonBlogs />;
      </div>
    );
  }
  return (
    <div>
      <Appbar />
      <div className="flex mt-20 justify-center">
        <div className="max-w-md lg:max-w-2xl flex flex-col w-full">
          {blogs.map((b) => {
            return (
              <BlogCard
                key={b.id}
                no={b.no}
                publishedDate={b.publishedDate}
                authorName={
                  b.authorName !== undefined ? b.authorName : "Anonymous"
                }
                title={b.title}
                content={b.content}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

function SkeletonBlogs() {
  const numOfSkeletontoRender = 4;

  return (
    <div>
      <div className="flex mt-20 justify-center">
        <div className="max-w-md lg:max-w-2xl w-full flex flex-col">
          {Array.from({ length: numOfSkeletontoRender }).map((_, index) => (
            <SkeletonBlogCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
