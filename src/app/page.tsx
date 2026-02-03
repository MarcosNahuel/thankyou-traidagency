import { createClient } from "@/lib/supabase/server";
import { ThankYouContent } from "@/types";
import Image from "next/image";
import { Download, Youtube, Instagram, Linkedin, CheckCircle, BookOpen, Play } from "lucide-react";

async function getContent(): Promise<ThankYouContent | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("thankyou_content")
    .select("*")
    .single();

  if (error) {
    console.error("Error fetching content:", error);
    return null;
  }

  return data;
}

// Videos de casos de éxito
const casosDeExito = [
  {
    id: 1,
    videoId: "KrmHEjth384",
    title: "Caso de Éxito #1",
  },
  {
    id: 2,
    videoId: "Uu4GfFzWLr8",
    title: "Caso de Éxito #2",
  },
  {
    id: 3,
    videoId: "WZZG-kLDMsU",
    title: "Caso de Éxito #3",
  },
];

// Video intro Wistia
const introVideoEmbed = `<script src="https://fast.wistia.com/player.js" async></script>
<script src="https://fast.wistia.com/embed/wajcltihjl.js" async type="module"></script>
<style>
  wistia-player[media-id='wajcltihjl']:not(:defined) {
    background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/wajcltihjl/swatch');
    display: block;
    filter: blur(5px);
    padding-top: 56.25%;
  }
</style>
<wistia-player media-id="wajcltihjl" aspect="1.7777777777777777"></wistia-player>`;

export default async function ThankYouPage() {
  const content = await getContent();

  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <header className="py-6 px-4">
        <div className="max-w-4xl mx-auto flex justify-center">
          <Image
            src="/logo.svg"
            alt="TRAID Agency"
            width={180}
            height={50}
            className="h-12 w-auto"
            priority
          />
        </div>
      </header>

      {/* Alert Banner */}
      <div className="px-4 mb-8">
        <div className="max-w-4xl mx-auto">
          <div className="alert-success rounded-xl px-6 py-4 flex items-center justify-center gap-3">
            <CheckCircle className="w-6 h-6 flex-shrink-0" />
            <span className="font-semibold text-lg">
              ¡TU LLAMADA HA SIDO AGENDADA CON ÉXITO!
            </span>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="px-4 pb-16">
        <div className="max-w-4xl mx-auto space-y-16">

          {/* PASO 1: Video Intro - Conoce TRAID */}
          <section>
            <div className="text-center mb-6">
              <span className="text-sm font-bold text-purple-400 tracking-widest uppercase">
                Paso 1
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mt-2 gradient-text">
                Conoce TRAID Agency
              </h1>
              <p className="text-gray-400 mt-3 text-lg">
                Descubre quiénes somos y cómo trabajamos
              </p>
            </div>

            <div className="glass-card rounded-2xl p-2 glow-purple">
              <div
                className="video-container rounded-xl"
                dangerouslySetInnerHTML={{ __html: introVideoEmbed }}
              />
            </div>
          </section>

          {/* PASO 2: VSL - Video de Ventas */}
          <section>
            <div className="text-center mb-6">
              <span className="text-sm font-bold text-purple-400 tracking-widest uppercase">
                Paso 2
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mt-2">
                <span className="gradient-text">IMPORTANTE</span> - Mira este video antes de nuestra reunión
              </h2>
              <p className="text-gray-400 mt-3 text-lg">
                Descubre cómo escalamos cuentas y aseguramos resultados
              </p>
            </div>

            <div className="glass-card rounded-2xl p-2">
              {content?.vsl_embed ? (
                <div
                  className="video-container rounded-xl"
                  dangerouslySetInnerHTML={{ __html: content.vsl_embed }}
                />
              ) : (
                <div className="video-container rounded-xl flex items-center justify-center bg-zinc-900">
                  <p className="text-gray-500 absolute inset-0 flex items-center justify-center">
                    Video próximamente
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* PASO 3: PDF Download */}
          <section>
            <div className="text-center mb-6">
              <span className="text-sm font-bold text-purple-400 tracking-widest uppercase">
                Paso 3
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mt-2">
                Descarga tu <span className="gradient-text">Plan de Vuelo</span>
              </h2>
              <p className="text-gray-400 mt-3">
                Mientras esperas, lee esta guía confidencial sobre nuestra operativa
              </p>
            </div>

            <div className="flex justify-center">
              {content?.pdf_url ? (
                <a
                  href={content.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-3 text-lg"
                >
                  <Download className="w-5 h-5" />
                  DESCARGAR GUÍA PDF
                </a>
              ) : (
                <button
                  disabled
                  className="btn-primary opacity-50 cursor-not-allowed inline-flex items-center gap-3 text-lg"
                >
                  <Download className="w-5 h-5" />
                  PRÓXIMAMENTE
                </button>
              )}
            </div>
          </section>

          {/* PASO 4: Catálogo */}
          <section>
            <div className="text-center mb-6">
              <span className="text-sm font-bold text-purple-400 tracking-widest uppercase">
                Paso 4
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mt-2">
                Explora nuestro <span className="gradient-text">Catálogo de Servicios</span>
              </h2>
              <p className="text-gray-400 mt-3">
                Conoce todos los servicios que ofrecemos para escalar tu negocio
              </p>
            </div>

            <div className="flex justify-center">
              <a
                href="https://www.traidagency.com/catalogo"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-3 text-lg"
              >
                <BookOpen className="w-5 h-5" />
                VER CATÁLOGO COMPLETO
              </a>
            </div>
          </section>

          {/* Wall of Fame */}
          {content?.testimonials && content.testimonials.length > 0 && (
            <section>
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold">
                  Lo que dicen nuestros <span className="gradient-text">clientes</span>
                </h2>
              </div>

              <div className="testimonial-grid">
                {content.testimonials
                  .sort((a, b) => a.order - b.order)
                  .map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="testimonial-item border-gradient"
                    >
                      <Image
                        src={testimonial.image_url}
                        alt="Testimonio de cliente"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                  ))}
              </div>
            </section>
          )}

          {/* PASO 5: Casos de Éxito - YouTube */}
          <section>
            <div className="text-center mb-6">
              <span className="text-sm font-bold text-purple-400 tracking-widest uppercase">
                Paso 5
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mt-2">
                <span className="gradient-text">Casos de Éxito</span> Reales
              </h2>
              <p className="text-gray-400 mt-3">
                Mira cómo hemos ayudado a otros negocios a escalar
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {casosDeExito.map((caso) => (
                <div key={caso.id} className="glass-card rounded-2xl p-2">
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${caso.videoId}`}
                      title={caso.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <a
                href="https://www.youtube.com/@traidagency"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105"
              >
                <Youtube className="w-6 h-6" />
                VER MÁS EN YOUTUBE
              </a>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} TRAID Agency. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/ignaciooleo/reels/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-purple-400 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/company/traidecom-ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-purple-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://youtube.com/@traidagency"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-purple-400 transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
