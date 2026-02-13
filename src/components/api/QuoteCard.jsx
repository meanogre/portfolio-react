import {useFetchJson} from "../../hooks/useFetchJson.js";
import StatusBlock from "./StatusBlock.jsx";

const QUOTE_URL = "https://dummyjson.com/quotes/random";
const QUOTE_SOURCE = "DummyJSON";
/*
Expected response (subset):
{
  quote: string,
  author: string
}
*/

const QuoteCard = () => {
    const { status, data, error , refetch} = useFetchJson(QUOTE_URL, {
        transform: (q) => ({
            quote: q?.quote ?? "",
            author: q?.author ?? "Unknown",
        }),
    });

    return (
      <article className="card apiCard">
          <header className="apiCardHeader">
              <h3 className="apiCardTitle">Random Quote</h3>
              <span className="muted apiCardMeta">{QUOTE_SOURCE}</span>
          </header>

          <div className="apiCardBody">
              <StatusBlock status={status} error={error} loadingText="Fetching a quote..." />

              {status === "success" && data?.quote && (
                  <>
                      <p className="apiQuote">“{data.quote}”</p>
                      <p className="muted apiQuoteAuthor">— {data.author}</p>

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
                  </>
              )}
          </div>
      </article>
    );
};

export default QuoteCard;