import React, {useState}  from "react";
import {Link} from "@reach/router";

const Header = () => {

    const [sMenu, setMenu] = useState(window.location.pathname);

    const selectOption = (url) => {
        setMenu(url);
        document.body.style.overflow = ""; /* Fix when the option is selected */
    };

    return (
        <header>
            <nav className="navbar navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <span className="navbar-brand">React APP for Wordpress</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                        <div className="offcanvas-header">
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <Link to="/" className={(sMenu == "/") || /^\/movie/.test(sMenu) || /^\/\d+/.test(sMenu) ? "nav-link active" : "nav-link"} onClick={() => selectOption("/")}>Movies</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/posts/" className={/^\/post/.test(sMenu) ? "nav-link active" : "nav-link"} onClick={() => selectOption("/posts/")}>Posts</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/pages/" className={/^\/page/.test(sMenu) ? "nav-link active" : "nav-link"} onClick={() => selectOption("/pages/")}>Pages</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
};

export default Header;