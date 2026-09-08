import "./KlienTerpercaya.css";

function KlienTerpercaya() {
  const clients = [
    {
      name: "Client One",
      image: "https://a.top4top.io/p_3895rx0771.png",
    },
    {
      name: "Client Two",
      image: "https://c.top4top.io/p_3895h7djc1.png",
    },
    {
      name: "Client Three",
      image: "https://a.top4top.io/p_3895rx0771.png",
    },
    {
      name: "Client Four",
      image: "https://a.top4top.io/p_3895rx0771.png",
    },
    {
      name: "Client Five",
      image: "https://a.top4top.io/p_3895rx0771.png",
    },
  ];

  return (
    <section id="klien" className="clients-section">
      {/* ================================
          HEADER
      ================================= */}
      <div className="max-w-7xl mx-auto px-2">
        <div className="mb-16">
          {/* JUDUL */}
          <h2 className="text-center text-5xl md:text-6xl lg:text-7xl font-bold text-[#003EFE] leading-[0.9] tracking-[-0.05em]">
            Klien{" "}
            <span className="font-light text-[#2ABCC1]">
              Terpercaya.
            </span>
          </h2>

          {/* DESKRIPSI */}
          <p className="max-w-2xl mx-auto mt-6 text-center text-gray-500 text-base md:text-lg leading-relaxed">
            Dipercaya oleh berbagai individu, bisnis, dan organisasi untuk
            menghadirkan solusi kreatif dan digital.
          </p>
        </div>
      </div>

      {/* ================================
          BARIS 1 — KANAN KE KIRI
      ================================= */}
      <div className="logo-wrapper">
        <div className="logo-track logo-left">
          {[...clients, ...clients].map((client, index) => (
            <div
              className="client-logo"
              key={`left-${index}`}
            >
              <img
                src={client.image}
                alt={client.name}
                className="client-logo-image"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ================================
          BARIS 2 — KIRI KE KANAN
      ================================= */}
      <div className="logo-wrapper">
        <div className="logo-track logo-right">
          {[...clients, ...clients].map((client, index) => (
            <div
              className="client-logo"
              key={`right-${index}`}
            >
              <img
                src={client.image}
                alt={client.name}
                className="client-logo-image"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default KlienTerpercaya;