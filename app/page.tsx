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

      {/* Navigation Arrows */}
      {currentSection > 0 && !isTransitioning && (
        <Button.Secondary
          onClick={() => navigateToSection(currentSection - 1, "backward")}
          className="fixed left-8 top-1/2 transform -translate-y-1/2 z-40"
        >
          <ChevronLeft size={24} className="text-gray-700" />
        </Button.Secondary>
      )}

      {currentSection < sections.length - 1 && !isTransitioning && (
        <button
          onClick={() => navigateToSection(currentSection + 1, "forward")}
          className="fixed right-8 bottom-8 z-40 w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <ChevronRight size={24} className="text-white" />
        </button>
      )}

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
