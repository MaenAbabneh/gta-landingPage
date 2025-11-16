export default function AnimatedVideoSection(props) {
  const {
    videoRef,
    canvasRef,
    videoSrc,
    posterUrl,
    videoClassName,
    posterClassName,
    canvasClassName,
    videoAlt = "Animated section video",
    imgAlt = "Animated section poster",
  } = props;

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <video
        ref={videoRef}
        src={videoSrc}
        preload="metadata"
        playsInline
        muted
        crossOrigin="anonymous"
        aria-label={videoAlt}
        aria-hidden="true"
        className={`${videoClassName} z-30 aspect-video invisible`}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          inset: 0,
        }}
      />
      <picture
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          inset: 0,
        }}
      >
        <img
          src={posterUrl}
          alt={imgAlt}
          loading="lazy"
          className={`${posterClassName} aspect-video z-10 `}
          style={{ width: "100%", height: "100%" }}
        />
      </picture>
      <canvas
        ref={canvasRef}
        className={`${canvasClassName} aspect-video z-20`}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          inset: 0,
        }}
      />
    </div>
  );
}
