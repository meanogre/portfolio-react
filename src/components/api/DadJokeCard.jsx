import {useFetchJson} from "../../hooks/useFetchJson.js";
import StatusBlock from "./StatusBlock.jsx";
import ApiCardHeader from "./ApiCardHeader.jsx";
import ApiActionButton from "./ApiActionButton.jsx";
import ApiCardActions from "./ApiCardActions.jsx";


const JOKE_URL = "https://icanhazdadjoke.com/";
const JOKE_SOURCE = "icanhazdadjoke";
const JOKE_MAP = {
    joke: "joke",
};

const DadJokeCard = () => {
    const { status, data, error , refetch} = useFetchJson(JOKE_URL, {
        headers: { Accept: "application/json" },
        transform: (q) => ({
            joke: q?.[JOKE_MAP.joke] ?? "",
        }),
    });

    return (
        <article className="card apiCard">
            <ApiCardHeader title="Dad Joke" source={JOKE_SOURCE} />

            <div className="apiCardBody">
                <StatusBlock status={status} error={error} loadingText="Fetching a dad joke..." />

                {status === "success" && data?.joke && (
                    <>
                        <p className="quoteText">“{data.joke}”</p>
                    </>
                )}
            </div>

            <ApiCardActions>
                <ApiActionButton onClick={refetch} disabled={status === "loading"}>
                    New Joke
                </ApiActionButton>
            </ApiCardActions>
        </article>
    );
};

export default DadJokeCard;