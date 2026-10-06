import { useEffect, useRef } from 'react';

/**
 * Custom hook to enable infinite scrolling using IntersectionObserver.
 *
 * @param {Object} options
 * @param {boolean} options.isLoading - Indicates if a page is currently being loaded
 * @param {boolean} options.hasMore - Whether additional pages exist to fetch
 * @param {Function} options.onLoadMore - Callback invoked when the sentinel intersects viewport
 * @param {boolean} [options.enabled=true] - Whether infinite scrolling is currently active
 * @param {string} [options.rootMargin='200px'] - Pre-load margin before reaching exact bottom
 * @returns {React.MutableRefObject} Ref to attach to the sentinel DOM element
 */
export const useInfiniteScroll = ({
  isLoading,
  hasMore,
  onLoadMore,
  enabled = true,
  rootMargin = '250px',
}) => {
  const sentinelRef = useRef(null);
  const isFetchingRef = useRef(false);

  // Keep track of active fetch to prevent duplicate triggers
  useEffect(() => {
    isFetchingRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    // If infinite scroll is toggled off, or no more items, do nothing
    if (!enabled || !hasMore) {
      return;
    }

    const currentSentinel = sentinelRef.current;
    if (!currentSentinel) {
      return;
    }

    // Create IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // Trigger load only when visible, not currently loading, and more items exist
        if (entry.isIntersecting && !isFetchingRef.current && hasMore) {
          isFetchingRef.current = true;
          onLoadMore();
        }
      },
      {
        root: null, // viewport
        rootMargin,
        threshold: 0.1,
      }
    );

    observer.observe(currentSentinel);

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
      observer.disconnect();
    };
  }, [enabled, hasMore, onLoadMore, rootMargin]);

  return sentinelRef;
};

export default useInfiniteScroll;
