import {apiCards} from "../../data/apiCards.js";
import ProjectPage from "../../components/projects/ProjectPage.jsx";

const ProjectsApi = () => {
    return (
        <ProjectPage
            title="API Dashboard"
            description={`
             A single-page dashboard powered by public APIs. Cards are registered in one list so we can
             add, remove, or reorder widgets without touching the layout.
             `.trim()}
        >
            {apiCards.map((card) => {
                const Card = card.Component;
                return <Card key={card.id} />
            })}
        </ProjectPage>
    );
};

export default ProjectsApi;