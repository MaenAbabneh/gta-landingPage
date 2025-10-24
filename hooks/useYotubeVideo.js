import { useEffect, useRef, useState } from "react";

let apiLoadingPromise = null;

const loadYouTubeAPI = () => {
  if (!apiLoadingPromise) {
    apiLoadingPromise = new Promise((resolve) => {
      // تحقق من وجود YT والـ Player
      if (window.YT && window.YT.Player) {
        resolve(window.YT);
        return;
      }

      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        resolve(window.YT);
      };
    });
  }
  return apiLoadingPromise;
};

export function useYoutubeVideo(containerId, videoID, isOpen) {
  const playerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  // 1️⃣ إنشاء/تدمير المشغل عند فتح/إغلاق الـ overlay فقط
  useEffect(() => {
    let isMounted = true;

    const initializePlayer = async () => {
      try {
        const YT = await loadYouTubeAPI();

        if (!isMounted || !isOpen || !containerId) return;

        if (!YT || !YT.Player) {
          console.error("YouTube API not loaded properly");
          return;
        }

        // تحقق من وجود العنصر في DOM
        const element = document.getElementById(containerId);
        if (!element) {
          console.error(`Element with id "${containerId}" not found`);
          return;
        }

        // إنشاء المشغل مرة واحدة فقط
        const playerInstance = new YT.Player(containerId, {
          height: "100%",
          width: "100%",
          videoId: videoID, // الفيديو الأولي
          playerVars: {
            autoplay: 1,
            mute: 0,
            playsinline: 1,
            rel: 0,
            showinfo: 0,
            controls: 1,
            modestbranding: 1,
          },
          events: {
            onReady: (event) => {
              if (isMounted) {
                console.log("Player created and ready");
                setIsReady(true);
                event.target.playVideo();
              }
            },
            onError: (event) => {
              console.error("YouTube Player Error:", event.data);
            },
          },
        });

        if (isMounted) {
          playerRef.current = playerInstance;
        }
      } catch (error) {
        console.error("Error initializing YouTube player:", error);
        setIsReady(false);
      }
    };

    if (isOpen) {
      initializePlayer();
    }

    // التنظيف: تدمير المشغل عند إغلاق الـ overlay
    return () => {
      isMounted = false;
      if (
        playerRef.current &&
        typeof playerRef.current.destroy === "function"
      ) {
        console.log("Destroying player");
        playerRef.current.destroy();
        playerRef.current = null;
      }
      setIsReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, containerId]); // ⚠️ فقط isOpen و containerId - videoID يُعالج في useEffect المنفصل

  // 2️⃣ تحديث الفيديو عند تغيير videoID (بدون إعادة إنشاء المشغل)
  useEffect(() => {
    if (playerRef.current && isReady && videoID) {
      
      console.log("Loading new video:", videoID);
      playerRef.current.loadVideoById(videoID);
    }
  }, [videoID, isReady]); // يعمل فقط عند تغيير videoID

  return { playerRef, isReady };
}
