const ProjectsPortfolio = () => {
    return (
        <section className="card">
            <h2>This Portfolio Site</h2>

            <p className="muted">
                A small React site that stays intentionally simple: clean navigation,
                clear content hierarchy, and room to grow without accumulating mess.
            </p>

            <h3 className="mt-0">Why it exists</h3>
            <ul>
                <li>Give employers a quick way to scan what I can do.</li>
                <li>Show structure and finish quality, not “demo sprawl.”</li>
                <li>Serve as a stable shell for future demos when they’re ready.</li>
            </ul>

            <h3 className="mt-0">What it demonstrates</h3>
            <ul>
                <li>React Router with nested routes and a consistent layout.</li>
                <li>Reusable components (top nav, sub-nav) that scale to new sections.</li>
                <li>Simple CSS design system: panels/cards, spacing helpers, readable type.</li>
                <li>Maintainability: data separated from UI where it makes sense.</li>
            </ul>

            <h3 className="mt-0">Implementation notes</h3>
            <ul>
                <li>Minimal dependencies — no UI framework required to keep it readable.</li>
                <li>Pages are designed to stand alone and stay accurate over time.</li>
                <li>Navigation avoids redundant “marketing” content and focuses on utility.</li>
            </ul>

            <h3 className="mt-0">Tech</h3>
            <ul>
                <li>React</li>
                <li>React Router</li>
                <li>Plain CSS</li>
            </ul>

        </section>
    )
};

export default ProjectsPortfolio;
