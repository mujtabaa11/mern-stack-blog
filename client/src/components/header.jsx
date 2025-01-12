import { Link } from "react-router-dom";


export default function Header() {
    return (
      <div>
        <Link to={"/"}>
          <h1>Awesome Blogging App</h1>
        </Link>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/edit-blog"}>New Blog</Link>
          </li>
        </ul>
      </div>
    );
  }