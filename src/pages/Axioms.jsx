import { AXIOMS} from "../data/axiomsData.js";

const Axioms = () => {
    return (
        <>
            <h1>Axioms</h1>

            <section className="card">
                <p>
                    These statements are drawn from experience — years of writing code,
                    maintaining systems, supporting what was shipped, and watching small
                    decisions grow into large consequences.
                </p>

                <p className="muted mb-0">
                    I don’t pretend these ideas exist only here. Many engineers reach
                    similar conclusions over time. What I’ve done is distill mine into
                    short, memorable forms that reflect how I actually think when I build.
                </p>
            </section>

            <section className="stack">
                {AXIOMS.map((a) => (
                   <section key={a.title} className="card">
                       <h3 className="mt-0">{a.title}</h3>
                       <p className="mb-0">{a.tagline}</p>
                   </section>
                ))}
            </section>
        </>
    );
};

export default Axioms;