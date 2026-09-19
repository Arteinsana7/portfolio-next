"use client";

import { useEffect, useRef } from "react";

interface LedVideoProps {
    src: string;
    cellSize?: number;
    gap?: number;
    shape?: "circle" | "square";
    className?: string;
    minCellSize?: number;
    repeat?: number; // nombre de répétitions horizontales de la vidéo
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
        const sampleCtx = sampleCanvas.getContext("2d", {
            willReadFrequently: true,
        });
        if (!ctx || !sampleCtx) return;

        let animationId: number;
        let cols = 0;
        let rows = 0;
        let effectiveCellSize = cellSize;
        let effectiveGap = gap;

        const setup = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            const rect = parent.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;

            // Réduit la taille des cellules sur les petits écrans pour garder plus de détail
            const referenceWidth = 700; // largeur "desktop" de référence
            const scale = Math.min(1, rect.width / referenceWidth);
            effectiveCellSize = Math.max(minCellSize, cellSize * scale);
            effectiveGap = Math.max(1, gap * scale);

            cols = Math.round(canvas.width / (effectiveCellSize + effectiveGap));
            rows = Math.round(canvas.height / (effectiveCellSize + effectiveGap));

            sampleCanvas.width = cols;
            sampleCanvas.height = rows;
        };

        const draw = () => {
            if (video.readyState >= 2 && cols > 0 && rows > 0) {
                const vw = video.videoWidth;
                const vh = video.videoHeight;

                if (vw > 0 && vh > 0) {
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
                }
            }
            animationId = requestAnimationFrame(draw);
        };

        setup();

        const startPlayback = () => {
            video.play().catch(() => { });
            draw();
        };

        if (video.readyState >= 3) {
            startPlayback();
        } else {
            video.addEventListener("canplaythrough", startPlayback, { once: true });
        }
        video.play().catch(() => { });
        draw();
        const resizeObserver = new ResizeObserver(() => setup());
        if (canvas.parentElement) {
            resizeObserver.observe(canvas.parentElement);
        }

        return () => {
            cancelAnimationFrame(animationId);
            resizeObserver.disconnect();
            video.removeEventListener("canplaythrough", startPlayback);
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
                className="hidden"
            />
            <canvas ref={sampleCanvasRef} className="hidden" />
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
};

export default LedVideo;