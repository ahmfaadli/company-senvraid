import { useEffect, useState } from "react";
import axios from "axios";

function Services() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getPortfolios();
  }, []);

  const getPortfolios = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/portfolios");

      setData(response.data.data);
    } catch (error) {
      console.error("Error mengambil portfolio:", error);
      setError("Gagal mengambil data portfolio dari server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden bg-white py-16 md:py-20 px-6"
    >
      {/* BACKGROUND DECORATION */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#2ABCC1]/10 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#123F69]/5 blur-3xl" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-16">
          {/* JUDUL */}
          <h2 className="text-center text-5xl md:text-6xl lg:text-7xl font-bold text-[#003EFE] leading-[0.9] tracking-[-0.05em]">
            Our <span className="font-light text-[#2ABCC1]">Portfolio.</span>
          </h2>

          {/* DESKRIPSI */}
          <p className="max-w-2xl mx-auto mt-6 text-center text-gray-500 text-base md:text-lg leading-relaxed">
            A collection of digital experiences, creative projects, and
            technology solutions we've created.
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-10 h-10 border-4 border-[#123F69]/10 border-t-[#2ABCC1] rounded-full animate-spin mb-5" />

            <p className="text-gray-400 text-sm">Loading portfolio...</p>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="max-w-xl mx-auto py-16 text-center">
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* PORTFOLIO */}
        {!loading && !error && (
          <>
            {data.length === 0 ? (
              <div className="py-24 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#123F69]/5 mb-5">
                  <span className="text-2xl text-[#123F69]/40">+</span>
                </div>

                <h3 className="text-xl font-semibold text-[#123F69] mb-2">
                  No Portfolio Yet
                </h3>

                <p className="text-gray-500">
                  Portfolio yang ditambahkan melalui dashboard akan muncul di
                  sini.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.map((item, index) => (
                  <article
                    key={item.id}
                    className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-[#2ABCC1]/40 hover:shadow-2xl hover:shadow-[#123F69]/10 transition-all duration-500"
                  >
                    {/* IMAGE */}
                    <div className="relative w-full h-64 bg-[#123F69]/5 overflow-hidden">
                      {item.image ? (
                        <img
                          src={`http://127.0.0.1:8000/storage/${item.image}`}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#123F69]">
                          <span className="text-[#2ABCC1] text-5xl font-bold">
                            S
                          </span>
                        </div>
                      )}

                      {/* CATEGORY */}
                      {item.category && (
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex px-4 py-2 rounded-full bg-[#123F69]/90 backdrop-blur-sm text-[#2ABCC1] text-xs font-medium tracking-wide">
                            {item.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* CONTENT */}
                    <div className="p-6">
                      {/* NUMBER */}
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-xs font-medium text-gray-300 tracking-[0.2em]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="w-8 h-[1px] bg-[#2ABCC1]" />
                      </div>

                      {/* TITLE */}
                      <h3 className="text-2xl font-bold text-[#123F69] mb-3 group-hover:text-[#2ABCC1] transition-colors">
                        {item.title}
                      </h3>

                      {/* DESCRIPTION */}
                      <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                        {item.description}
                      </p>

                      {/* LINK */}
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[#123F69] font-semibold text-sm group/link"
                        >
                          <span className="group-hover/link:text-[#2ABCC1] transition-colors">
                            View Project
                          </span>

                          <span className="text-[#2ABCC1] group-hover/link:translate-x-1 transition-transform">
                            →
                          </span>
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}

        {/* BOTTOM */}
        {!loading && !error && data.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              {data.length} project{data.length > 1 ? "s" : ""} showcased
            </p>

            <a
              href="#contact"
              className="group inline-flex items-center gap-3 text-[#123F69] font-semibold text-sm"
            >
              Have a project in mind?
              <span className="text-[#2ABCC1] group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

export default Services;
