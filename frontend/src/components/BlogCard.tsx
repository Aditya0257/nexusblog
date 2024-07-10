import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

interface BlogCardProps {
  no: number;
  authorName: string;
  publishedDate: string;
  title: string;
  content: string;
}

export const BlogCard = ({
  no,
  authorName,
  publishedDate,
  title,
  content,
}: BlogCardProps) => {
  return (
    <Link to={`../blog/no/${no}`}>
      <div className="p-2 mb-5 flex border-b-2 border-b-slate-200 w-full cursor-pointer">
        <div className="flex flex-col border-b-gray-600">
          <div className="flex">
            <div className="flex flex-col justify-center items-center">
              <Avatar name={authorName} size="small" />
            </div>
            <div className="pl-2 flex flex-col justify-center  items-start">
              {authorName}
            </div>

            <SmallDot />

            <div className="flex flex-col justify-center items-start font-extralight text-slate-600">
              {publishedDate}
            </div>

            <SmallDot />
            <div className="flex flex-col justify-center items-start font-extralight text-slate-700">
              {no}
            </div>
          </div>
          <div className="mt-2 flex text-xl font-bold">{title}</div>
          <div className="mt-1 text-lg  font-thin">
            {content.slice(0, 210) + "..."}
          </div>
          <div className="mt-7 mb-2 font-light text-sm text-gray-600">
            {Math.floor(content.length / 100)} min read
          </div>
        </div>
      </div>
    </Link>
  );
};

export function SmallDot() {
  return (
    <div className="px-2 flex items-center justify-center ">
      <div className="h-0.5 w-0.5 rounded-full bg-gray-600"></div>
    </div>
  );
}
