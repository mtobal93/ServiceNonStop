import { SiRedux } from "react-icons/si";
import { SiPostgresql, SiFlask } from "react-icons/si";
import "./Footer.css";

function Footer() {
    return (
        <>
            <div className="footer">
                <img className="footer-image" src="../../images/footer.png" />
                <div className="footer-heading">
                    <div className="dev-heading">
                        Technologies
                        <div className="techs">
                            <div className="backend">
                                <a
                                    href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="fa-brands fa-js fa-lg" />
                                </a>

                                <a
                                    href="https://react.dev/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="fa-brands fa-react fa-lg" />
                                </a>

                                <a
                                    href="https://redux.js.org/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <SiRedux />
                                </a>

                                <a
                                    href="https://www.w3.org/Style/CSS/Overview.en.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="fa-brands fa-css3-alt fa-lg" />
                                </a>

                                <a
                                    href="https://docs.python.org/3/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="fa-brands fa-python fa-lg" />
                                </a>

                                <a
                                    href="https://flask.palletsprojects.com/en/3.0.x/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <SiFlask />
                                </a>

                                <a
                                    className="postgres"
                                    href="https://www.postgresql.org/docs/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <SiPostgresql />
                                </a>

                                <a
                                    href="https://developer.mozilla.org/en-US/docs/Web/HTML"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="fa-brands fa-html5 fa-lg" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="dev-heading">
                        {/* Docs */}
                        <div className="docs"></div>
                    </div>
                    <div className="dev-heading">
                        Developer
                        <div className="devs">
                            <div className="aDev">
                                <div className="devLogos">
                                    <a
                                        href="https://www.linkedin.com/in/manuel-tobal-8a8127175/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="icons">
                                            <i className="fa-brands fa-linkedin fa-lg" />
                                        </span>
                                    </a>
                                    <a
                                        href="https://github.com/mtobal93"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="icons">
                                            <i className="fa-brands fa-github fa-lg" />
                                        </span>
                                    </a>
                                </div>
                                <span className="names">Manuel Tobal</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;
