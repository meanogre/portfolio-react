import ProjectPage from "../../components/projects/ProjectPage.jsx";
import Recipes from "../../components/recipes/Recipes.jsx";

const ProjectsRecipes = () => {
    return (
        <ProjectPage
            title="LOTRO Recipe Planner"
            description={`
             A planning tool for LOTRO cooking recipes. Choose a tier, select a recipe,
             enter a quantity, and build a make/gather/buy list.
             `.trim()}
            >
                <Recipes />
        </ProjectPage>
    );
};

export default ProjectsRecipes;