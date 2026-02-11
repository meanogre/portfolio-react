import SubNav from "../../components/SubNav.jsx";
import {Outlet} from "react-router-dom";

const About = () => {
    return (
        <>
            <h1>About</h1>

            <SubNav
                links={[
                    { to: "/about", label: "Overview", end: true },
                    { to: "/about/career", label: "Career" },
                    { to: "/about/history", label: "History" },
                    { to: "/about/philosophy", label: "Philosophy" },
                    { to: "/about/leadership", label: "Leadership" },
                    { to: "/about/credentials", label: "Credentials" },
                    { to: "/about/skills", label: "Skills" },
                ]}
            />

            <Outlet />
        </>
    )
};

export default About;