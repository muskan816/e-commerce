import { NavLink } from "react-router-dom";
import './Header.css'

const PageNav = ({ title }) => {
  return (
    <p className="text-[1.2rem] text-gray-600 mb-6 header pt-2 pb-4 px-6">
      <NavLink to="/" className="text-indigo-600 hover:underline cursor-pointer">
        Home
      </NavLink>{" "}
      / <span className="capitalize">{title}</span>
    </p>
  );
};

export default PageNav;
