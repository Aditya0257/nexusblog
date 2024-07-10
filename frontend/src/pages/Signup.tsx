// import { useRecoilValue } from "recoil";
import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";
// import { userAtom } from "../store/atoms/user";

export const Signup = () => {
  // const { username, isAuthenticated } = useRecoilValue(userAtom);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <Auth type="signup" />
        </div>
        <div className="hidden lg:block">
          <Quote />
        </div>
      </div>
    </div>
  );
};
