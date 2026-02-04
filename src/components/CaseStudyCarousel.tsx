"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

interface CaseStudy {
  id: number;
  icon: string;
  iconBg: string;
  title: string;
  caseNumber: string;
  description: string;
  tags: string[];
  statValue: string;
  statLabel: string;
  dashboardUrl: string;
}

interface CaseStudyCarouselProps {
  cases: CaseStudy[];
  autoPlayInterval?: number;
}

export function CaseStudyCarousel({
  cases,
  autoPlayInterval = 4000
}: CaseStudyCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const checkScrollability = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    setCanScrollLeft(carousel.scrollLeft > 0);
    setCanScrollRight(
      carousel.scrollLeft < carousel.scrollWidth - carousel.clientWidth - 10
    );
  }, []);

  const scroll = useCallback((direction: "left" | "right") => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const cardWidth = 336; // 320px card + 16px gap
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;

    carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }, []);

  // Auto-play
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      const carousel = carouselRef.current;
      if (!carousel) return;

      // Si llegamos al final, volvemos al inicio
      if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth - 10) {
        carousel.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scroll("right");
      }
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isHovered, autoPlayInterval, scroll]);

  // Check scrollability on mount and scroll
  useEffect(() => {
    checkScrollability();
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.addEventListener("scroll", checkScrollability);
    window.addEventListener("resize", checkScrollability);

    return () => {
      carousel.removeEventListener("scroll", checkScrollability);
      window.removeEventListener("resize", checkScrollability);
    };
  }, [checkScrollability]);

  return (
    <div
      className="case-study-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Flecha izquierda */}
      <button
        onClick={() => scroll("left")}
        className={`carousel-arrow carousel-arrow-left ${!canScrollLeft ? "carousel-arrow-disabled" : ""}`}
        disabled={!canScrollLeft}
        aria-label="Anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Carrusel */}
      <div
        ref={carouselRef}
        className="case-study-carousel"
      >
        {cases.map((caso) => (
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

      {/* Flecha derecha */}
      <button
        onClick={() => scroll("right")}
        className={`carousel-arrow carousel-arrow-right ${!canScrollRight ? "carousel-arrow-disabled" : ""}`}
        disabled={!canScrollRight}
        aria-label="Siguiente"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
