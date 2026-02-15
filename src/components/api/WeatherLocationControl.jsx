import { useMemo, useState } from "react";
import { useFetchJson } from "../../hooks/useFetchJson.js";
import StatusBlock from "./StatusBlock.jsx";

const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const GEO_SOURCE = "Open-Meteo";
const GEO_MAX_LOCATIONS = 10;
const GEO_MAP = {
    results: "results",
    name: "name",
    admin1: "admin1",
    country: "country",
    latitude: "latitude",
    longitude: "longitude",
};

// flat safe getter (Open-Meteo is flat)
const pick = (obj, key, fallback = "") => (obj?.[key] ?? fallback);

const parseCoordLocation = (s) => {
    const t = String(s ?? "").trim();

    const m = t.match(/^\s*(-?\d{1,2}(?:\.\d+)?)\s*(?:,|\s)\s*(-?\d{1,3}(?:\.\d+)?)\s*$/);
    if (!m) return null;

    const [latitude, longitude] = m.slice(1).map(Number);

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
    if (latitude < -90 || latitude > 90) return null;
    if (longitude < -180 || longitude > 180) return null;

    return {
        id: `${latitude},${longitude}`,
        name: "Coordinates",
        admin1: "",
        country: "",
        latitude,
        longitude,
    };
};

const WeatherLocationControl = ({ onSelect }) => {
    const [query, setQuery] = useState("");
    const [geoRequest, setGeoRequest] = useState("");
    const [selectedId, setSelectedId] = useState("");

    const geoApiUrl = useMemo(() => {
       const q = geoRequest.trim();
       if (!q) return null;

       const params = new URLSearchParams({
           name: q,
           count: String(GEO_MAX_LOCATIONS),
           language: "en",
           format: "json",
       });

       return `${GEO_URL}?${params.toString()}`;
    }, [geoRequest]);

    const { status, data, error } = useFetchJson(geoApiUrl, {
        enabled: !!geoApiUrl,
        transform: (raw) => {
            const arr = Array.isArray(raw?.[GEO_MAP.results]) ? raw[GEO_MAP.results] : [];

            return arr
                .map((r) => {
                    const latitude = Number(pick(r, GEO_MAP.latitude, NaN));
                    const longitude = Number(pick(r, GEO_MAP.longitude, NaN));
                    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;

                    return {
                        id: `${latitude},${longitude}`,
                        name: pick(r, GEO_MAP.name, ""),
                        admin1: pick(r, GEO_MAP.admin1, ""),
                        country: pick(r, GEO_MAP.country, ""),
                        latitude,
                        longitude,
                    };
                })
                .filter(Boolean);
        },
        // Auto-select here (not in a component effect)
        onSuccess: (locations) => {
            if (!Array.isArray(locations)) return;

            // If exactly one match, select it automatically
            if (locations.length === 1) {
                const one = locations[0];
                if (!one?.id) return;

                setSelectedId(one.id);
                onSelect(one);
            }
        },
    });

    const onFind = () => {
        const q = query.trim();
        if (!q) return;

        setSelectedId("");
        onSelect(null);

        const coordLoc = parseCoordLocation(q);
        if (coordLoc) {
            setSelectedId(coordLoc.id);
            setGeoRequest("");
            onSelect(coordLoc);
            return;
        }

        setGeoRequest(q);
    };

    const onPick = (id) => {
        setSelectedId(id);
        const choice = (data ?? []).find((c) => c.id === id) ?? null;
        onSelect(choice);
    };

    const onClear = () => {
        setQuery("");
        setGeoRequest("");
        setSelectedId("");
        onSelect(null);
    };

    return (
        <div className="weatherControls">
            <div className="weatherControlsRow">
                <input
                    className="textInput"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") onFind();
                    }}
                    placeholder="City, State/Country, ZIP or Lat, Lon"
                />

                <button className="btn" onClick={onFind} disabled={!query.trim()}>
                    Find
                </button>

                <button className="btn btnGhost" onClick={onClear} disabled={!query && !geoRequest && !selectedId}>
                    Clear
                </button>
            </div>

            {/* Show status only after Find has been clicked */}
            {geoApiUrl ? (
                <StatusBlock
                    status={status}
                    error={error}
                    loadingText={`Finding location (${GEO_SOURCE})...`}
                />
            ) : null}

            {/* Dropdown only when multiple matches */}
            {status === "success" && Array.isArray(data) && data.length > 1 && !selectedId ? (
                <select className="selectInput" value={selectedId} onChange={(e) => onPick(e.target.value)}>
                    <option value="" disabled>
                        Select a match…
                    </option>

                    {data.map((c) => {
                        const label = `${c.name}${c.admin1 ? `, ${c.admin1}` : ""}${c.country ? `, ${c.country}` : ""}`;
                        return (
                            <option key={c.id} value={c.id}>
                                {label}
                            </option>
                        );
                    })}
                </select>
            ) : null}
        </div>
    );
};

export default WeatherLocationControl;
