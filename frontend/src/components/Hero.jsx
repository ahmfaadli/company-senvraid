import { useEffect, useRef } from "react";

export default function Hero() {
  const desktopVideoRef = useRef(null);
  const mobileVideoRef = useRef(null);

  useEffect(() => {
    const desktopVideo = desktopVideoRef.current;
    const mobileVideo = mobileVideoRef.current;

    if (!desktopVideo || !mobileVideo) return;

    const updateVideo = () => {
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        // Matikan video desktop
        desktopVideo.pause();
        desktopVideo.currentTime = 0;

        // Jalankan video mobile
        mobileVideo
          .play()
          .catch((error) => {
            console.log("Video mobile belum dapat autoplay:", error);
          });
      } else {
        // Matikan video mobile
        mobileVideo.pause();
        mobileVideo.currentTime = 0;

        // Jalankan video desktop
        desktopVideo
          .play()
          .catch((error) => {
            console.log("Video desktop belum dapat autoplay:", error);
          });
      }
    };

    // Jalankan saat pertama kali halaman dibuka
    updateVideo();

    // Jalankan kembali ketika ukuran layar berubah
    window.addEventListener("resize", updateVideo);

    return () => {
      window.removeEventListener("resize", updateVideo);

      desktopVideo.pause();
      mobileVideo.pause();
    };
  }, []);

  return (
    <section
      id="home"
      className="
        relative
        w-full
        h-screen
        min-h-[600px]
        overflow-hidden
        max-md:h-[100svh]
        max-md:min-h-[560px]
      "
    >
      {/* Desktop */}
      <video
        ref={desktopVideoRef}
        src="/videos/Hero-desktop.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload noplaybackrate"
        className="
          absolute inset-0
          w-full h-full
          object-cover
          hidden md:block
        "
      />

      {/* Mobile */}
      <video
        ref={mobileVideoRef}
        src="/videos/Hero-mobile.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload noplaybackrate"
        className="
          absolute inset-0
          w-full h-full
          object-cover
          block md:hidden
        "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
    </section>
  );
}