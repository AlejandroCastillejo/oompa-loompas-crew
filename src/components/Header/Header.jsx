import { useNavigate } from "react-router-dom";

import logo from "../../assets/icons/logo-umpa-loompa.png";

import "./Header.scss";

function Header() {
  const navigate = useNavigate();

  return (
    <div className="header">
      <img
        className="icon"
        src={logo}
        alt="Logo"
        // width={45}
        onClick={() => navigate("/")}
      />
      <h1 className="title">Oompa Loompa's Crew</h1>
    </div>
  );
}

export default Header;
