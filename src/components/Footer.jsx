import { Link } from "react-router-dom";
import GlooveLogoAzul from "../../src/assets/images/GLOOVE_marca_tagline_COL.png"
import FbIcon from "../../src/assets/images/happy (9).png"
import IgIcon from "../../src/assets/images/happy (8).png"
import LinkedInIcon from "../../src/assets/images/happy (6).png"

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <>
      <footer
        id="colophon"
        className="site-footer footer-primary p-0"
        style={{ backgroundColor: "white" }}
      >
        <div className="top-footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <aside
                  className="widget widget_text"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    padding: "0px",
                    height: "100%",
                  }}
                >
                  {/* <h3 className="widget-title">About Travel</h3> */}
                  <div className="">
                    <Link to="/">
                      <img
                        src={GlooveLogoAzul}
                        alt=""
                        style={{ width: "75%", height: "auto" }}
                      />
                    </Link>
                  </div>
                  <div
                    className="textwidget widget-text"
                    style={{
                      marginTop: "20px",
                      fontSize: "20px",
                      textAlign: "center",
                      padding: "0px",
                      color: "#156B7A",
                    }}
                  >
                    GESTIONAMOS TUS VIVIENDAS TURÍSTICAS CON EL MEJOR SERVICIO Y
                    TECNOLOGÍA DEL MERCADO
                  </div>
                </aside>
              </div>
              <div className="col-lg-4 col-md-6">
                <aside className="widget widget_text" style={{height: "100%"}}>
                  {/* <h3 className="widget-title">CONTACT INFORMATION</h3> */}
                  <div className="textwidget widget-text" style={{height: "100%"}}>
                    {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. */}
                    <ul style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around", height: "100%"}}>
                      <li
                        style={{
                          textAlign: "center",
                          fontSize: "16px",
                          lineHeight: "30px",
                        }}
                      >
                        <Link to="/" style={{ color: "#156B7A" }}>
                        Inicio
                        </Link>
                      </li>
                      <li
                        style={{
                          textAlign: "center",
                          fontSize: "16px",
                          lineHeight: "30px",
                        }}
                      >
                        <Link to="/booking" style={{ color: "#156B7A" }}>
                        Reservas
                        </Link>
                      </li>
                      <li
                        style={{
                          textAlign: "center",
                          fontSize: "16px",
                          lineHeight: "30px",
                        }}
                      >
                        <Link to="/tour" style={{ color: "#156B7A" }}>
                        Experiencias
                        </Link>
                      </li>
                      <li
                        style={{
                          textAlign: "center",
                          fontSize: "16px",
                          lineHeight: "30px",
                        }}
                      >
                        <a href="https://gloove.me/sobre-nosotros/" target="_blank" style={{ color: "#156B7A" }}> Sobre nosotros</a>

                      </li>
                      <li
                        style={{
                          textAlign: "center",
                          fontSize: "16px",
                          lineHeight: "30px",
                        }}
                      >
                        <a href="https://gloove.me/blog/" style={{ color: "#156B7A"}} target="_blank"> Blog</a>

                      </li>
                      <li
                        style={{
                          textAlign: "center",
                          fontSize: "16px",
                          lineHeight: "30px",
                        }}
                      >
                        <a href="https://gloove.me/contacto/" target="_blank" style={{ color: "#156B7A" }} > Contacto </a>
                      </li>
                      {/* <li
                        style={{
                          textAlign: "center",
                          fontSize: "16px",
                          lineHeight: "30px",
                        }}
                      >
                        <a href="#" style={{ color: "#156B7A" }}>
                          CONTACTANOS
                        </a>
                      </li> */}
                    </ul>
                  </div>
                </aside>
              </div>
              <div className="col-lg-4 col-md-6">
                <aside className="widget widget_recent_post" style={{display: "flex", flexDirection:"column", justifyContent: "space-between"}}>
                  <h3
                    className=""
                    style={{ textAlign: "center", color: "#156B7A", marginBottom: "0px" }}
                  >
                    SIGUENOS EN:
                  </h3>
                  <ul style={{height: "80%", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                    <li
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        border: "0px",
                        padding: "0px",
                      }}
                    >
                      <a href="https://www.facebook.com/profile.php?id=100090425376184" target="_blank">
                          <img
                            src={FbIcon}
                            alt=""
                            style={{
                              width: "50px",
                              height: "50px",
                              backgroundColor: "#156B7A",
                            }}
                          />
                        </a>
                    </li>
                    <li
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        border: "0px",
                        padding: "0px",
                      }}
                    >
                      <a href="https://www.linkedin.com/company/gloove-gestor-turistico/?viewAsMember=true" target="_blank">
                        <img
                          src={LinkedInIcon}
                          alt=""
                          style={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: "#156B7A",
                          }}
                        />
                      </a>
                    </li>
                    <li
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        border: "0px",
                        padding: "0px",
                      }}
                    >
                      <a href="https://www.instagram.com/gloove_me/" target="_blank">
                        <img
                          src={IgIcon}
                          alt=""
                          style={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: "#156B7A",
                          }}
                        />
                      </a>
                    </li>
                  </ul>
                </aside>
              </div>
            </div>
          </div>
        </div>
        <div className="buttom-footer">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-5">
                <div className="footer-menu">
                  <ul>
                    <li>
                      <a href="https://gloove.me/politica-de-privacidad/" target="_blank">Política de Privacidad</a>
                    </li>
                    <li>
                      <a href="#">Términos y condiciones</a>
                    </li>
                    <li>
                      <a href="#">FAQ</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-2 text-center">
                <div className="footer-logo">
                  <a href="#" style={{display: 'flex', justifyContent: 'center'}}>
                    <img
                      src="./images/GLOOVE_marca_tagline_blanco.png"
                      alt=""
                      style={{width: "75%"}}
                    />
                  </a>
                </div>
              </div>
              <div className="col-md-5">
                <div className="copy-right text-right">
                  Copyright © 2024 Gloove. Todos los derechos reservados
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
