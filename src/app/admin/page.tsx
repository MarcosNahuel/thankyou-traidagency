"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ThankYouContent, Testimonial } from "@/types";
import Image from "next/image";
import {
  Save,
  Loader2,
  ExternalLink,
  LogOut,
  Video,
  FileText,
  Image as ImageIcon,
  Youtube,
  Trash2,
  Plus,
  GripVertical,
  Check,
  AlertCircle,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [content, setContent] = useState<ThankYouContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  // Form state
  const [vslEmbed, setVslEmbed] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfFilename, setPdfFilename] = useState("");
  const [youtubeChannel, setYoutubeChannel] = useState("");
  const [youtubeVideoEmbed, setYoutubeVideoEmbed] = useState("");
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const fetchContent = useCallback(async () => {
    const { data, error } = await supabase
      .from("thankyou_content")
      .select("*")
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching content:", error);
    }

    if (data) {
      setContent(data);
      setVslEmbed(data.vsl_embed || "");
      setPdfUrl(data.pdf_url || "");
      setPdfFilename(data.pdf_filename || "");
      setYoutubeChannel(data.youtube_channel_url || "");
      setYoutubeVideoEmbed(data.youtube_video_embed || "");
      setTestimonials(data.testimonials || []);
    }

    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus("idle");

    const payload = {
      vsl_embed: vslEmbed,
      pdf_url: pdfUrl || null,
      pdf_filename: pdfFilename || null,
      youtube_channel_url: youtubeChannel || null,
      youtube_video_embed: youtubeVideoEmbed || null,
      testimonials: testimonials,
      updated_at: new Date().toISOString(),
    };

    let result;
    if (content?.id) {
      result = await supabase
        .from("thankyou_content")
        .update(payload)
        .eq("id", content.id);
    } else {
      result = await supabase.from("thankyou_content").insert([payload]);
    }

    if (result.error) {
      console.error("Error saving:", result.error);
      setSaveStatus("error");
    } else {
      setSaveStatus("success");
      fetchContent();
    }

    setSaving(false);
    setTimeout(() => setSaveStatus("idle"), 3000);
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPdf(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `plan-de-vuelo-${Date.now()}.${fileExt}`;
    const filePath = `pdfs/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("thankyou-assets")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Error uploading PDF:", uploadError);
      setUploadingPdf(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("thankyou-assets")
      .getPublicUrl(filePath);

    setPdfUrl(urlData.publicUrl);
    setPdfFilename(file.name);
    setUploadingPdf(false);
  };

  const handleTestimonialUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `testimonial-${Date.now()}.${fileExt}`;
    const filePath = `testimonials/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("thankyou-assets")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Error uploading image:", uploadError);
      setUploadingImage(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("thankyou-assets")
      .getPublicUrl(filePath);

    const newTestimonial: Testimonial = {
      id: crypto.randomUUID(),
      image_url: urlData.publicUrl,
      order: testimonials.length,
    };

    setTestimonials([...testimonials, newTestimonial]);
    setUploadingImage(false);
  };

  const removeTestimonial = async (id: string) => {
    const testimonial = testimonials.find((t) => t.id === id);
    if (testimonial) {
      // Extraer el path del archivo de la URL
      const url = new URL(testimonial.image_url);
      const pathParts = url.pathname.split("/");
      const filePath = pathParts.slice(-2).join("/");

      // Eliminar del storage
      await supabase.storage.from("thankyou-assets").remove([filePath]);
    }

    setTestimonials(testimonials.filter((t) => t.id !== id));
  };

  const moveTestimonial = (index: number, direction: "up" | "down") => {
    const newTestimonials = [...testimonials];
    const newIndex = direction === "up" ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= newTestimonials.length) return;

    [newTestimonials[index], newTestimonials[newIndex]] = [
      newTestimonials[newIndex],
      newTestimonials[index],
    ];

    // Actualizar order
    newTestimonials.forEach((t, i) => {
      t.order = i;
    });

    setTestimonials(newTestimonials);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/logo.svg"
              alt="TRAID Agency"
              width={120}
              height={32}
              className="h-8 w-auto"
            />
            <span className="text-gray-500">|</span>
            <span className="text-sm text-gray-400">Thank You Page Admin</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm px-4 py-2 inline-flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Ver Página
            </a>
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-white transition-colors p-2"
              title="Cerrar sesión"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-8">

          {/* VSL Section */}
          <section className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Video className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="text-xl font-semibold">Video VSL Principal</h2>
            </div>

            <p className="text-gray-400 text-sm mb-4">
              Pega el código embed del video (YouTube, Vimeo, Wistia, etc.)
            </p>

            <textarea
              value={vslEmbed}
              onChange={(e) => setVslEmbed(e.target.value)}
              className="input-field font-mono text-sm h-32"
              placeholder='<iframe src="https://www.youtube.com/embed/VIDEO_ID" ...></iframe>'
            />

            {vslEmbed && (
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-2">Preview:</p>
                <div
                  className="video-container rounded-xl max-w-xl"
                  dangerouslySetInnerHTML={{ __html: vslEmbed }}
                />
              </div>
            )}
          </section>

          {/* PDF Section */}
          <section className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-pink-500/20 rounded-lg">
                <FileText className="w-5 h-5 text-pink-400" />
              </div>
              <h2 className="text-xl font-semibold">PDF Descargable</h2>
            </div>

            {pdfUrl ? (
              <div className="flex items-center gap-4 p-4 bg-zinc-900 rounded-xl">
                <FileText className="w-8 h-8 text-pink-400" />
                <div className="flex-1">
                  <p className="font-medium">{pdfFilename || "plan-de-vuelo.pdf"}</p>
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-400 hover:underline"
                  >
                    Ver archivo
                  </a>
                </div>
                <button
                  onClick={() => {
                    setPdfUrl("");
                    setPdfFilename("");
                  }}
                  className="text-gray-400 hover:text-red-400 transition-colors p-2"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <label className="upload-zone block">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handlePdfUpload}
                  className="hidden"
                  disabled={uploadingPdf}
                />
                {uploadingPdf ? (
                  <Loader2 className="w-8 h-8 animate-spin text-purple-500 mx-auto" />
                ) : (
                  <>
                    <FileText className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-400">Click para subir PDF</p>
                    <p className="text-sm text-gray-500 mt-1">o arrastra y suelta aquí</p>
                  </>
                )}
              </label>
            )}
          </section>

          {/* Testimonials Section */}
          <section className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <ImageIcon className="w-5 h-5 text-green-400" />
              </div>
              <h2 className="text-xl font-semibold">Testimonios / Wall of Fame</h2>
            </div>

            <p className="text-gray-400 text-sm mb-4">
              Sube capturas de pantalla de resultados y testimonios de clientes
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="relative aspect-square rounded-xl overflow-hidden group border border-zinc-700"
                >
                  <Image
                    src={testimonial.image_url}
                    alt={`Testimonio ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => moveTestimonial(index, "up")}
                      disabled={index === 0}
                      className="p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 disabled:opacity-30"
                    >
                      <GripVertical className="w-4 h-4 rotate-90" />
                    </button>
                    <button
                      onClick={() => removeTestimonial(testimonial.id)}
                      className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/40 text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveTestimonial(index, "down")}
                      disabled={index === testimonials.length - 1}
                      className="p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 disabled:opacity-30"
                    >
                      <GripVertical className="w-4 h-4 -rotate-90" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Add New */}
              <label className="aspect-square rounded-xl border-2 border-dashed border-zinc-700 hover:border-purple-500 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleTestimonialUpload}
                  className="hidden"
                  disabled={uploadingImage}
                />
                {uploadingImage ? (
                  <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
                ) : (
                  <>
                    <Plus className="w-6 h-6 text-gray-500" />
                    <span className="text-xs text-gray-500">Agregar</span>
                  </>
                )}
              </label>
            </div>
          </section>

          {/* YouTube Section */}
          <section className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <Youtube className="w-5 h-5 text-red-400" />
              </div>
              <h2 className="text-xl font-semibold">YouTube</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  URL del Canal
                </label>
                <input
                  type="url"
                  value={youtubeChannel}
                  onChange={(e) => setYoutubeChannel(e.target.value)}
                  className="input-field"
                  placeholder="https://youtube.com/@traidagency"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Embed del Video Destacado
                </label>
                <textarea
                  value={youtubeVideoEmbed}
                  onChange={(e) => setYoutubeVideoEmbed(e.target.value)}
                  className="input-field font-mono text-sm h-24"
                  placeholder='<iframe src="https://www.youtube.com/embed/VIDEO_ID" ...></iframe>'
                />
              </div>

              {youtubeVideoEmbed && (
                <div>
                  <p className="text-sm text-gray-400 mb-2">Preview:</p>
                  <div
                    className="video-container rounded-xl max-w-xl"
                    dangerouslySetInnerHTML={{ __html: youtubeVideoEmbed }}
                  />
                </div>
              )}
            </div>
          </section>

          {/* Save Button */}
          <div className="flex items-center justify-end gap-4 sticky bottom-4">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                saveStatus === "success"
                  ? "bg-green-500/20 text-green-400"
                  : saveStatus === "error"
                  ? "bg-red-500/20 text-red-400"
                  : "opacity-0"
              }`}
            >
              {saveStatus === "success" && (
                <>
                  <Check className="w-4 h-4" />
                  Guardado
                </>
              )}
              {saveStatus === "error" && (
                <>
                  <AlertCircle className="w-4 h-4" />
                  Error al guardar
                </>
              )}
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary inline-flex items-center gap-2 shadow-lg"
            >
              {saving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              GUARDAR CAMBIOS
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
