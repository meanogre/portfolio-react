import {useMemo, useState} from "react";
import { useFetchJson } from "../../hooks/useFetchJson.js";
import ApiCardHeader from "./ApiCardHeader.jsx";
import WeatherLocationControl from "./WeatherLocationControl.jsx";
import StatusBlock from "./StatusBlock.jsx";
import { weatherCodeText } from "../../data/weatherCodeData.js";
import ApiCardActions from "./ApiCardActions.jsx";
import ApiActionButton from "./ApiActionButton.jsx";

const FORECAST_BASE_URL = "https://api.open-meteo.com/v1/forecast";
const FORECAST_SOURCE = "Open-Meteo";
const FORECAST_DEFAULTS = {
    current_weather: "true",
    timezone: "auto",
    temperature_unit: "fahrenheit",
    windspeed_unit: "mph",
};
const FORECAST_MAP = {
    current: "current_weather",
    temp: "temperature",
    wind: "windspeed",
    windDir: "winddirection",
    code: "weathercode",
    isDay: "is_day",
    time: "time",
};

const NOAA_BASE_URL = "https://forecast.weather.gov/MapClick.php";

const formatLocationLine = (loc) => {
    if (!loc) return "";
    return `${loc.name}${loc.admin1 ? `, ${loc.admin1}` : ""}${loc.country ? `, ${loc.country}` : ""}`;
};

const formatCoordsLine = (loc) => {
    if (!loc) return "";
    return `${Number(loc.latitude).toFixed(4)}, ${Number(loc.longitude).toFixed(4)}`;
};

const formatLocalTime12h = (timeStr, tz, utcOffsetSeconds, tzAbbr) => {
    if (!timeStr) return "";

    const m = String(timeStr).match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
    if (!m) return `${timeStr}${tzAbbr ? ` ${tzAbbr}` : ""}`;

    const [y, mo, d, h, mi] = m.slice(1).map(Number);
    if (![y, mo, d, h, mi].every(Number.isFinite)) {
        return `${timeStr}${tzAbbr ? ` ${tzAbbr}` : ""}`;
    }

    const offsetMs = Number(utcOffsetSeconds || 0) * 1000;
    const utcMs = Date.UTC(y, mo - 1, d, h, mi) - offsetMs;
    const dt = new Date(utcMs);

    try {
        const timePart = new Intl.DateTimeFormat("en-US", {
            timeZone: tz || "UTC",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        }).format(dt);

        return `${timePart}${tzAbbr ? ` ${tzAbbr}` : ""}`;
    } catch {
        return `${timeStr}${tzAbbr ? ` ${tzAbbr}` : ""}`;
    }
};

const windDirText = (deg) => {
    const d = Number(deg);
    if (!Number.isFinite(d)) return "";

    const n = ((d % 360) + 360) % 360;

    const dirs = [
        "N", "NNE", "NE", "ENE",
        "E", "ESE", "SE", "SSE",
        "S", "SSW", "SW", "WSW",
        "W", "WNW", "NW", "NNW",
    ];

    const idx = Math.floor((n + 11.25) / 22.5) % 16;
    return dirs[idx];
};

const WeatherCard = () => {
    const [location, setLocation] = useState(null);

    const forecastUrl = useMemo(() => {
        if (!Number.isFinite(location?.latitude) || !Number.isFinite(location?.longitude)) return null;

        const params = new URLSearchParams({
            latitude: String(location.latitude),
            longitude: String(location.longitude),
            ...FORECAST_DEFAULTS,
        });

        return `${FORECAST_BASE_URL}?${params.toString()}`;
    }, [location]);

    const noaaUrl = useMemo(() => {
        if (!Number.isFinite(location?.latitude) || !Number.isFinite(location?.longitude)) return null;

        const params = new URLSearchParams({
            lat: String(location.latitude),
            lon: String(location.longitude),
        });

        return `${NOAA_BASE_URL}?${params.toString()}`;
    }, [location]);

    const { status, data, error, refetch } = useFetchJson(forecastUrl, {
        enabled: !!forecastUrl,
        transform: (raw) => {
            const current = raw?.[FORECAST_MAP.current];
            if (!current) return null;

            const tz = raw?.timezone;
            const tzAbbr = raw?.timezone_abbreviation;
            const utcOffsetSeconds = raw?.utc_offset_seconds;

            return {
                temp: current?.[FORECAST_MAP.temp],
                wind: current?.[FORECAST_MAP.wind],
                windDir: current?.[FORECAST_MAP.windDir],
                windDirText: windDirText(current?.[FORECAST_MAP.windDir]),
                code: current?.[FORECAST_MAP.code],
                description: weatherCodeText(current?.[FORECAST_MAP.code]),
                isDay: current?.[FORECAST_MAP.isDay],
                time: current?.[FORECAST_MAP.time],
                localTime: formatLocalTime12h(current?.[FORECAST_MAP.time], tz, utcOffsetSeconds, tzAbbr),
                locationLine: formatLocationLine(location),
                coordsLine: formatCoordsLine(location),
            };
        },
    });

    return (
        <article className="card apiCard">
            <ApiCardHeader title="Current Weather" source={FORECAST_SOURCE} />

            <div className="apiCardBody">
                <WeatherLocationControl onSelect={setLocation} />

                {!forecastUrl ? (
                    <p className="muted mt-10" >
                        Enter a location and click Find.
                    </p>
                ) : (
                    <>
                        <StatusBlock status={status} error={error} loadingText="Fetching weather..." />

                        {status === "success" && data && (
                            <>
                                <div className="weatherResolved muted">
                                    <div>{data.locationLine}</div>
                                    <div>{data.coordsLine}</div>
                                </div>

                                <div className="weatherDetails mt-10">
                                    <p><strong>Local time:</strong> {data.localTime}</p>
                                    <p><strong>Temperature:</strong> {data.temp} °F</p>
                                    <p><strong>Wind:</strong> {data.wind} mph</p>
                                    <p><strong>Direction:</strong> {data.windDirText} <span className="muted">({data.windDir}°)</span></p>
                                    <p><strong>Conditions:</strong> {data.description} <span className="muted">(code {data.code})</span></p>
                                    <p><strong>Daytime:</strong> {data.isDay ? "Yes" : "No"}</p>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>

            <ApiCardActions>
                <ApiActionButton
                    onClick={refetch}
                    disabled={!forecastUrl || status === "loading"}
                    title={!forecastUrl ? "Pick a location first" : "Refresh weather"}
                >
                    Refresh Weather
                </ApiActionButton>

                {noaaUrl ? (
                    <a
                        className="nav-link"
                        href={noaaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open NOAA forecast for this location"
                        style={{ marginLeft: 12 }}
                    >
                        View full forecast (NOAA)
                    </a>
                ) : null}
            </ApiCardActions>
        </article>
    );
};

export default WeatherCard;