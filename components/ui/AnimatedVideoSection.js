export default function AnimatedVideoSection(props) {
  const {
    videoRef,
    canvasRef,
    videoSrc,
    posterUrl,
    posterMobile,
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
        width={1920}
        height={720}
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
        {posterMobile && (
          <source media="(max-width: 767px)" srcSet={posterMobile} />
        )}
        <img
          src={posterUrl}
          alt={imgAlt}
          className={`${posterClassName} aspect-video z-10 `}
          style={{ width: "100%", height: "100%" }}
        />
      </picture>
      <canvas
        ref={canvasRef}
        className={`${canvasClassName} aspect-video z-20`}
        width={1920}
        height={720}
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
