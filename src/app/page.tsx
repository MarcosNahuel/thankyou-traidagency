import { createClient } from "@/lib/supabase/server";
import { ThankYouContent } from "@/types";
import Image from "next/image";
import { Youtube, Instagram, Linkedin, CheckCircle, BookOpen, ExternalLink } from "lucide-react";

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

// Videos de casos de éxito (YouTube)
const casosDeExitoVideos = [
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

// Casos de éxito TRAID - Cards con dashboards
const casosDeExitoTRAID = [
  {
    id: 1,
    icon: "🔄",
    iconBg: "bg-purple-500/20",
    title: "Rohana",
    caseNumber: "Caso #001",
    description: "Sistema inteligente de recuperación de carritos abandonados con WhatsApp automatizado y seguimiento personalizado.",
    tags: ["Recuperación", "WhatsApp", "Automatización"],
    statValue: "+28%",
    statLabel: "Tasa de recuperación",
    dashboardUrl: "https://traidagency.com/dashboards/rohana",
  },
  {
    id: 2,
    icon: "📊",
    iconBg: "bg-blue-500/20",
    title: "MELI Analytics",
    caseNumber: "Caso #002",
    description: "Dashboard ejecutivo que consolida métricas de múltiples cuentas de Mercado Libre con KPIs en tiempo real.",
    tags: ["Analytics", "Multi-cuenta", "Real-time"],
    statValue: "+61%",
    statLabel: "Crecimiento en ventas",
    dashboardUrl: "https://traidagency.com/dashboards/meli-analytics",
  },
  {
    id: 3,
    icon: "⚡",
    iconBg: "bg-yellow-500/20",
    title: "Gambimedic",
    caseNumber: "Caso #003",
    description: "Procesamiento masivo de datos médicos con validación automática y sincronización entre sistemas.",
    tags: ["Procesamiento", "Healthcare", "Sync"],
    statValue: "58x",
    statLabel: "Velocidad de proceso",
    dashboardUrl: "https://traidagency.com/dashboards/gambimedic",
  },
  {
    id: 4,
    icon: "🛒",
    iconBg: "bg-green-500/20",
    title: "Mundial Shop",
    caseNumber: "Caso #004",
    description: "Gestión centralizada de inventario multi-marketplace con alertas de stock y reposición automática.",
    tags: ["Inventario", "Multi-marketplace", "Alertas"],
    statValue: "+35%",
    statLabel: "Crecimiento mensual",
    dashboardUrl: "https://traidagency.com/dashboards/mundial-shop",
  },
  {
    id: 5,
    icon: "🔁",
    iconBg: "bg-red-500/20",
    title: "Huancom Group",
    caseNumber: "Caso #005",
    description: "Sistema de reversión de mediaciones con análisis predictivo y respuestas automatizadas.",
    tags: ["Mediaciones", "IA", "Automatización"],
    statValue: "+47.9%",
    statLabel: "Tasa de reversión",
    dashboardUrl: "https://traidagency.com/dashboards/huancom",
  },
  {
    id: 6,
    icon: "🌿",
    iconBg: "bg-emerald-500/20",
    title: "NATURAL VyA",
    caseNumber: "Caso #006",
    description: "Automatización completa de operaciones para 2 marcas con dashboard unificado y procesamiento de +9,000 órdenes.",
    tags: ["Multi-marca", "Automatización", "Dashboard"],
    statValue: "+529%",
    statLabel: "ROI en automatización",
    dashboardUrl: "https://traidagency.com/dashboards/natural",
  },
  {
    id: 7,
    icon: "👗",
    iconBg: "bg-pink-500/20",
    title: "Mikaela Boutique",
    caseNumber: "Caso #007",
    description: "Estrategia omnicanal con sincronización de stock y atención automatizada vía WhatsApp Business.",
    tags: ["Moda", "Omnicanal", "WhatsApp"],
    statValue: "+46%",
    statLabel: "Incremento en ventas",
    dashboardUrl: "https://traidagency.com/dashboards/mikaela",
  },
  {
    id: 8,
    icon: "💬",
    iconBg: "bg-cyan-500/20",
    title: "Tienda Lubbi",
    caseNumber: "Caso #008",
    description: "Sistema de atención al cliente con IA que reduce tiempos de respuesta y mejora la satisfacción.",
    tags: ["Atención", "IA", "Customer Success"],
    statValue: "-62.6%",
    statLabel: "Reducción FRT",
    dashboardUrl: "https://traidagency.com/dashboards/lubbi",
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

          {/* PASO 3: Catálogo */}
          <section>
            <div className="text-center mb-6">
              <span className="text-sm font-bold text-purple-400 tracking-widest uppercase">
                Paso 3
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

          {/* PASO 4: Casos de Éxito TRAID - Cards */}
          <section>
            <div className="text-center mb-6">
              <span className="text-sm font-bold text-purple-400 tracking-widest uppercase">
                Paso 4
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mt-2">
                <span className="gradient-text">Casos de Éxito</span> TRAID
              </h2>
              <p className="text-gray-400 mt-3">
                Resultados reales de clientes que confiaron en nosotros
              </p>
            </div>

            <div className="case-study-carousel">
              {casosDeExitoTRAID.map((caso) => (
                <div key={caso.id} className="case-study-card">
                  <div className={`case-study-icon ${caso.iconBg}`}>
                    {caso.icon}
                  </div>
                  <div className="case-study-header">
                    <h3 className="case-study-title">{caso.title}</h3>
                    <span className="case-study-number">{caso.caseNumber}</span>
                  </div>
                  <p className="case-study-description">{caso.description}</p>
                  <div className="case-study-tags">
                    {caso.tags.map((tag) => (
                      <span key={tag} className="case-study-tag">{tag}</span>
                    ))}
                  </div>
                  <div className="case-study-stat">
                    <span className="case-study-stat-value">{caso.statValue}</span>
                    <span className="case-study-stat-label">{caso.statLabel}</span>
                  </div>
                  <a
                    href={caso.dashboardUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="case-study-btn"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Ver dashboard
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* PASO 5: Testimonios en Video - YouTube */}
          <section>
            <div className="text-center mb-6">
              <span className="text-sm font-bold text-purple-400 tracking-widest uppercase">
                Paso 5
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mt-2">
                <span className="gradient-text">Testimonios</span> en Video
              </h2>
              <p className="text-gray-400 mt-3">
                Escucha directamente de nuestros clientes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {casosDeExitoVideos.map((caso) => (
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
