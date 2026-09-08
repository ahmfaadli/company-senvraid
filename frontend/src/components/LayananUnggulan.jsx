function LayananUnggulan() {
  const layanan = [
    {
      title: "Video Editor",
      description:
        "Editing video profesional untuk kebutuhan promosi, konten media sosial, branding, dan berbagai kebutuhan digital.",
      detail: "Creative • Motion • Editing",
      image: "/image/Video-Editor.jpg",
    },
    {
      title: "Website",
      description:
        "Website modern, responsif, dan interaktif yang dirancang sesuai kebutuhan bisnis, personal, maupun organisasi.",
      detail: "UI/UX • Development • Responsive",
      image: "/image/website.jpg",
    },
    {
      title: "Design Arsitektur",
      description:
        "Menciptakan konsep dan visual arsitektur yang menggabungkan fungsi, estetika, serta kebutuhan ruang.",
      detail: "Concept • 3D • Architecture",
      image: "/image/architecture.jpg",
    },
  ];

  return (
    <section
      id="layanan-unggulan"
      className="relative overflow-hidden bg-white py-16 md:py-20 px-6"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-[#003EFE] tracking-[-0.05em]">
            Layanan
            <span className="text-[#2ABCC1] font-light"> Unggulan.</span>
          </h2>

          <p className="max-w-2xl mx-auto mt-5 text-gray-500 leading-relaxed">
            Kami menghadirkan layanan kreatif dan digital untuk membantu
            mewujudkan ide menjadi karya yang profesional dan berdampak.
          </p>
        </div>

        {/* FLIP CARDS */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {layanan.map((item) => (
            <div
              key={item.number}
              className="group h-[380px] [perspective:1200px]"
            >
              {/* CARD */}
              <div
                className="
                  relative w-full h-full
                  transition-transform duration-700
                  [transform-style:preserve-3d]
                  group-hover:[transform:rotateY(180deg)]
                "
              >
                {/* =========================
                    FRONT
                ========================== */}
                <div
                  className="
                    absolute inset-0
                    rounded-3xl
                    bg-[#003EFE]
                    overflow-hidden
                    [backface-visibility:hidden]
                  "
                >
                  {/* IMAGE */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="
                      absolute inset-0
                      w-full h-full
                      object-cover
                      transition-transform duration-700
                      group-hover:scale-105
                    "
                  />

                  {/* DARK OVERLAY */}
                  <div
                    className="
                      absolute inset-0
                      bg-gradient-to-t
                      from-[#003EFE]
                      via-[#003EFE]/60
                      to-[#003EFE]/20
                    "
                  />

                  {/* DECORATION */}
                  <div
                    className="
                      absolute
                      -right-20 -top-20
                      w-56 h-56
                      rounded-full
                      border-[35px]
                      border-[#2ABCC1]/20
                    "
                  />

                  {/* NUMBER + ICON */}
                  <div className="relative z-10 flex items-start justify-between p-8 md:p-10">
                    <span className="text-[#2ABCC1] text-sm font-medium tracking-[0.2em]">
                      {item.number}
                    </span>

                    <span
                      className="
                        w-10 h-10
                        rounded-full
                        border border-white/30
                        flex items-center justify-center
                        text-white
                        transition-all duration-300
                        group-hover:border-[#2ABCC1]
                        group-hover:text-[#2ABCC1]
                      "
                    >
                      ↗
                    </span>
                  </div>

                  {/* TITLE */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-8 md:p-10">
                    <div className="w-12 h-[2px] bg-[#2ABCC1] mb-6" />

                    <h3
                      className="
                        text-3xl md:text-4xl
                        font-bold
                        text-white
                        tracking-[-0.04em]
                      "
                    >
                      {item.title}
                    </h3>

                    <p className="mt-4 text-white/50 text-sm">
                      Hover to explore
                    </p>
                  </div>
                </div>

                {/* =========================
                    BACK
                ========================== */}
                <div
                  className="
                    absolute inset-0
                    rounded-3xl
                    bg-[#2ABCC1]
                    p-8 md:p-10
                    flex flex-col justify-between
                    [backface-visibility:hidden]
                    [transform:rotateY(180deg)]
                  "
                >
                  <div>
                    <span className="text-[#123F69]/50 text-sm font-medium tracking-[0.2em]">
                      {item.number}
                    </span>

                    <h3
                      className="
                        text-3xl md:text-4xl
                        font-bold
                        text-[#123F69]
                        tracking-[-0.04em]
                        mt-6
                      "
                    >
                      {item.title}
                    </h3>

                    <div className="w-12 h-[2px] bg-[#123F69] mt-6 mb-6" />

                    <p className="text-[#123F69]/70 leading-relaxed text-sm md:text-base">
                      {item.description}
                    </p>
                  </div>

                  <div>
                    <p
                      className="
                        text-xs
                        font-semibold
                        tracking-[0.15em]
                        uppercase
                        text-[#123F69]/60
                      "
                    >
                      {item.detail}
                    </p>

                    <div
                      className="
                        mt-5
                        flex items-center gap-2
                        text-[#123F69]
                        font-semibold
                        text-sm
                      "
                    >
                      Let's work together
                      <span>→</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LayananUnggulan;
