import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Specialities } from "./components/Specialities";
import { Services } from "./components/Services";
import { About } from "./components/About";
import { Team } from "./components/Team";
import { Testimonials } from "./components/Testimonials";
import { CtaBanner } from "./components/CtaBanner";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif", scrollBehavior: "smooth" }}>
      <Navbar />
      <Hero />
      <Specialities />
      <Services />
      <About />
      <Team />
      <Testimonials />
      <CtaBanner />
      <Contact />
      <Footer />
    </div>
  );
}
