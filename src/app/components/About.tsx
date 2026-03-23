import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Award, Clock, Target, Scale } from "lucide-react";

const values = [
  { icon: Scale, title: "Integrity", description: "We uphold the highest ethical standards in every case." },
  { icon: Target, title: "Dedication", description: "Relentless pursuit of the best outcomes for our clients." },
  { icon: Clock, title: "Efficiency", description: "Timely resolution without compromising quality." },
  { icon: Award, title: "Excellence", description: "Award-winning legal practice recognized worldwide." },
];

export function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1714150458873-715e134901a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBmaXJtJTIwbW9kZXJuJTIwb2ZmaWNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcyMDc5MTM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Destination Lawyers Office"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[#c41e2a] -z-10" />
            <div className="absolute -bottom-6 -left-6 bg-[#c41e2a] text-white p-6 shadow-xl">
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", fontWeight: 700 }}>25+</div>
              <div style={{ fontSize: "0.8125rem", fontWeight: 500, letterSpacing: "0.1em" }}>YEARS OF<br />EXCELLENCE</div>
            </div>
          </div>
          <div>
            <span className="text-[#c41e2a] tracking-[0.3em] uppercase" style={{ fontSize: "0.75rem", fontWeight: 600 }}>Who We Are</span>
            <h2 className="mt-4 text-[#0a0a0a] mb-6" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3vw, 2.75rem)", fontWeight: 700 }}>About Destination Lawyers</h2>
            <div className="w-16 h-1 bg-[#c41e2a] mb-8" />
            <p className="text-gray-600 mb-6" style={{ fontSize: "1rem", lineHeight: 1.8 }}>
              Founded with a vision to provide exceptional legal services, Destination Lawyers has grown into one of the most respected law firms in the region. Our team of accomplished attorneys brings diverse expertise and a shared commitment to client success.
            </p>
            <p className="text-gray-600 mb-10" style={{ fontSize: "1rem", lineHeight: 1.8 }}>
              We believe that everyone deserves access to top-tier legal representation. Our approach combines thorough legal analysis with compassionate client care, ensuring you receive not just legal advice, but a partnership built on trust and transparency.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {values.map((v) => (
                <div key={v.title} className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#c41e2a]/10 flex items-center justify-center flex-shrink-0">
                    <v.icon size={18} className="text-[#c41e2a]" />
                  </div>
                  <div>
                    <h4 className="text-[#0a0a0a] mb-1" style={{ fontSize: "0.9375rem", fontWeight: 600 }}>{v.title}</h4>
                    <p className="text-gray-500" style={{ fontSize: "0.8125rem", lineHeight: 1.6 }}>{v.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
