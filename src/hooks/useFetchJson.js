/**
 * useFetchJson(url, options)
 * - consistent loading/error handling
 * - aborts in-flight requests on unmount or URL change
 * - optional transform() lets each card shape its data cleanly
 */
import {useEffect, useRef, useState} from "react";

const fetchJson = async (url, {headers, signal }) => {
    const res = await fetch(url, {headers, signal});
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    return res.json();
};

export const useFetchJson = (url, options = {}) => {
    const {
        headers = {},
        enabled = true,
        transform = (x) => x,
        deps = [],
    } = options;

    const abortRef = useRef(null);

    const [status, setStatus] = useState(enabled ? "loading" : "idle");
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [nonce, setNonce] = useState(0);

    useEffect(() => {
        if (!enabled) {
            setStatus("idle");
            return;
        }
        if (!url) {
            setStatus("error");
            setError("Missing URL");
            return;
        }

        // Abort any prior request
        abortRef.current?.abort();
        const ac = new AbortController();
        abortRef.current = ac;

        let alive = true;

        (async () => {
            setStatus("loading");
            setError("");

            try {
                const json = await fetchJson(url, {headers, signal: ac.signal});
                const shaped = transform(json);

                if (!alive) return;
                setData(shaped);
                setStatus("success");
            } catch (e) {
                if (e?.name === "AbortError") return;
                if (!alive) return;
                setStatus("error");
                setError(e?.message || "Request failed");
            }
        })();

        return () => {
            alive = false;
            ac.abort();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, enabled, nonce, ...deps]);

    return {
        status,
        data,
        error,
        refetch: () => setNonce((n) => n + 1),
    };
};