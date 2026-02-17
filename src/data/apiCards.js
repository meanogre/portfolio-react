import QuoteCard from "../components/api/QuoteCard.jsx";
import WeatherCard from "../components/api/WeatherCard.jsx";
import DadJokeCard from "../components/api/DadJokeCard.jsx";
import TriviaCard from "../components/api/TriviaCard.jsx";
import PictureCard from "../components/api/PictureCard.jsx";

export const apiCards = [
    { id: "quote", Component: QuoteCard },
    { id: "joke", Component: DadJokeCard },
    { id: "trivia", Component: TriviaCard },
    { id: "weather", Component: WeatherCard },
    { id: "picture", Component: PictureCard },
]