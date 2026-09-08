function Order() {
  return (
    <section
      id="order"
      className="relative overflow-hidden bg-white py-20 md:py-28 px-6"
    >
      {/* BACKGROUND DECORATION */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#2ABCC1]/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#123F69]/5 blur-3xl" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ORDER BOX */}
        <div className="relative overflow-hidden rounded-[42px] bg-[#003EFE] px-8 py-14 md:px-16 md:py-16 lg:px-20 lg:py-20">
          
          {/* DECORATION */}
          <div className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full border-[70px] border-[#2ABCC1]/5" />

          <div className="absolute -bottom-40 -right-20 w-[400px] h-[400px] rounded-full bg-[#2ABCC1]/5 blur-3xl" />

          <div className="absolute top-12 right-[18%] w-3 h-3 rounded-full bg-[#2ABCC1]/60" />

          {/* TEXT */}
          <div className="relative z-10 max-w-4xl">

            {/* TITLE */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.9] tracking-[-0.05em] text-white">
              Let's create
              <span className="block text-[#2ABCC1] font-light">
                something great.
              </span>
            </h2>

            {/* BUTTON */}
            <div className="mt-9">
              <a
                href="contact "
                className="group inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-[#2ABCC1] text-[#003EFE] font-semibold text-sm hover:bg-white transition-all duration-300"
              >
                Let's work together

                <span className="text-lg group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
            </div>

            {/* INFO */}
            <div className="flex flex-wrap items-center gap-4 mt-8 text-sm text-white/40">
              <span>Design</span>

              <span className="text-[#2ABCC1]">•</span>

              <span>Development</span>

              <span className="text-[#2ABCC1]">•</span>

              <span>Technology</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Order;