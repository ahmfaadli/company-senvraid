function Contact() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-[#212121] text-white px-6 pt-20 pb-8"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        <div className="absolute -top-60 -right-60 w-[600px] h-[600px] rounded-full border-[80px] border-[#2ABCC1]/10" />

        <div className="absolute -bottom-60 -left-60 w-[500px] h-[500px] rounded-full bg-[#2ABCC1]/10 blur-3xl" />

      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* TOP FOOTER */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">

          {/* BRAND */}
          <div className="lg:col-span-2">

            <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.05em] mb-5">
              Senvra
              <span className="text-[#2ABCC1]">.</span>
            </h2>

            <p className="max-w-md text-white/50 leading-relaxed mb-6">
              Digital creative studio yang menggabungkan design,
              development, dan technology untuk menciptakan pengalaman
              digital yang modern dan bermakna.
            </p>

            <a
              href="#order"
              className="inline-flex items-center gap-3 text-[#2ABCC1] font-semibold hover:text-white transition-colors"
            >
              Start a Project
              <span className="text-lg">
                →
              </span>
            </a>

          </div>

          {/* NAVIGATION */}
          <div>

            <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-5">
              Navigation
            </p>

            <ul className="space-y-3 text-sm">

              <li>
                <a
                  href="#home"
                  className="text-white/60 hover:text-[#2ABCC1] transition-colors"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#services"
                  className="text-white/60 hover:text-[#2ABCC1] transition-colors"
                >
                  Services
                </a>
              </li>

              <li>
                <a
                  href="#portfolio"
                  className="text-white/60 hover:text-[#2ABCC1] transition-colors"
                >
                  Portfolio
                </a>
              </li>

              <li>
                <a
                  href="#order"
                  className="text-white/60 hover:text-[#2ABCC1] transition-colors"
                >
                  Start a Project
                </a>
              </li>

            </ul>

          </div>

          {/* CONTACT */}
          <div>

            <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-5">
              Contact
            </p>

            <div className="space-y-4 text-sm">

              <a
                href="mailto:senvra@email.com"
                className="block text-white/60 hover:text-[#2ABCC1] transition-colors"
              >
                senvra@email.com
              </a>

              <a
                href="https://wa.me/628xxxxxxxxxx"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/60 hover:text-[#2ABCC1] transition-colors"
              >
                08xxxxxxxxxx
              </a>

            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}

export default Contact;