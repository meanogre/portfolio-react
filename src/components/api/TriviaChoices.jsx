import {useState} from 'react';

const TriviaChoices = ({choices = []}) => {
    const [picked, setPicked] = useState({});

    const onPick = (c) => {
        if (!c?.id) return;
        if (picked[c.id]) return;

        setPicked((prev) => ({
            ...prev,
            [c.id]: c.isCorrect ? "correct" : "wrong",
        }));
    };

    const choiceClass = (c) => {
        const state = picked[c.id];
        if (state === "correct") return "triviaChoice triviaChoice--correct";
        if (state === "wrong") return "triviaChoice triviaChoice--wrong";
        return "triviaChoice";
    };

    return (
        <div className="triviaChoices" role="group" aria-label="Answer choices">
            {choices.map((c) => (
                <button
                    key={c.id}
                    type="button"
                    className={choiceClass(c)}
                    onClick={() => onPick(c)}
                    disabled={!!picked[c.id]}
                >
                    {c.text}
                </button>
            ))}
        </div>
    );
};

export default TriviaChoices;