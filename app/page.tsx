"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEnhancedTransition from "@/hooks/useEnhancedTransition";
import Container from "@/components/ui/Container";
import Navigation from "@/components/navigation/Navigation";
import Button from "@/components/ui/Button";
import HomeSection from "@/components/sections/HomeSection";
import ProductsSection from "@/components/sections/ProductsSection";
import AboutSection from "@/components/sections/AboutSection";
import SustainabilitySection from "@/components/sections/SustainabilitySection";
import ContactSection from "@/components/sections/ContactSection";

const LamifloraWebsite: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const sections: string[] = [
    "home",
    "products",
    "about",
    "sustainability",
    "contact",
  ];
  const sectionNames: string[] = [
    "Home",
    "Our Products",
    "About Us",
    "Sustainability",
    "Contact",
  ];

  const {
    currentSection,
    targetSection,
    isTransitioning,
    scrollProgress,
    startTransition,
    updateScrollProgress,
    getSectionStyle,
  } = useEnhancedTransition(sections.length);

  const navigateToSection = (
    index: number,
    direction?: "forward" | "backward"
  ): void => {
    if (index < 0 || index >= sections.length) return;
    setIsMenuOpen(false);

    // Determine direction if not provided
    const actualDirection =
      direction || (index > currentSection ? "forward" : "backward");

    startTransition(index);

    // Set scroll position of target section after transition based on direction
    setTimeout(() => {
      if (sectionRefs.current[index]) {
        const targetElement = sectionRefs.current[index]!;

        if (actualDirection === "backward") {
          // When going backward, start at bottom of the page
          targetElement.scrollTop =
            targetElement.scrollHeight - targetElement.clientHeight;
        } else {
          // When going forward, start at top of the page
          targetElement.scrollTop = 0;
        }
      }
    }, 900);
  };

  const nextSection = (): void => {
    if (currentSection < sections.length - 1) {
      navigateToSection(currentSection + 1, "forward");
    }
  };

  const prevSection = (): void => {
    if (currentSection > 0) {
      navigateToSection(currentSection - 1, "backward");
    }
  };

  // Enhanced scroll and navigation handling with buffer system and progress tracking
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent): void => {
      if (isTransitioning) return; // Disable during transitions

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        nextSection();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        prevSection();
      }
    };

    let scrollTimeout: NodeJS.Timeout;
    let isScrollingBetweenSections = false;
    let scrollBuffer = 0; // Buffer to accumulate scroll attempts
    let bufferTimeout: NodeJS.Timeout;
    let lastScrollDirection = 0;

    const BUFFER_THRESHOLD = 200; // Amount of scroll needed to trigger transition
    const BUFFER_DECAY_TIME = 800; // Time before buffer resets

    const resetBuffer = () => {
      scrollBuffer = 0;
      lastScrollDirection = 0;
    };

    const handleWheel = (e: WheelEvent): void => {
      if (isTransitioning || isScrollingBetweenSections) return;

      const currentSectionElement = sectionRefs.current[currentSection];
      if (!currentSectionElement) return;

      const { scrollTop, scrollHeight, clientHeight } = currentSectionElement;

      // Update scroll progress
      updateScrollProgress(scrollTop, scrollHeight, clientHeight);

      const isAtTop = scrollTop <= 5;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;
      const scrollDirection = e.deltaY > 0 ? 1 : -1;

      // Check if we're at a boundary where transition is possible
      const canScrollDown = isAtBottom && currentSection < sections.length - 1;
      const canScrollUp = isAtTop && currentSection > 0;

      if (canScrollDown || canScrollUp) {
        // At boundary - start building buffer
        e.preventDefault();

        // Reset buffer if direction changed
        if (
          lastScrollDirection !== 0 &&
          lastScrollDirection !== scrollDirection
        ) {
          resetBuffer();
        }

        lastScrollDirection = scrollDirection;
        scrollBuffer += Math.abs(e.deltaY);

        // Clear previous buffer timeout
        clearTimeout(bufferTimeout);

        // Check if buffer threshold is reached
        if (scrollBuffer >= BUFFER_THRESHOLD) {
          // Enough scrolling - trigger transition
          isScrollingBetweenSections = true;
          resetBuffer();

          if (scrollDirection > 0 && canScrollDown) {
            nextSection();
          } else if (scrollDirection < 0 && canScrollUp) {
            prevSection();
          }

          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            isScrollingBetweenSections = false;
          }, 1000);
        } else {
          // Not enough scrolling yet - set decay timer
          bufferTimeout = setTimeout(resetBuffer, BUFFER_DECAY_TIME);
        }
      } else {
        // Not at boundary - reset buffer and allow normal scrolling
        resetBuffer();
      }
    };

    // Listen for scroll events to update progress bar
    const handleScroll = () => {
      if (isTransitioning) return;

      const currentSectionElement = sectionRefs.current[currentSection];
      if (currentSectionElement) {
        const { scrollTop, scrollHeight, clientHeight } = currentSectionElement;
        updateScrollProgress(scrollTop, scrollHeight, clientHeight);
      }
    };

    // Add scroll listeners to all section elements
    const addScrollListeners = () => {
      sectionRefs.current.forEach((element, index) => {
        if (element && index === currentSection) {
          element.addEventListener("scroll", handleScroll, { passive: true });
        }
      });
    };

    const removeScrollListeners = () => {
      sectionRefs.current.forEach((element) => {
        if (element) {
          element.removeEventListener("scroll", handleScroll);
        }
      });
    };

    addScrollListeners();

    let touchStartY = 0;
    let touchStartX = 0;
    let isTouchNavigation = false;
    let touchScrollBuffer = 0;
    let touchBufferTimeout: NodeJS.Timeout;
    let lastTouchDirection = 0;

    const TOUCH_BUFFER_THRESHOLD = 200; // Higher threshold for touch
    const TOUCH_BUFFER_DECAY_TIME = 1000;

    const resetTouchBuffer = () => {
      touchScrollBuffer = 0;
      lastTouchDirection = 0;
    };

    const handleTouchStart = (e: TouchEvent): void => {
      if (isTransitioning) return;
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
      isTouchNavigation = false;
    };

    const handleTouchMove = (e: TouchEvent): void => {
      if (isTransitioning || isTouchNavigation) return;

      const currentSectionElement = sectionRefs.current[currentSection];
      if (!currentSectionElement) return;

      const { scrollTop, scrollHeight, clientHeight } = currentSectionElement;
      const isAtTop = scrollTop <= 5;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;

      const touchCurrentY = e.touches[0].clientY;
      const touchCurrentX = e.touches[0].clientX;
      const deltaY = touchStartY - touchCurrentY;
      const deltaX = touchStartX - touchCurrentX;
      const touchDirection = deltaY > 0 ? 1 : -1;

      // Check if it's primarily a vertical gesture
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 20) {
        const canScrollDown =
          isAtBottom && currentSection < sections.length - 1;
        const canScrollUp = isAtTop && currentSection > 0;

        if (canScrollDown || canScrollUp) {
          e.preventDefault();

          // Reset buffer if direction changed
          if (
            lastTouchDirection !== 0 &&
            lastTouchDirection !== touchDirection
          ) {
            resetTouchBuffer();
          }

          lastTouchDirection = touchDirection;
          touchScrollBuffer += Math.abs(deltaY);

          clearTimeout(touchBufferTimeout);

          if (touchScrollBuffer >= TOUCH_BUFFER_THRESHOLD) {
            // Enough touch movement - trigger transition
            isTouchNavigation = true;
            resetTouchBuffer();

            if (touchDirection > 0 && canScrollDown) {
              nextSection();
            } else if (touchDirection < 0 && canScrollUp) {
              prevSection();
            }
          } else {
            // Set decay timer for touch buffer
            touchBufferTimeout = setTimeout(
              resetTouchBuffer,
              TOUCH_BUFFER_DECAY_TIME
            );
          }
        } else {
          resetTouchBuffer();
        }
      }
    };

    const handleTouchEnd = (): void => {
      // Reset touch tracking
      setTimeout(() => {
        isTouchNavigation = false;
      }, 100);
    };

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      removeScrollListeners();
      clearTimeout(scrollTimeout);
      clearTimeout(bufferTimeout);
      clearTimeout(touchBufferTimeout);
    };
  }, [
    currentSection,
    isTransitioning,
    updateScrollProgress,
    nextSection,
    prevSection,
    sections.length,
  ]);

  return (
    <Container.Main>
      <Navigation
        currentSection={currentSection}
        sectionNames={sectionNames}
        onNavigate={navigateToSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollProgress={scrollProgress}
      />

      {/* WhatsApp Chat Button */}
      <a
        href="https://wa.me/254722667154"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          {/* Hover tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Chat with us on WhatsApp
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
          </div>

          {/* WhatsApp Button */}
          <div className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group-hover:animate-pulse">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="white"
              className="transition-transform duration-300"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.891 3.594z" />
            </svg>
          </div>
        </div>
      </a>

      {/* Sections Container */}
      <div className="h-full relative overflow-hidden">
        <HomeSection
          sectionRef={(el: HTMLElement | null) => (sectionRefs.current[0] = el)}
          onNavigate={navigateToSection}
          isVisible={
            currentSection === 0 || (isTransitioning && targetSection === 0)
          }
          {...getSectionStyle(0)}
        />

        <ProductsSection
          sectionRef={(el: HTMLElement | null) => (sectionRefs.current[1] = el)}
          isVisible={
            currentSection === 1 || (isTransitioning && targetSection === 1)
          }
          {...getSectionStyle(1)}
        />

        <AboutSection
          sectionRef={(el: HTMLElement | null) => (sectionRefs.current[2] = el)}
          isVisible={
            currentSection === 2 || (isTransitioning && targetSection === 2)
          }
          {...getSectionStyle(2)}
        />

        <SustainabilitySection
          sectionRef={(el: HTMLElement | null) => (sectionRefs.current[3] = el)}
          isVisible={
            currentSection === 3 || (isTransitioning && targetSection === 3)
          }
          {...getSectionStyle(3)}
        />

        <ContactSection
          sectionRef={(el: HTMLElement | null) => (sectionRefs.current[4] = el)}
          onNavigate={navigateToSection}
          isVisible={
            currentSection === 4 || (isTransitioning && targetSection === 4)
          }
          {...getSectionStyle(4)}
        />
      </div>

      {/* Section Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-lg">
        <span className="text-sm font-medium text-gray-700">
          {sectionNames[currentSection]} ({currentSection + 1}/{sections.length}
          )
          {isTransitioning && (
            <span className="ml-2 text-blue-600 animate-pulse">
              Transitioning...
            </span>
          )}
        </span>
      </div>
    </Container.Main>
  );
};

export default LamifloraWebsite;
