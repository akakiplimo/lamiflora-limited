import { useCallback, useRef, useState } from "react";

// Enhanced transition system with scroll progress tracking and proper direction handling
const useEnhancedTransition = (totalSections: number) => {
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [targetSection, setTargetSection] = useState<number>(0);
  const [transitionProgress, setTransitionProgress] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startTransition = useCallback(
    (newTargetSection: number, smooth: boolean = true) => {
      if (newTargetSection === currentSection) return;

      setIsTransitioning(true);
      setTargetSection(newTargetSection);

      if (smooth) {
        // Smooth transition
        const startTime = Date.now();
        const duration = 800;
        const startProgress = 0;
        const endProgress = 100;

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Easing function
          const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);
          const easedProgress = easeOutCubic(progress);

          setTransitionProgress(
            startProgress + (endProgress - startProgress) * easedProgress
          );

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setCurrentSection(newTargetSection);
            setTargetSection(newTargetSection);
            setTransitionProgress(0);
            setIsTransitioning(false);
            // Reset scroll progress when section changes
            setScrollProgress(0);
          }
        };

        requestAnimationFrame(animate);
      } else {
        // Instant transition
        setCurrentSection(newTargetSection);
        setTargetSection(newTargetSection);
        setTransitionProgress(0);
        setIsTransitioning(false);
        setScrollProgress(0);
      }
    },
    [currentSection]
  );

  const updateScrollProgress = useCallback(
    (scrollTop: number, scrollHeight: number, clientHeight: number) => {
      if (scrollHeight <= clientHeight) {
        // No scrollable content
        setScrollProgress(0);
      } else {
        // Calculate scroll percentage
        const maxScroll = scrollHeight - clientHeight;
        const progress = Math.max(
          0,
          Math.min(100, (scrollTop / maxScroll) * 100)
        );
        setScrollProgress(progress);
      }
    },
    []
  );

  const getSectionStyle = (sectionIndex: number) => {
    if (!isTransitioning) {
      // Normal state - only current section visible
      return {
        translateX:
          sectionIndex === currentSection
            ? 0
            : sectionIndex > currentSection
            ? 100
            : -100,
        opacity: sectionIndex === currentSection ? 1 : 0,
      };
    }

    // During transition - only show current and target sections
    const progress = transitionProgress / 100;
    const direction = targetSection > currentSection ? 1 : -1; // 1 for forward, -1 for backward

    if (sectionIndex === currentSection) {
      // Current section moving out
      return {
        translateX: -direction * progress * 100,
        opacity: Math.max(0, 1 - progress),
      };
    } else if (sectionIndex === targetSection) {
      // Target section moving in
      return {
        translateX: direction * (100 - progress * 100),
        opacity: Math.min(1, progress),
      };
    } else {
      // All other sections - completely hidden
      return {
        translateX: sectionIndex > currentSection ? 100 : -100,
        opacity: 0,
      };
    }
  };

  return {
    currentSection,
    targetSection,
    isTransitioning,
    scrollProgress,
    startTransition,
    updateScrollProgress,
    getSectionStyle,
  };
};

export default useEnhancedTransition;
