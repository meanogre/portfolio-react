// Home.jsx
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <h1>A practical React portfolio</h1>

            <p className="muted">
                Systems-minded engineering, automation habits, and clean UI structure.
            </p>

            <p>
                I build reliable software systems and automation tools, and I’m using this site to showcase modern web
                development through a focused React portfolio. My approach favors correctness, maintainability, and
                designs that hold up under real-world conditions.
            </p>

            <p>This site isn’t meant to be flashy. It’s meant to be clear.</p>

            <p>
                It’s a place to show how I structure code, organize interfaces, and think through problems — using small,
                deliberate examples rather than oversized demos.
            </p>

            <section className="card">
                <h2>Start here</h2>
                <ul>
                    <li>
                        <Link to="/about"><strong>About</strong></Link> — background, work history, philosophy, and skills
                    </li>
                    <li>
                        <Link to="/projects"><strong>Projects</strong></Link> — selected work and case studies (content will grow over time)
                    </li>
                    <li>
                        <Link to="/axioms"><strong>Axioms</strong></Link> — practical programming principles drawn from real experience
                    </li>
                </ul>
            </section>

            <section className="card">
                <h2>Featured focus: this portfolio</h2>

                <p>This portfolio itself is one of the projects.</p>

                <p>It’s a deliberately structured React application that demonstrates:</p>

                <ul>
                    <li>clean component organization</li>
                    <li>multi-page routing with consistent layout</li>
                    <li>reusable navigation patterns</li>
                    <li>a consistent visual theme (typography, spacing, cards, navigation)</li>
                </ul>

                <p>The goal is not to impress with volume, but to demonstrate sound engineering habits.</p>
            </section>

            <p>
                If something here looks interesting, the About section is the best starting point.
            </p>
        </>
    );
};

export default Home;