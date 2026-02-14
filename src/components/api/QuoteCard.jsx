import {useFetchJson} from "../../hooks/useFetchJson.js";
import StatusBlock from "./StatusBlock.jsx";
import ApiCardHeader from "./ApiCardHeader.jsx";


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
                      <p className="apiQuote">“{data.quote}”</p>
                      <p className="muted apiQuoteAuthor">— {data.author}</p>
                  </>
              )}
          </div>

          <div className="apiCardActions">
              <button
                  type="button"
                  className="nav-link"
                  onClick={refetch}
                  disabled={status === "loading"}
              >
                  New Quote
              </button>
          </div>
      </article>
    );
};

export default QuoteCard;