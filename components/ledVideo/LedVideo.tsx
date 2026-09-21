"use client";

import { useEffect, useRef } from "react";

interface LedVideoProps {
    src: string;
    cellSize?: number;
    gap?: number;
    shape?: "circle" | "square";
    className?: string;
    minCellSize?: number;
    repeat?: number;
}

const LedVideo = ({
    src,
    cellSize = 12,
    gap = 3,
    shape = "circle",
    className = "",
    repeat = 1,
    minCellSize = 4,
}: LedVideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sampleCanvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const sampleCanvas = sampleCanvasRef.current;
        if (!video || !canvas || !sampleCanvas) return;

        const ctx = canvas.getContext("2d");
        const sampleCtx = sampleCanvas.getContext("2d");
        if (!ctx || !sampleCtx) return;

        let animationId: number;
        let cols = 0;
        let rows = 0;
        let effectiveCellSize = cellSize;
        let effectiveGap = gap;
        let lastDrawTime = 0;

        const setup = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            const rect = parent.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return;

            canvas.width = rect.width;
            canvas.height = rect.height;

            const referenceWidth = 700;
            const scale = Math.min(1, rect.width / referenceWidth);
            effectiveCellSize = Math.max(minCellSize, cellSize * scale);
            effectiveGap = Math.max(1, gap * scale);

            cols = Math.round(canvas.width / (effectiveCellSize + effectiveGap));
            rows = Math.round(canvas.height / (effectiveCellSize + effectiveGap));

            if (cols <= 0 || rows <= 0) return;

            sampleCanvas.width = cols;
            sampleCanvas.height = rows;
        };

        const draw = () => {
            const now = performance.now();
            if (now - lastDrawTime < 1000 / 30) {
                animationId = requestAnimationFrame(draw);
                return;
            }
            lastDrawTime = now;

            if (video.readyState >= 2 && cols > 0 && rows > 0) {
                const vw = video.videoWidth;
                const vh = video.videoHeight;

                if (vw > 0 && vh > 0) {
                    try {
                        sampleCtx.clearRect(0, 0, cols, rows);

                        const segmentWidth = cols / repeat;

                        for (let s = 0; s < repeat; s++) {
                            const segAspect = segmentWidth / rows;
                            const videoAspect = vw / vh;

                            let sx = 0, sy = 0, sw = vw, sh = vh;

                            if (videoAspect > segAspect) {
                                sw = vh * segAspect;
                                sx = (vw - sw) / 2;
                            } else {
                                sh = vw / segAspect;
                                sy = (vh - sh) / 2;
                            }

                            sampleCtx.drawImage(
                                video,
                                sx, sy, sw, sh,
                                s * segmentWidth, 0, segmentWidth, rows
                            );
                        }

                        const frame = sampleCtx.getImageData(0, 0, cols, rows).data;

                        ctx.clearRect(0, 0, canvas.width, canvas.height);

                        const effectiveCellW = canvas.width / cols;
                        const effectiveCellH = canvas.height / rows;

                        for (let y = 0; y < rows; y++) {
                            for (let x = 0; x < cols; x++) {
                                const i = (y * cols + x) * 4;
                                const r = frame[i];
                                const g = frame[i + 1];
                                const b = frame[i + 2];

                                const px = x * effectiveCellW;
                                const py = y * effectiveCellH;
                                const effectiveDotSize = Math.min(effectiveCellW, effectiveCellH) - effectiveGap;

                                ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

                                if (shape === "circle") {
                                    ctx.beginPath();
                                    ctx.arc(
                                        px + effectiveCellW / 2,
                                        py + effectiveCellH / 2,
                                        effectiveDotSize / 2,
                                        0,
                                        Math.PI * 2
                                    );
                                    ctx.fill();
                                } else {
                                    ctx.fillRect(px, py, effectiveDotSize, effectiveDotSize);
                                }
                            }
                        }
                    } catch (e) {
                        // Ignore les erreurs de lecture canvas ponctuelles
                    }
                }
            }
            animationId = requestAnimationFrame(draw);
        };

        setup();

        video.load();

        const tryPlay = () => {
            video.play().catch((err) => {
                console.error("LedVideo play() failed:", err.name, err.message);
            });
        };

        video.addEventListener("loadeddata", tryPlay, { once: true });
        video.addEventListener("error", () => {
            console.error("LedVideo video error:", video.error);
        });

        tryPlay();
        draw();

        const retryOnInteraction = () => {
            video.play().catch(() => { });
        };
        document.addEventListener("touchstart", retryOnInteraction, { once: true });

        const resizeObserver = new ResizeObserver(() => setup());
        if (canvas.parentElement) {
            resizeObserver.observe(canvas.parentElement);
        }

        return () => {
            cancelAnimationFrame(animationId);
            resizeObserver.disconnect();
            video.removeEventListener("loadeddata", tryPlay);
            document.removeEventListener("touchstart", retryOnInteraction);
        };
    }, [cellSize, gap, shape, repeat, minCellSize]);

    return (
        <div
            className={`relative overflow-hidden ${className}`}
            style={{ backgroundColor: "#0a0a0a" }}
        >
            <video
                ref={videoRef}
                src={src}
                muted
                loop
                playsInline
                autoPlay
                preload="auto"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, pointerEvents: "none" }}
            />
            <canvas ref={sampleCanvasRef} className="hidden" />
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
};

export default LedVideo;