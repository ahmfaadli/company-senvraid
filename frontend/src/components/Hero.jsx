import { useEffect, useRef } from "react";

export default function Hero() {
  const desktopVideoRef = useRef(null);
  const mobileVideoRef = useRef(null);

  const desktopBlobUrl = useRef(null);
  const mobileBlobUrl = useRef(null);

  useEffect(() => {
    let mounted = true;

    const loadVideos = async () => {
      try {
        // Ambil video tanpa memasukkan URL .mp4 langsung
        const [desktopResponse, mobileResponse] = await Promise.all([
          fetch("/videos/Hero-desktop.mp4", {
            cache: "force-cache",
          }),
          fetch("/videos/Hero-mobile.mp4", {
            cache: "force-cache",
          }),
        ]);

        if (!desktopResponse.ok || !mobileResponse.ok) {
          throw new Error("Video gagal dimuat");
        }

        const [desktopBlob, mobileBlob] = await Promise.all([
          desktopResponse.blob(),
          mobileResponse.blob(),
        ]);

        if (!mounted) return;

        // Buat Blob URL
        desktopBlobUrl.current = URL.createObjectURL(desktopBlob);
        mobileBlobUrl.current = URL.createObjectURL(mobileBlob);

        // Pasang Blob URL ke video
        if (desktopVideoRef.current) {
          desktopVideoRef.current.src = desktopBlobUrl.current;
          desktopVideoRef.current.load();
        }

        if (mobileVideoRef.current) {
          mobileVideoRef.current.src = mobileBlobUrl.current;
          mobileVideoRef.current.load();
        }

        // Jalankan video sesuai ukuran layar
        const updateVideo = () => {
          const desktopVideo = desktopVideoRef.current;
          const mobileVideo = mobileVideoRef.current;

          if (!desktopVideo || !mobileVideo) return;

          const isMobile = window.innerWidth < 768;

          if (isMobile) {
            desktopVideo.pause();
            desktopVideo.currentTime = 0;

            mobileVideo
              .play()
              .catch((error) => {
                console.log("Autoplay mobile diblokir:", error);
              });
          } else {
            mobileVideo.pause();
            mobileVideo.currentTime = 0;

            desktopVideo
              .play()
              .catch((error) => {
                console.log("Autoplay desktop diblokir:", error);
              });
          }
        };

        updateVideo();

        window.addEventListener("resize", updateVideo);

        // Simpan cleanup function
        return () => {
          window.removeEventListener("resize", updateVideo);
        };
      } catch (error) {
        console.error("Gagal memuat video:", error);
      }
    };

    loadVideos();

    return () => {
      mounted = false;

      if (desktopVideoRef.current) {
        desktopVideoRef.current.pause();
        desktopVideoRef.current.removeAttribute("src");
        desktopVideoRef.current.load();
      }

      if (mobileVideoRef.current) {
        mobileVideoRef.current.pause();
        mobileVideoRef.current.removeAttribute("src");
        mobileVideoRef.current.load();
      }

      // Hapus Blob URL
      if (desktopBlobUrl.current) {
        URL.revokeObjectURL(desktopBlobUrl.current);
      }

      if (mobileBlobUrl.current) {
        URL.revokeObjectURL(mobileBlobUrl.current);
      }
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