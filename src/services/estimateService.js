export const fetchEstimateData = async () => {
  const response = await fetch(
    `${process.env.PUBLIC_URL}/Estimate_detail.json`
  );
  const data = await response?.json();
  return data?.data?.sections || [];
};
