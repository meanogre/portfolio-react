import {Outlet} from "react-router-dom";
import Nav from "./Nav.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";

const Layout = () => {
    return (
        <div className={'shell'}>
            <Nav />

            <main className={'content'}>
                <Breadcrumbs />
                <Outlet />
            </main>

            <footer className={'footer'}>
                <div className="footer-inner">
                    <div>© {new Date().getFullYear()} Wayne Lassen</div>
                    <div>
                        <a
                            href="https://github.com/meanogre/portfolio-react"
                            target="_blank"
                            rel="noreferrer"
                            className="footer-link"
                            title="Source for this site"
                        >
                            Site code
                        </a>
                    </div>
                </div>
            </footer>        </div>
    );
};

export default Layout;
