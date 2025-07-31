import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import LogoImage from '../assets/images/GLOOVE_marca_tagline_blanco.png';
import { useCart } from '../context/CartContext';
import './../assets/css/booking/Header.css';

const Header = () => {
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const handleBookNowClick = () => {
    window.location.href = "https://gloove-test.vercel.app/login";
  };
  
  const handleLogoClick = () => {
    navigate("/");
  };

  const handleCartClick = () => {
    navigate("/cart");
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
                    <li><Link to="/" style={{ color: "white", fontSize: "20px" }}> Inicio </Link></li>
                    <li><Link to="/booking" style={{ color: "white", fontSize: "20px" }}> Reservas </Link></li>
                    <li><Link to="/tour" style={{ color: "white", fontSize: "20px" }}> Experiencias </Link></li>
                    <li><Link to="/investment" style={{ color: "white", fontSize: "20px" }}> Inversión </Link></li> {/* Renombrado */}
                    <li><Link to="/about" style={{ color: "white", fontSize: "20px" }}> Sobre nosotros</Link></li>
                    <li><a href="https://gloove.me/blog/" style={{ color: "white", fontSize: "20px" }} target="_blank" rel="noopener noreferrer"> Blog</a></li>
                    <li><Link to="/contact" style={{ color: "white", fontSize: '20px' }} > Contacto </Link></li>
                  </ul>
                </div>
                <div className="de-flex-col">
                  <div className="menu_side_area" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    
                    <button
                      className="btn-main cart-button"
                      onClick={handleCartClick}
                      style={{ padding: '8px 12px', position: 'relative' }}
                    >
                      <FontAwesomeIcon
                        icon={faShoppingCart}
                        style={{
                          width: "20px",
                          height: "20px",
                        }}
                      />
                      {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </button>

                    <button
                      className="btn-main"
                      onClick={handleBookNowClick}
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        style={{
                          width: "20px",
                          height: "20px",
                          marginRight: '8px'
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
