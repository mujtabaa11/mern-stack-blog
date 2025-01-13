import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function handleClick() {
  useDispatch().clearFormData();
}

export default function Header() {
  return (
    <div className="flex justify-between items-center text-text-accent bg-accent sticky top-0 left-0 w-full p-4 rounded-b-lg z-50 shadow-md min-h-[60px]">
      {/* Logo and App Name */}
      <Link to={"/"}>
        <h1 className="text-2xl font-bold">Awesome Blogging App</h1>
      </Link>

      {/* Navigation Links */}
      <ul className="flex gap-6">
        <li>
          <Link
            to={"/"}
            className="text-text-primary hover:text-text-accent transition-colors"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to={"/edit-blog"}
            className="text-text-primary hover:text-text-accent transition-colors"
            onClick={handleClick}
          >
            New Blog
          </Link>
        </li>
      </ul>
    </div>
  );
}
