import {apiCards} from "../../data/apiCards.js";

const ProjectsApi = () => {
    return (
        <section>
            <h1>API Dashboard</h1>
            <p className="muted">
                A single-page dashboard powered by public APIs. Cards are registered in one list so we can
                add, remove, or reorder widgets without touching the layout.
            </p>

            <div className="stack">
                {apiCards.map((card) => {
                    const Card = card.Component;
                    return <Card key={card.id}/>
                })}
            </div>
        </section>
    );
};

export default ProjectsApi;