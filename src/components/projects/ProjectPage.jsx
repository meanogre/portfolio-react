const ProjectPage = ({ title, description, children, className = ""}) => {
    return (
        <section className={`card ${className}`.trim()}>
            <h2>{title}</h2>

            {description ? (
                <p className="muted">
                    {description}
                </p>
            ) : null}

            {children}
        </section>

    );
};

export default ProjectPage;