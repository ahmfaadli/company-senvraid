import React, { useEffect, useState } from "react";
import axios from "axios";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/news"
      );

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];

      setNews(data);
    } catch (error) {
      console.error("Gagal mengambil berita:", error);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="relative w-full bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-center text-gray-500">
            Memuat berita...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="content"
      className="relative overflow-hidden bg-white py-16 md:py-20 px-6"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-50 rounded-full blur-3xl opacity-70 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

        {/* HEADER */}
        <div className="mb-14">
          <div className="text-center">
            <h2 className="text-center text-5xl md:text-6xl lg:text-7xl font-bold text-[#003EFE] leading-[0.9] tracking-[-0.05em]">
              Berita &{" "}
              <span className="font-light text-[#2ABCC1]">
                Insight.
              </span>
            </h2>
          </div>

          <div className="relative mt-5 min-h-[70px]">
            <p className="max-w-2xl mx-auto text-center text-gray-500 text-base md:text-lg leading-relaxed">
              Temukan berbagai informasi, insight, dan perkembangan terbaru
              seputar dunia kreatif dan digital bersama Senvra.
            </p>

            {/* DESKTOP */}
            <div className="hidden md:flex absolute right-0 bottom-0">
              <button
                type="button"
                className="group flex items-center gap-3 text-[#123F72] font-semibold hover:text-cyan-500 transition-colors"
              >
                Lihat Semua Berita

                <span
                  className="
                    w-10 h-10
                    rounded-full
                    border border-[#123F72]/20
                    flex items-center justify-center
                    group-hover:bg-cyan-500
                    group-hover:text-white
                    group-hover:border-cyan-500
                    transition-all
                  "
                >
                  →
                </span>
              </button>
            </div>

            {/* MOBILE */}
            <div className="flex md:hidden justify-center mt-6">
              <button
                type="button"
                className="group flex items-center gap-3 text-[#123F72] font-semibold hover:text-cyan-500 transition-colors"
              >
                Lihat Semua Berita

                <span
                  className="
                    w-10 h-10
                    rounded-full
                    border border-[#123F72]/20
                    flex items-center justify-center
                    group-hover:bg-cyan-500
                    group-hover:text-white
                    group-hover:border-cyan-500
                    transition-all
                  "
                >
                  →
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* NEWS */}
        {news.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400">
              Belum ada berita yang tersedia.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {news.map((item) => {
              const imageUrl = item.image
                ? `http://127.0.0.1:8000/storage/${item.image}`
                : "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80";

              const formattedDate = item.published_at
                ? new Date(item.published_at)
                    .toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                    .toUpperCase()
                : "";

              return (
                <article
                  key={item.id}
                  className="
                    group
                    bg-white
                    rounded-[28px]
                    overflow-hidden
                    border border-gray-100
                    shadow-sm
                    hover:shadow-xl
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    flex
                    flex-col
                  "
                >
                  {/* IMAGE */}
                  <div className="relative h-[260px] overflow-hidden flex-shrink-0">
                    <img
                      src={imageUrl}
                      alt={item.title || "News"}
                      className="
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-110
                      "
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80";
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />

                    {/* CATEGORY */}
                    {item.category && (
                      <div className="absolute top-5 left-5">
                        <span className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold tracking-wider text-[#123F72]">
                          {item.category}
                        </span>
                      </div>
                    )}

                    {/* ARROW */}
                    <div className="absolute right-5 bottom-5">
                      <div
                        className="
                          w-11 h-11
                          rounded-full
                          bg-white/90
                          backdrop-blur-sm
                          flex items-center justify-center
                          text-[#123F72]
                          transition-all
                          duration-300
                          group-hover:bg-cyan-500
                          group-hover:text-white
                          group-hover:rotate-45
                        "
                      >
                        ↗
                      </div>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-7 flex flex-col flex-1">

                    {/* DATE */}
                    <p className="text-xs font-semibold tracking-[0.18em] text-cyan-500 mb-4">
                      {formattedDate}
                    </p>

                    {/* TITLE */}
                    <h3
                      className="
                        text-xl
                        md:text-2xl
                        font-bold
                        leading-snug
                        text-[#123F72]
                        group-hover:text-cyan-500
                        transition-colors
                        duration-300
                        min-h-[84px]
                        line-clamp-3
                      "
                    >
                      {item.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p
                      className="
                        mt-4
                        text-gray-500
                        leading-relaxed
                        text-sm
                        md:text-base
                        line-clamp-4
                        min-h-[112px]
                        max-h-[112px]
                        overflow-hidden
                      "
                    >
                      {item.description}
                    </p>

                    {/* READ MORE */}
                    <div
                      className="
                        mt-auto
                        pt-6
                        flex
                        items-center
                        gap-2
                        text-sm
                        font-semibold
                        text-[#123F72]
                        group-hover:text-cyan-500
                        transition-colors
                      "
                    >
                      Baca Selengkapnya

                      <span className="transition-transform duration-300 group-hover:translate-x-2">
                        →
                      </span>
                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}