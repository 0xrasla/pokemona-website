import { Link } from "react-router-dom";
import "../style/NaveBar.css";

function NaveBar() {
  return (
    <header>
      <nav className="navebar">
        <h2>Lazy Code</h2>
        <ul>
          <li>
            <Link to="/" className="nav-btn">
              Home
            </Link>
          </li>
          <li>
            <Link to="/fav" className="nav-btn">
              Favorites
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NaveBar;
