import {useFetchJson} from "../../hooks/useFetchJson.js";
import StatusBlock from "./StatusBlock.jsx";
import ApiCardHeader from "./ApiCardHeader.jsx";
import Cooldown from "./Cooldown.jsx";
import { useMemo } from "react";
import TriviaChoices from "./TriviaChoices.jsx";
import ApiCardActions from "./ApiCardActions.jsx";
import ApiActionButton from "./ApiActionButton.jsx";


const TRIVIA_URL = "https://opentdb.com/api.php?amount=1&type=multiple";
const TRIVIA_SOURCE = "Open Trivia DB";
const TRIVIA_MAP = {
    category: "category",
    difficulty: "difficulty",
    question: "question",
    answer: "correct_answer",
    incorrect: "incorrect_answers",
};

const COOLDOWN = 3000;  // ms
const ERROR_429_BACKOFF = 15000; // ms

const decodeHtml = (s = "") => {
    const el = document.createElement("textarea");
    el.innerHTML = s;
    return el.value;
};

const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

const TriviaCard = () => {
    const { status, data, error , refetch} = useFetchJson(TRIVIA_URL, {
        transform: (q) => {
            const item = q?.results?.[0] ?? {};

            const category = decodeHtml(item?.[TRIVIA_MAP.category] ?? "");
            const difficulty = decodeHtml(item?.[TRIVIA_MAP.difficulty] ?? "");
            const question = decodeHtml(item?.[TRIVIA_MAP.question] ?? "");
            const answer = decodeHtml(item?.[TRIVIA_MAP.answer] ?? "");
            const incorrectRaw = item?.[TRIVIA_MAP.incorrect] ?? [];
            const incorrect = Array.isArray(incorrectRaw) ? incorrectRaw.map(decodeHtml) : [];

            const choiceObjects = [
                ...incorrect.map((t) => ({ id: `i:${t}`, text: t, isCorrect: false})),
                ...(answer ? [{ id: `a:${answer}`, text: answer, isCorrect: true }] : []),
            ];

            return {
                category,
                difficulty,
                question,
                answer,
                choices: choiceObjects,
                // choices: [...incorrect, answer].filter(Boolean),
            };
        },
    });

    const hasQuestion = !!data?.question;
    const is429 = String(error).includes('HTTP 429');
    const displayError = hasQuestion && is429 ? "" : error;

    const shuffledChoices = useMemo(() => {
        const list = data?.choices ?? [];
        if (!list.length) return [];
        return shuffle(list);
    }, [data?.question, data?.choices]);

    return (
        <article className="card apiCard">
            <ApiCardHeader title="Trivia" source={TRIVIA_SOURCE} />

            <div className="apiCardBody">
                <StatusBlock status={status} error={displayError} loadingText="Fetching trivia..." />

                {is429 && hasQuestion && (
                    <p className="muted" style={{ marginBottom: 8 }}>
                        Rate limited by: {TRIVIA_SOURCE} — keeping the current question. Try again in a bit.
                    </p>
                )}

                {data?.question && (
                    <>
                        {(data.category || data.difficulty) && (
                            <p className="muted">
                                {data.category && <span>{data.category}</span>}
                                {data.category && data.difficulty && <span> • </span>}
                                {data.difficulty && <span>{data.difficulty}</span>}
                            </p>
                        )}

                        <p className="quoteText">{data.question}</p>

                        <TriviaChoices
                            key={data?.question || "no-question"}
                            choices={shuffledChoices}
                        />
                    </>
                )}
            </div>

            <ApiCardActions>
                <Cooldown
                    ms={COOLDOWN}
                    label="New Question"
                    error={error}
                    backoffOn="HTTP 429"
                    backoffMs={ERROR_429_BACKOFF}
                >
                    <ApiActionButton onClick={refetch} disabled={status === "loading"}>
                        New Question
                    </ApiActionButton>
                </Cooldown>
            </ApiCardActions>
        </article>
    );
};

export default TriviaCard;