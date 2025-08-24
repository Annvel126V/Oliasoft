export const sortByName = (arr, key) => {
  if (!Array.isArray(arr)) return [];
  return [...arr].sort((a, b) => {
    const valA = key ? a[key] : a;
    const valB = key ? b[key] : b;
    return String(valA).localeCompare(String(valB));
  });
};
