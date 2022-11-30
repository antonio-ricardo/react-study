export const converMinutesInHoursString = (minutesToConvert: number) => {
  const hours = Math.floor(minutesToConvert / 60);
  const minutes = minutesToConvert % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
};
