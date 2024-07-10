import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface SingleBlogType {
  no: number;
  title: string;
  content: string;
  publishedDate: string;
  author: {
    name: string;
  };
}

export const useBlog = (no: number) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<SingleBlogType | undefined>(undefined);

  async function getBlog(no: number) {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/no/${no}`, {
        headers: {
          Authorization: "Bearer " + String(localStorage.getItem("token")),
        },
      });

      // console.log(" API data: ", response.data.blog);

      setBlog(response.data.blog);
    } catch (e) {
      console.error("Error while fetching blog: ", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    try {
      if (!no) {
        throw Error("No blog number provided");
      }
      getBlog(no);
    } catch (e) {
      console.log("Error while fetching blog: ", e);
      setLoading(false);
    }
  }, [no]);

  return {
    loading,
    blog,
  };
};
