import axios from "axios";
import { Appbar } from "../components/Appbar";
import { BACKEND_URL } from "../config";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner";

export const Publish = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function postNewBlog() {
    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: "Bearer " + String(localStorage.getItem("token")),
          },
        },
      );
      setLoading(false);
      navigate(`/blog/no/${response.data.no}`);
    } catch (e) {
      console.log("Some error occured while posting the blog");
      alert("Error occurred while posting the blog!");
    }
  }

  return (
    <div>
      <Appbar isOnPublishPage={true} />
      <div className="flex justify-center mt-20 w-screen">
        <div className="flex flex-col justify-start w-1/2">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            className="p-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full "
            placeholder="Title"
            required
          />

          <TextArea onChange={(e) => setContent(e.target.value)} />
          <button
            onClick={postNewBlog}
            type="submit"
            disabled={loading}
            className="mt-4 w-36 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800"
          >
            {loading === false ? (
              "Publish Post"
            ) : (
              <div className="flex w-full justify-center items-center">
                <Spinner />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

function TextArea({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <textarea
        onChange={onChange}
        className="mt-4 min-h-[300px] block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
        placeholder="Write your thoughts here..."
      ></textarea>
    </div>
  );
}
