import {PROJECTS} from "../../data/projectsData.js";
import {Link} from "react-router-dom";
import ProjectPage from "../../components/projects/ProjectPage";

const ProjectsOverview = () => {
    return (
        <ProjectPage
            title="Overview"
            description={null}
            className=""
        >
            <p>
                This is a small collection of write-ups. Each one is a short "case study":
                what the thing is, why it exists, and the specific skills it exercises.
            </p>

            <p>
                I keep these focused and practical — enough detail to show how I think and
                how I build, without turning the page into a novel.
            </p>

            <div className="stack">
                {PROJECTS.map( (p) => (
                    <div key={p.slug} className="card">
                        <h3 className={"mt-0"}>
                            <Link to={`/projects/${p.slug}`}>{p.title}</Link>
                        </h3>
                        <p className="muted mb-0" >{p.blurb}</p>
                    </div>
                ))}
            </div>
        </ProjectPage>
    )
};

export default ProjectsOverview;
