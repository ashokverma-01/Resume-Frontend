// utils/helpers.js

/**
 * Safely parses a JSON field into an array.
 * Returns an empty array if the input is null, invalid, or not an array.
 * @param {any} field - The field to parse
 * @returns {Array} - Parsed array or []
 */
export const parseJSONField = (field) => {
  if (!field) return [];
  if (typeof field === "string") {
    try {
      const parsed = JSON.parse(field);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return Array.isArray(field) ? field : [];
};

/**
 * Converts a date input to "YYYY-MM" string format.
 * Accepts numbers (year), strings (date string or YYYY-MM), or Date objects.
 * Returns empty string if input is invalid.
 * @param {string|number|Date} date
 * @returns {string} - formatted date "YYYY-MM"
 */
export const toMonthString = (date) => {
  if (!date) return "";

  if (typeof date === "number") {
    return `${date}-01`; // 2021 → 2021-01
  }

  if (typeof date === "string") {
    const d = new Date(date);
    if (!isNaN(d)) {
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${year}-${month}`;
    }

    if (/^\d{4}-\d{2}$/.test(date)) return date; // already YYYY-MM
    return ""; // fallback
  }

  if (date instanceof Date && !isNaN(date)) {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}`;
  }

  return "";
};
