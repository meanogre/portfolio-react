import {createBrowserRouter} from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Home from "../pages/Home.jsx";
import NotFound from "../pages/NotFound.jsx";

import About from "../pages/about/About.jsx";
import AboutOverview from "../pages/about/AboutOverview.jsx";
import AboutCareer from "../pages/about/AboutCareer.jsx";
import AboutPhilosophy from "../pages/about/AboutPhilosophy.jsx";
import AboutLeadership from "../pages/about/AboutLeadership.jsx";
import AboutCredentials from "../pages/about/AboutCredentials.jsx";
import AboutHistory from "../pages/about/AboutHistory.jsx";
import AboutSkills from "../pages/about/AboutSkills.jsx";
import Projects from "../pages/projects/Projects.jsx";
import ProjectsPortfolio from "../pages/projects/ProjectsPortfolio.jsx";
import ProjectsOverview from "../pages/projects/ProjectsOverview.jsx";
import Axioms from "../pages/Axioms.jsx";
import ProjectsApi from "../pages/projects/ProjectsApi.jsx";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFound />,
        handle: { crumb: () => "Home"},
        children: [
            { index: true, element: <Home />},
            {
                path: "about",
                element: <About />,
                handle: { crumb: () => "About" },
                children: [
                    { index: true, element: <AboutOverview />, handle: {crumb: () => "Overview" } },
                    { path: "career", element: <AboutCareer />, handle: {crumb: () => "Career" } },
                    { path: "history", element: <AboutHistory />, handle: {crumb: () => "WorkHistory" } },
                    { path: "philosophy", element: <AboutPhilosophy />, handle: {crumb: () => "Philosophy" } },
                    { path: "leadership", element: <AboutLeadership />, handle: {crumb: () => "Leadership" } },
                    { path: "credentials", element: <AboutCredentials />, handle: {crumb: () => "Credentials" } },
                    { path: "skills", element: <AboutSkills />, handle: {crumb: () => "Skills" } },
                ]
            },
            {
                path: "projects",
                element: <Projects />,
                handle: { crumb: () => "Projects" },
                children: [
                    { index: true, element: <ProjectsOverview />, handle: {crumb: () => "Overview" } },
                    { path: "portfolio", element: <ProjectsPortfolio />, handle: {crumb: () => "Portfolio" } },
                    { path: "api", element: <ProjectsApi />, handle: {crumb: () => "API" } },
            //         { path: "recipes", element: <Recipes />, handle: {crumb: () => "Recipes" } },
            //         { path: "click-game", element: <ClickGame />, handle: {crumb: () => "Click Game" } },
                ],
            },
            {
                path: "axioms",
                element: <Axioms />,
                handle: { crumb: () => "Axioms" },
            },
        ],
    },
]);