export const isOutdated = (lastUpdate, expTime) => {
  const currentTime = new Date().getTime();
  return currentTime - lastUpdate > expTime;
};
