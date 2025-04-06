// plugins/scroll-animation.client.js

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("scroll-animation", {
    mounted(el, binding) {
      // Get options from binding value or use defaults
      const options = {
        threshold: 0.1,
        delay: 0,
        duration: 0.8,
        translateX: 0,
        translateY: 0,
        opacity: true,
        ...binding.value,
      };

      // Fix for horizontal scrolling - use will-change and overflow-x
      const parentEl = el.parentElement;
      if (parentEl) {
        // Only set if not already set to avoid overriding existing styles
        if (!parentEl.style.overflowX) {
          parentEl.style.overflowX = "hidden";
          parentEl.style.overflowY = "hidden";
        }
      }

      // Apply initial styles
      el.style.opacity = options.opacity ? "0" : "1";
      el.style.transform = `translateX(${options.translateX}px) translateY(${options.translateY}px)`;
      el.style.transition = `opacity ${options.duration}s ease ${options.delay}s, transform ${options.duration}s ease ${options.delay}s`;
      el.style.willChange = "opacity, transform";

      // Create observer with improved configuration
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;

          // Simplified condition - just check if it's intersecting
          // This works for both scrolling down and up
          if (entry.isIntersecting) {
            // Add small delay to ensure transition happens
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateX(0) translateY(0)";
            }, 10);

            // Once it's visible, we can stop observing
            observer.unobserve(el);
          }
        },
        {
          threshold: options.threshold,
          rootMargin: options.rootMargin,
        }
      );

      // Wait for the DOM to be fully ready
      setTimeout(() => {
        observer.observe(el);
      }, 100);

      // Store the observer on the element to clean up later
      el._scrollAnimation = observer;
    },
    unmounted(el) {
      // Clean up observer when element is unmounted
      if (el._scrollAnimation) {
        el._scrollAnimation.unobserve(el);
      }
    },
  });
});
