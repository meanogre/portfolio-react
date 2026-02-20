import { useLayoutEffect, useRef, useState } from "react";
import boyImg from "./assets/boy.png";
import girlImg from "./assets/girl.png";
import umbrellaImg from "./assets/umbrella.png";

const PHASE = {
    SUNNY: "sunny",
    RAINY: "rainy",
};

const rollKid = () => {
    return {
        type: Math.random() < 0.5 ? "boy" : "girl",
        xPct: 12.5 + Math.random() * 75,
    };
};

const rectsOverlap = (a, b) => {
  return !(
      a.right < b.left ||
      a.left > b.right ||
      a.bottom < b.top ||
      a.top > b.bottom
  );
};

const spawnUmbrella = (stageEl, umbrellaEl) => {
    const stageRect = stageEl.getBoundingClientRect();
    const umbRect = umbrellaEl.getBoundingClientRect();

    const minX = stageRect.width * 0.05;
    const maxX = stageRect.width * 0.95 - umbRect.width;

    const minY = 0;
    const maxY = stageRect.height * 0.5 - umbRect.height;

    const x = minX + Math.random() * Math.max(0, maxX - minX);
    const y = minY + Math.random() * Math.max(0, maxY - minY);

    return { x, y };
};

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const Game = () => {
    const stageRef = useRef(null);
    const kidRef = useRef(null);
    const umbrellaRef = useRef(null);

    const [phase, setPhase] = useState(PHASE.SUNNY);
    const [kid, setKid] = useState(() => rollKid());
    const [umbrellaPos, setUmbrellaPos] = useState({ x:0, y: 0});
    const [umbCenter, setUmbCenter] = useState({ x: 0, y: 0});
    const [isDragging, setIsDragging] = useState(false);

    const dragOffset = useRef({ x: 0, y: 0 });

    const startRound = () => {
        setIsDragging(false);
        setKid(rollKid());
        setPhase(PHASE.RAINY);

        requestAnimationFrame(() => {
           if (!stageRef.current || !umbrellaRef.current) return;

           const stageEl = stageRef.current;
           const umbEl = umbrellaRef.current;

           const pos = spawnUmbrella(stageEl, umbEl);
           setUmbrellaPos(pos);
        });
    };

    const tryDrop = () => {
        const umbEl = umbrellaRef.current;
        const kidEl = kidRef.current;
        if (!umbEl || !kidEl) return;

        const umbRect = umbEl.getBoundingClientRect();
        const kidRect = kidEl.getBoundingClientRect();

        if (rectsOverlap(umbRect, kidRect)) {
            setIsDragging(false);
            setPhase(PHASE.SUNNY);
        }
    };

    const onPointerDown = (e) => {
        if (phase !== PHASE.RAINY) return;

        const umbEl = umbrellaRef.current;
        if (!umbEl) return;

        setIsDragging(true);

        const rect = umbEl.getBoundingClientRect();
        dragOffset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };

        umbEl.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e) => {
        if (!isDragging) return;

        const stageEl = stageRef.current;
        if (!stageEl) return;

        const stageRect = stageEl.getBoundingClientRect();
        const umbRect = umbrellaRef.current?.getBoundingClientRect();
        if (!umbRect) return;

        const maxX = stageRect.width - umbRect.width;
        const maxY = stageRect.height - umbRect.height;

        setUmbrellaPos({
            x: clamp(e.clientX - stageRect.left - dragOffset.current.x, 0, maxX),
            y: clamp(e.clientY - stageRect.top - dragOffset.current.y, 0, maxY),
        });
    };

    const onPointerUp = () => {
        if (!isDragging) return;
        setIsDragging(false);
        tryDrop();
    };

    useLayoutEffect(() => {
        if (phase !== PHASE.RAINY) return;

        const stageEl = stageRef.current;
        const umbEl = umbrellaRef.current;
        if (!stageEl || !umbEl) return;

        const stageRect = stageEl.getBoundingClientRect();
        const umbRect = umbEl.getBoundingClientRect();

        setUmbCenter({
            x: umbRect.left - stageRect.left + umbRect.width / 2,
            y: umbRect.top - stageRect.top + umbRect.height / 2,
        });
    }, [phase, umbrellaPos.x, umbrellaPos.y]);

    return (
        <div className="gameCard">
            <div className="gameHint">
                {phase === PHASE.SUNNY
                    ? "Click the child to start"
                    : "Drag the umbrella to the child (release to give)"
                }
            </div>

            <div
                ref={stageRef}
                className={`gameStage ${phase === PHASE.RAINY ? "gameStage--rainy" : "gameStage--sunny"}`}
                style={{
                    "--umb-x": `${umbCenter.x}px`,
                    "--umb-y": `${umbCenter.y}px`,
                }}
            >
                {/* Rain layer (only during rainy phase) */}
                {phase === PHASE.RAINY && <div className="rainLayer" aria-hidden="true" />}
                {phase === PHASE.RAINY && <div className="rainCutout" aria-hidden="true" />}

                {/* Kid */}
                <button
                    ref={kidRef}
                    className="kid"
                    style={{ left: `${kid.xPct}%` }}
                    onClick={phase === PHASE.SUNNY ? startRound : undefined }
                    type="button"
                >
                    <img
                        src={kid.type === "girl" ? girlImg : boyImg}
                        alt={kid.type === "girl" ? "Girl" : "Boy"}
                    />
                </button>

                {/* Umbrella */}
                {phase === PHASE.RAINY && (
                    <div
                        ref={umbrellaRef}
                        className={`umbrella ${isDragging ? "umbrella--dragging" : ""}`}
                        style={{
                            left: `${umbrellaPos.x}px`,
                            top: `${umbrellaPos.y}px`,
                        }}
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerUp}
                        role="button"
                        aria-label="Umbrella"
                    >
                        <img src={umbrellaImg} alt="Umbrella" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Game;

