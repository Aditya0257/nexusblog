import { SingleBlogType } from "../hooks/usebloghook";
import { formatDate } from "../hooks/useblogshook";
import { Avatar } from "./Avatar";

export const FullBlog = ({ blog }: { blog: SingleBlogType }) => {
  const date = formatDate(blog.publishedDate);

  return (
    <div className="w-full grid grid-cols-12 gap-x-10 pt-24 px-10">
      <div className="col-span-8">
        <div className="flex flex-col items-start w-full ">
          <div className="font-extrabold text-5xl mb-0.5">{blog.title} </div>
          <div className="pl-1 mt-3 text-slate-500 font-normal mb-4">
            Posted on {date}
          </div>
          <div className="pl-1 text-slate-800 font-light">{blog.content} </div>
        </div>
      </div>
      <div className="col-span-4">
        <div className="flex flex-col w-full ">
          <div className=" text-slate-700 font-semibold mb-2">Author</div>

          <div className="flex w-full gap-x-3">
            <div className="h-20 w-10 flex flex-col justify-center">
              <Avatar name={blog.author.name} size={"small"} />
            </div>
            <div className="flex flex-col w-full">
              <div className=" text-2xl font-extrabold mb-2">
                {blog.author && blog.author.name !== undefined
                  ? blog.author.name
                  : "Anonymous"}
              </div>
              <div className=" text-slate-500 font-normal">
                Whoever fights monsters should see to it that in the process he
                does not become a monster. And if you gaze long enough into an
                abyss, the abyss will gaze back into you.{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
