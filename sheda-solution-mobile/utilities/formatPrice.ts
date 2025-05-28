export const formatPrice = (num: number): string => {
    if (num >= 1_000_000_000) {
      return `${(num / 1_000_000_000).toFixed(2)}b`; // e.g., 1,500,000,000 → 1.50b
    } else if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed()}m`; // e.g., 75,000,000 → 75.00m
    } else if (num >= 1_000) {
      return `${(num / 1_000).toFixed(2)}k`; // e.g., 100,000 → 100.00k
    }
    return num.toString(); // e.g., 500 → 500
  };