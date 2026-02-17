import {useFetchJson} from "../../hooks/useFetchJson.js";
import StatusBlock from "./StatusBlock.jsx";
import ApiCardHeader from "./ApiCardHeader.jsx";
import ApiCardActions from "./ApiCardActions.jsx";
import ApiActionButton from "./ApiActionButton.jsx";


const QUOTE_URL = "https://dummyjson.com/quotes/random";
const QUOTE_SOURCE = "DummyJSON";
const QUOTE_MAP = {
    quote: "quote",
    author: "author",
};

const QuoteCard = () => {
    const { status, data, error , refetch} = useFetchJson(QUOTE_URL, {
        transform: (q) => ({
            quote: q?.[QUOTE_MAP.quote] ?? "",
            author: q?.[QUOTE_MAP.author] ?? "Unknown",
        }),
    });

    return (
      <article className="card apiCard">
          <ApiCardHeader title="Random Quote" source={QUOTE_SOURCE} />

          <div className="apiCardBody">
              <StatusBlock status={status} error={error} loadingText="Fetching a quote..." />

              {status === "success" && data?.quote && (
                  <>
                      <p className="quoteText">“{data.quote}”</p>
                      <p className="muted quoteAuthor">— {data.author}</p>
                  </>
              )}
          </div>

          <ApiCardActions>
              <ApiActionButton onClick={refetch} disabled={status === "loading"}>
                  New Quote
              </ApiActionButton>
          </ApiCardActions>
      </article>
    );
};

export default QuoteCard;