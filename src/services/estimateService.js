export const fetchEstimateData = async () => {
  const response = await fetch("/Estimate_detail.json");
  const data = await response?.json();
  return data?.data?.sections || [];
};
