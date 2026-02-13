import SubNav from "../../components/SubNav.jsx";
import {Outlet} from "react-router-dom";

const Projects = () => {
    return (
        <>
            <h1>Projects</h1>

            <SubNav
                links={[
                    { to: "/projects", label: "Overview", end: true },
                    { to: "/projects/portfolio", label: "Portfolio" },
                    { to: "/projects/api", label: "API" },
                ]}
            />

            <Outlet />
        </>
    )
};

export default Projects;