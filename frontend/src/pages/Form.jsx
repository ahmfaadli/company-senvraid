export default function Form() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-white py-16 md:py-24 px-6"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#003EFE] tracking-[-0.05em]">
            Let's{" "}
            <span className="font-light text-[#2ABCC1]">
              Connect.
            </span>
          </h2>

          <p className="max-w-2xl mx-auto mt-5 text-gray-500 text-base md:text-lg leading-relaxed">
            Punya ide atau project yang ingin diwujudkan? Ceritakan kepada
            kami dan mari mulai membangun sesuatu yang luar biasa.
          </p>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Form */}
          <div className="bg-[#f8fafb] rounded-3xl p-6 md:p-10">
            <div className="mb-8">
              <p className="text-[#2ABCC1] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
                Get In Touch
              </p>

              <h3 className="text-3xl md:text-4xl font-bold text-[#123F69] tracking-[-0.04em]">
                Tell us about your project.
              </h3>
            </div>

            <form className="space-y-5">
              {/* Nama */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-[#123F69] mb-2"
                >
                  Nama
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Masukkan nama Anda"
                  className="
                    w-full
                    h-14
                    px-5
                    rounded-xl
                    border border-gray-200
                    bg-white
                    text-[#123F69]
                    placeholder:text-gray-400
                    outline-none
                    focus:border-[#2ABCC1]
                    focus:ring-2
                    focus:ring-[#2ABCC1]/10
                    transition
                  "
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-[#123F69] mb-2"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  className="
                    w-full
                    h-14
                    px-5
                    rounded-xl
                    border border-gray-200
                    bg-white
                    text-[#123F69]
                    placeholder:text-gray-400
                    outline-none
                    focus:border-[#2ABCC1]
                    focus:ring-2
                    focus:ring-[#2ABCC1]/10
                    transition
                  "
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold text-[#123F69] mb-2"
                >
                  Project
                </label>

                <input
                  id="subject"
                  type="text"
                  placeholder="Contoh: Website, Video, Design..."
                  className="
                    w-full
                    h-14
                    px-5
                    rounded-xl
                    border border-gray-200
                    bg-white
                    text-[#123F69]
                    placeholder:text-gray-400
                    outline-none
                    focus:border-[#2ABCC1]
                    focus:ring-2
                    focus:ring-[#2ABCC1]/10
                    transition
                  "
                />
              </div>

              {/* Pesan */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-[#123F69] mb-2"
                >
                  Pesan
                </label>

                <textarea
                  id="message"
                  rows="5"
                  placeholder="Ceritakan kebutuhan project Anda..."
                  className="
                    w-full
                    px-5
                    py-4
                    rounded-xl
                    border border-gray-200
                    bg-white
                    text-[#123F69]
                    placeholder:text-gray-400
                    outline-none
                    resize-none
                    focus:border-[#2ABCC1]
                    focus:ring-2
                    focus:ring-[#2ABCC1]/10
                    transition
                  "
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="
                  w-full
                  h-14
                  rounded-xl
                  bg-[#2ABCC1]
                  text-[#123F69]
                  font-bold
                  hover:bg-[#123F69]
                  hover:text-white
                  transition-all
                  duration-300
                  cursor-pointer
                "
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Maps */}
          <div className="flex flex-col">
            <div className="mb-6">
              <p className="text-[#2ABCC1] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
                Our Location
              </p>

              <h3 className="text-3xl md:text-4xl font-bold text-[#123F69] tracking-[-0.04em]">
                Find us here.
              </h3>

              <p className="mt-3 text-gray-500 leading-relaxed">
                Kunjungi lokasi kami untuk berdiskusi langsung mengenai
                kebutuhan project Anda.
              </p>
            </div>

            {/* Map */}
            <div className="relative flex-1 min-h-[400px] lg:min-h-0 rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <iframe
                title="Lokasi Senvra"
                src="https://www.google.com/maps?q=Jakarta,Indonesia&output=embed"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}