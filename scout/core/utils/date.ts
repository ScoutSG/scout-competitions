export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const ONE_DAY = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

export const daysLeft = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();

  return Math.round((date.getTime() - now.getTime()) / ONE_DAY);
};
