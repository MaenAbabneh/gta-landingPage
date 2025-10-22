"use client";

function TrailerOverlay({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* خلفية لإغلاق عند النقر */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />
      {/* المحتوى */}
      <div className="absolute inset-0">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/3h1O4v2W8pY?autoplay=1&mute=1&loop=1&playlist=3h1O4v2W8pY&controls=0&modestbranding=1&showinfo=0&rel=0"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      <button
        className="absolute top-50 right-40 z-[10000] bg-black/80 text-white px-4 py-2 rounded-lg"
        onClick={onClose}
        aria-label="Close trailer"
      >
        ✕
      </button>
    </div>
  );
}

export default TrailerOverlay;