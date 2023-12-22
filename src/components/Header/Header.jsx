import { Link } from "react-router-dom";
import logo from "../../assets/icons/logo-umpa-loompa.png";

import "./Header.scss";

function Header() {
  return (
    <div className="header">
      {/* <Link to="/"> */}
      <img src={logo} alt="Logo" width={50} />
      <h1>Oompa Loompa's Crew</h1>
      {/* </Link> */}
    </div>
  );
}

export default Header;
