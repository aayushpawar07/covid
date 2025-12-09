// Format any number with commas (10000 -> 10,000)
export const formatNumber = (num) => {
  if (num === null || num === undefined) return "-";
  return num.toLocaleString();
};

// Format date like "2020-01-05" -> "5 Jan 2020"
export const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// Calculate death ratio (deaths / recovered)
export const calcDeathRatio = (deaths, recovered) => {
  if (!recovered || recovered === 0) return 0;
  return (deaths / recovered).toFixed(2);
};

// Sort array by field
export const sortByField = (data, field, order = "asc") => {
  return data.slice().sort((a, b) => {
    if (order === "asc") return a[field] > b[field] ? 1 : -1;
    return a[field] < b[field] ? 1 : -1;
  });
};

// Filter by search keyword (case insensitive)
export const searchFilter = (data, field, keyword) => {
  if (!keyword) return data;
  return data.filter((item) =>
    item[field].toString().toLowerCase().includes(keyword.toLowerCase())
  );
};
