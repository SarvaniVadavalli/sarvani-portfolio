import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Ordered list of portfolio sections for the fullscreen navigation model.
 * Note: Experience section removed completely per Phase 6.0A specifications.
 */
export const SECTIONS = [
  { id: 'landing', index: 0, num: '00', label: 'LANDING', title: 'PORTFOLIO ENTRY' },
  { id: 'hero', index: 1, num: '01', label: 'HERO', title: 'IDENTITY & PROFILE' },
  { id: 'center-flow', index: 2, num: '02', label: 'CENTER FLOW', title: 'NAVIGATION HUB' },
  { id: 'about', index: 3, num: '03', label: 'ABOUT', title: 'PERSONAL & EDUCATION' },
  { id: 'capabilities', index: 4, num: '04', label: 'CAPABILITIES', title: 'TECHNICAL INDEX' },
  { id: 'projects', index: 5, num: '05', label: 'PROJECTS', title: 'PROJECT ARCHIVE' },
  { id: 'achievements', index: 6, num: '06', label: 'ACHIEVEMENTS', title: 'KEY HIGHLIGHTS' },
  { id: 'contact', index: 7, num: '07', label: 'CONTACT', title: 'DIRECT CHANNELS' },
];

/**
 * Custom hook for managing centralized fullscreen section navigation.
 * Handles input gestures (wheel, touch swipe, keyboard) with input locking to prevent section skipping.
 */
export function useSectionNavigation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState('next'); // 'next' | 'prev'

  const activeIndexRef = useRef(activeIndex);
  const isTransitioningRef = useRef(isTransitioning);
  const touchStartYRef = useRef(0);
  const lockTimeoutRef = useRef(null);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    isTransitioningRef.current = isTransitioning;
  }, [isTransitioning]);

  /**
   * Main transition trigger to navigate to a specific section index.
   */
  const goToSection = useCallback((targetIndex) => {
    if (isTransitioningRef.current) return;
    if (targetIndex < 0 || targetIndex >= SECTIONS.length) return;
    if (targetIndex === activeIndexRef.current) return;

    const currentIdx = activeIndexRef.current;
    const navDirection = targetIndex > currentIdx ? 'next' : 'prev';

    setPrevIndex(currentIdx);
    setActiveIndex(targetIndex);
    setDirection(navDirection);
    setIsTransitioning(true);
    isTransitioningRef.current = true;

    // Lock navigation during transition duration (~650ms)
    if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
    lockTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
      isTransitioningRef.current = false;
    }, 650);
  }, []);

  const nextSection = useCallback(() => {
    goToSection(activeIndexRef.current + 1);
  }, [goToSection]);

  const previousSection = useCallback(() => {
    goToSection(activeIndexRef.current - 1);
  }, [goToSection]);

  /**
   * Attach global gesture event listeners for wheel, touch, and keyboard.
   */
  useEffect(() => {
    // Helper to check if event target is an interactive form element
    const isInteractiveElement = (target) => {
      if (!target) return false;
      const tagName = target.tagName?.toUpperCase();
      return (
        ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(tagName) ||
        target.isContentEditable ||
        target.closest?.('[data-no-section-nav]')
      );
    };

    // Helper to check if active section container can scroll internally
    const canScrollContainer = (deltaY, target) => {
      // Find nearest scrollable container or active section container
      const container =
        target?.closest?.('.overflow-y-auto') ||
        document.querySelector('[data-active-section="true"]');

      if (!container) return false;

      const { scrollTop, scrollHeight, clientHeight } = container;
      const isScrollable = scrollHeight > clientHeight + 10;

      if (!isScrollable) return false; // Content fits completely, trigger section transition

      if (deltaY > 0) {
        // Scrolling DOWN
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 15;
        return !isAtBottom; // If not at bottom, allow internal scroll
      } else if (deltaY < 0) {
        // Scrolling UP
        const isAtTop = scrollTop <= 15;
        return !isAtTop; // If not at top, allow internal scroll
      }

      return false;
    };

    // 1. Mouse Wheel / Trackpad Handler
    const handleWheel = (e) => {
      if (isTransitioningRef.current) return;
      if (isInteractiveElement(e.target)) return;

      // Filter out tiny drift/micro-movements
      if (Math.abs(e.deltaY) < 20) return;

      // Check if internal container can scroll before section transition
      if (canScrollContainer(e.deltaY, e.target)) return;

      if (e.deltaY > 0) {
        nextSection();
      } else {
        previousSection();
      }
    };

    // 2. Touch Swipe Handler for Mobile
    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = (e) => {
      if (isTransitioningRef.current) return;
      if (isInteractiveElement(e.target)) return;
      if (!e.changedTouches || e.changedTouches.length === 0) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartYRef.current - touchEndY;

      // Minimum swipe threshold (50px) to prevent accidental triggers
      if (Math.abs(deltaY) < 50) return;

      // Check if internal container can scroll before section transition
      if (canScrollContainer(deltaY, e.target)) return;

      if (deltaY > 0) {
        nextSection();
      } else {
        previousSection();
      }
    };

    // 3. Keyboard Arrow / Page Navigation Handler
    const handleKeyDown = (e) => {
      if (isTransitioningRef.current) return;
      if (isInteractiveElement(e.target)) return;

      const deltaY =
        ['ArrowDown', 'PageDown'].includes(e.key) ? 100 :
        ['ArrowUp', 'PageUp'].includes(e.key) ? -100 : 0;

      if (deltaY !== 0 && canScrollContainer(deltaY, e.target)) {
        // Let native scrolling handle container scroll
        return;
      }

      switch (e.key) {
        case 'Enter':
        case 'NumpadEnter':
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          nextSection();
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          previousSection();
          break;
        case 'Home':
          e.preventDefault();
          goToSection(0);
          break;
        case 'End':
          e.preventDefault();
          goToSection(SECTIONS.length - 1);
          break;
        default:
          break;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
      if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
    };
  }, [nextSection, previousSection, goToSection]);

  return {
    sections: SECTIONS,
    activeIndex,
    prevIndex,
    isTransitioning,
    direction,
    goToSection,
    nextSection,
    previousSection,
    activeSection: SECTIONS[activeIndex],
  };
}
