import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface BaseBlog {
  id: string;
  no: number;
  title: string;
  content: string;
  published: boolean;
  publishedDate: string;
  authorId: string;
}

export interface BlogType extends BaseBlog {
  authorName: string;
}

export interface BlogResponseType extends BaseBlog {
  author: {
    name: string;
  };
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export const useBlogs = (): { loading: boolean; blogs: BlogType[]; setBlogs: React.Dispatch<React.SetStateAction<BlogType[]>>; setLoading: React.Dispatch<React.SetStateAction<boolean>>} => {
  const [loading, setLoading] = useState<boolean>(true);
  const [blogs, setBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: "Bearer " + String(localStorage.getItem("token")),
        },
      })
      .then((res) => {
        setBlogs(
          res.data.blogs.map((b: BlogResponseType) => {
            return {
              ...b,
              authorName: b.author.name,
              publishedDate: formatDate(b.publishedDate),
            };
          }),
        );
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
    setBlogs,
    setLoading
  };
};
