import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function handleClick() {
  useDispatch().clearFormData();
}

export default function Header() {
  return (
    <div className="headerClass flex justify-between items-center top-0 left-0 p-4 z-50 shadow-md min-h-[60px]">
      {/* Logo and App Name */}
      <Link to={"/"}>
        <h1 className="text-2xl font-bold ">Awesome Blogging App</h1>
      </Link>

      {/* Navigation Links */}
      <ul className="flex gap-6 ">
        <li>
          <Link
            to={"/"}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to={"/edit-blog"}
            onClick={handleClick}
          >
            New Blog
          </Link>
        </li>
      </ul>
    </div>
  );
}
