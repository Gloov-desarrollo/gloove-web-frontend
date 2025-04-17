import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import LogoImage from '../assets/images/GLOOVE_marca_tagline_blanco.png'

const Header = ({ head, description }) => {
  const handleBookNowClick = () => {
    // navigate("/booking");
    window.location.href = "https://gloove-test.vercel.app/login";
  };
  const handleLogoClick = () => {
    window.location.href = "/";
  };
  return (
    <>
      <header
        id="masthead"
        className="site-header header-primary"
        style={{ backgroundColor: "#156B7A" }}
      >
        <div className="top-header"></div>
        <div className="bottom-header"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="de-flex sm-pt10">
                <div className="de-flex-col">
                  <div className="de-flex-col">
                    <div id="logo" style={{ cursor: "pointer" }}>
                      <img
                        className="logo-1"
                        src={LogoImage}
                        alt=""
                        onClick={handleLogoClick}
                        style={{ width: "150px", height: "60px" }}
                      />
                      <img
                        className="logo-2"
                        src={LogoImage}
                        alt=""
                        onClick={handleLogoClick}
                        style={{ width: "150px", height: "60px" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="de-flex-col header-col-mid" style={{flex: '1'}}>
                  <ul id="mainmenu" style={{ height: "auto" }}>
                    <li>
                      <Link to="/" style={{ color: "white", fontSize: "18px" }}> Inicio </Link>
                    </li>
                    <li>
                    <Link to="/booking" style={{ color: "white", fontSize: "20px" }}> Reservas </Link>
                    </li>
                    <li>
                    <Link to="/tour" style={{ color: "white", fontSize: "20px" }}> Experiencias </Link>
                    </li>
                    <li>
                      <a href="https://gloove.me/sobre-nosotros/" target="_blank" style={{ color: "white", fontSize: "20px" }}> Sobre nosotros</a>
                    </li>
                    <li>
                    <a href="https://gloove.me/blog/" style={{ color: "white", fontSize: "20px" }} target="_blank"> Blog</a>
                    </li>
                    <li>
                    <a href="https://gloove.me/contacto/" target="_blank" style={{ color: "white", fontSize: '20px' }} > Contacto </a>
                    </li>
                  </ul>
                </div>
                <div className="de-flex-col">
                  <div className="menu_side_area">
                    <button
                      className="btn-main"
                      onClick={handleBookNowClick}
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        style={{
                          width: "20px",
                          height: "20px",
                          marginTop: "4px",
                        }}
                      />
                      Mi cuenta
                    </button>
                    <span id="menu-btn" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
