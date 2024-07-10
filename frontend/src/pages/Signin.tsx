// import { useRecoilValue } from "recoil";
import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";
// import { userSelector } from "../store/atoms/user";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Signin = () => {
  // const isAuthenticated = useRecoilValue(userSelector);
  const jwt = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (jwt) {
      navigate("/blogs", { replace: true });
    }
  });

  if (jwt) {
    return null;
  }
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <Auth type="signin" />
        </div>
        <div className="hidden lg:block">
          <Quote />
        </div>
      </div>
    </div>
  );
};
