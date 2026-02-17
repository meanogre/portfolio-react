import { useMemo, useState } from "react";
import { useFetchJson } from "../../hooks/useFetchJson.js";
import ApiCardHeader from "./ApiCardHeader.jsx";
import StatusBlock from "./StatusBlock.jsx";
import ApiCardActions from "./ApiCardActions.jsx";
import ApiActionButton from "./ApiActionButton.jsx";

const PIC_WIDTH = 900;
const PIC_HEIGHT = 600;

const PIC_BASE_URL = "https://picsum.photos";
const PIC_SOURCE = "Picsum Photos";
const PIC_MAP = {
    id: "id",
    author: "author",
    url: "url",
    downloadUrl: "download_url",
};

// Driver request (JSON) so useFetchJson can manage status/error/refetch consistently
const DRIVER_URL = "https://picsum.photos/v2/list";
const DRIVER_DEFAULTS = {
    limit: "1",
};
const DRIVER_PAGE_COUNT = 50;

const PictureCard = () => {
    const [seed, setSeed] = useState(() => Date.now());

    const driverUrl = useMemo(() => {
        const page = String((seed % DRIVER_PAGE_COUNT) + 1);
        const params = new URLSearchParams({
            ...DRIVER_DEFAULTS,
            page,
            cb: String(seed),
        });

        return `${DRIVER_URL}?${params.toString()}`;
    }, [seed]);

    const { status, data, error, refetch } = useFetchJson(driverUrl, {
        enabled: !!driverUrl,
        transform: (raw) => {
            const first = Array.isArray(raw) ? raw[0] : null;

            const id = first?.[PIC_MAP.id];
            const stableImgUrl = id
                ? `${PIC_BASE_URL}/id/${id}/${PIC_WIDTH}/${PIC_HEIGHT}`
                : "";

            return {
                // imgUrl: `${PIC_BASE_URL}?${imgParams.toString()}`,
                imgUrl: stableImgUrl,
                width: PIC_WIDTH,
                height: PIC_HEIGHT,

                // Optional
                author: first?.[PIC_MAP.author] ?? "",
                pageUrl: first?.[PIC_MAP.url] ?? "",
                downloadUrl: first?.[PIC_MAP.downloadUrl] ?? "",
            };
        },
    });

    const handleNewPhoto = () => {
        setSeed(Date.now());
        refetch?.();
    };

    return (
        <article className="card apiCard">
            <ApiCardHeader title="Picture of the Day" source={PIC_SOURCE} />

            <div className="apiCardBody">
                <StatusBlock status={status} error={error} loadingText="Fetching a photo..." />

                {status === "success" && data?.imgUrl && (
                    <>
                        <a
                            href={data.imgUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="podImageLink"
                            title="Open image in a new tab"
                        >
                            <img
                                className="podImage"
                                src={data.imgUrl}
                                alt="Random photo"
                                loading="lazy"
                                width={data.width}
                                height={data.height}
                            />
                        </a>

                        {(data.author || data.pageUrl) && (
                            <p className="muted mt-10">
                                {data.author ? (
                                    <>
                                        Photo by <strong>{data.author}</strong>
                                    </>
                                ) : null}
                                {data.author && data.pageUrl ? " · " : null}
                                {data.pageUrl ? (
                                    <a href={data.pageUrl} target="_blank" rel="noopener noreferrer">
                                        View on Picsum
                                    </a>
                                ) : null}
                            </p>
                        )}
                    </>
                )}
            </div>

            <ApiCardActions>
                <ApiActionButton onClick={handleNewPhoto} disabled={status === "loading"}>
                    New Photo
                </ApiActionButton>
            </ApiCardActions>
        </article>
    );
};

export default PictureCard;
