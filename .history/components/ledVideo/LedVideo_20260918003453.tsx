"use client";

import { useEffect, useRef } from "react";

const LedVideo = ({
    src,
    cellSize = 12,     // taille de chaque "LED" en pixels
    gap = 3,           // espace entre chaque LED
    shape = "circle",  // "circle" ou "square"
    className = "",
}) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const sampleCanvasRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const sampleCanvas = sampleCanvasRef.current;
        if (!video || !canvas || !sampleCanvas) return;

        const ctx = canvas.getContext("2d");
        const sampleCtx = sampleCanvas.getContext("2d", { willReadFrequently: true });

        let animationId;
        let cols = 0;
        let rows = 0;

        const setup = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;

            cols = Math.floor(canvas.width / (cellSize + gap));
            rows = Math.floor(canvas.height / (cellSize + gap));

            sampleCanvas.width = cols;
            sampleCanvas.height = rows;
        };

        const draw = () => {
            if (video.readyState >= 2) {
                // On échantillonne la vidéo en basse résolution (1 pixel = 1 LED)
                sampleCtx.drawImage(video, 0, 0, cols, rows);
                const frame = sampleCtx.getImageData(0, 0, cols, rows).data;

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                for (let y = 0; y < rows; y++) {
                    for (let x = 0; x < cols; x++) {
                        const i = (y * cols + x) * 4;
                        const r = frame[i];
                        const g = frame[i + 1];
                        const b = frame[i + 2];

                        const px = x * (cellSize + gap);
                        const py = y * (cellSize + gap);

                        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

                        if (shape === "circle") {
                            ctx.beginPath();
                            ctx.arc(
                                px + cellSize / 2,
                                py + cellSize / 2,
                                cellSize / 2,
                                0,
                                Math.PI * 2
                            );
                            ctx.fill();
                        } else {
                            ctx.fillRect(px, py, cellSize, cellSize);
                        }
                    }
                }
            }
            animationId = requestAnimationFrame(draw);
        };

        setup();
        video.play().catch(() => { });
        draw();

        window.addEventListener("resize", setup);
        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", setup);
        };
    }, [cellSize, gap, shape]);

    return (
        <div className={`relative overflow-hidden ${className}`} style={{ backgroundColor: "#0a0a0a" }}>
            <video
                ref={videoRef}
                src={src}
                muted
                loop
                playsInline
                autoPlay
                className="hidden"
            />
            <canvas ref={sampleCanvasRef} className="hidden" />
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
};

export default LedVideo;