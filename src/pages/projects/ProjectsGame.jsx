import Game from "../../components/game/Game";
import "../../components/game/game.css";
import ProjectPage from "../../components/projects/ProjectPage.jsx";

const ProjectsGame = () => {
    return (
        <ProjectPage
            title="Umbrella Game"
            description="A tiny drag-and-drop game."
        >
            <Game />
        </ProjectPage>
    );
};

export default ProjectsGame;