import { Link, useNavigate } from "react-router-dom";
import { LabelledInput } from "./LabelledInput";
import { useState } from "react";
import { SignupInput } from "@aditya0257/nexusblog-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs,
      );
      // console.log(response.headers);
      const authHeader =
        response.headers["authorization"] || response.headers["Authorization"];
      if (!authHeader) {
        throw new Error("Authorization header not found in the response");
      }
      const jwt = authHeader.split(" ")[1];
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      // alert the user here that the request failed
      console.error("Error during POST request:", e);
    }
  }

  return (
    <div className="h-screen flex justify-center ">
      <div className="flex flex-col justify-center ">
        <div className="px-10 text-center text-3xl font-extrabold">
          Create an account
        </div>
        <div className="px-2 mt-2 text-center text-slate-500 font-light text-md">
          {type === "signup"
            ? "Already have an account?"
            : "Don't have an account?"}

          <Link
            to={type === "signup" ? "/signin" : "/signup"}
            className="pl-3 underline"
          >
            {type === "signup" ? "Sign in" : "Sign up"}
          </Link>
        </div>

        {type === "signup" ? (
          <div className="mt-5">
            <LabelledInput
              onChange={(e) => {
                setPostInputs({ ...postInputs, name: e.target.value });
              }}
              label="Username"
              type="text"
              placeholder="Enter your username"
              id="user_name"
            />
          </div>
        ) : (
          <div></div>
        )}
        <div className="mt-3">
          <LabelledInput
            onChange={(e) => {
              setPostInputs({ ...postInputs, email: e.target.value });
            }}
            label="Email"
            type="email"
            placeholder="Enter your email"
            id="email_id"
          />
        </div>
        <div className="mt-3">
          <LabelledInput
            onChange={(e) => {
              setPostInputs({ ...postInputs, password: e.target.value });
            }}
            label="Password"
            type="password"
            placeholder="Enter your password"
            id="password"
          />
        </div>

        <button
          onClick={sendRequest}
          className="w-full mt-5 select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle  text-sm font-bold  text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          {type === "signup" ? "Sign Up" : "Sign In"}
        </button>
      </div>
    </div>
  );
};
