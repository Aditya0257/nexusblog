import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { BlogResponseType, BlogType, formatDate } from "../hooks/useblogshook";

export const SearchInputBox = ({ setBlogs, setLoading }: { setBlogs: React.Dispatch<React.SetStateAction<BlogType[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const searchOptions = ["All", "Author", "Content"];

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    // console.log("Starting search...");
    setLoading(true); 
  
    try {
      const res = await axios.get(
        `${BACKEND_URL}/api/v1/blog/search?filter=${searchQuery}&limit=${10}&qtype=${selectedOption}`,
        {
          headers: {
            Authorization: "Bearer " + String(localStorage.getItem("token")),
          },
        }
      );
  
      console.log("Search results fetched, updating blogs...");
      setBlogs(
        res.data.blogs.map((b: BlogResponseType) => {
          return {
            ...b,
            authorName: b.author.name,
            publishedDate: formatDate(b.publishedDate),
          };
        })
      );
    } catch (err) {
      console.log("Error occurred while fetching filtered blogs, err:", err);
    } finally {
      // console.log("Setting loading: false");
      setLoading(false);  // Set loading false after request completion
    }
  };
  

  return (
    <div className="flex">
      <form className="max-w-lg mx-auto">
        <div className="flex">
          {/* Dropdown Button */}
          <button
            onClick={toggleDropdown}
            id="dropdown-button"
            className="flex-shrink-0 w-28 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
            type="button"
          >
            {selectedOption}{" "}
            <svg
              className="w-2.5 h-2.5 ml-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              id="dropdown"
              className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
            >
              <ul
                className="py-2 text-sm text-gray-700"
                aria-labelledby="dropdown-button"
              >
                {searchOptions.map((option, index) => (
                  <li key={index}>
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                      onClick={() => handleOptionClick(option)}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Search Input */}
          <div className="relative w-64">
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder={`Search...`}
              value={searchQuery}
              onChange={handleInputChange}
              required
            />
            <button
              type="submit"
              onClick={handleSearch}
              className="absolute top-0 right-0 p-4 flex items-center justify-center text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >

              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>

              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
