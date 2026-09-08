import Hero from "../components/Hero";
import LayananUnggulan from "../components/LayananUnggulan";
import Services from "../components/Services";
import KlienTerpercaya from "../components/KlienTerpercaya/KlienTerpercaya";
import News from "../components/News";
import Order from "../components/Order";
import Contact from "../components/Contact";
import WhatsAppButton from "../components/WhatsAppButton";

function Home() {
  return (
    <>
      <Hero />
      <LayananUnggulan />
      <Services />
      <KlienTerpercaya />
      <News />
      <Order />
      <Contact />
      <WhatsAppButton />
    </>
  );
}

export default Home;