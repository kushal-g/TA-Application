const formatSeconds = (seconds) => {
  if (isNaN(seconds)) return 0;

  const hours = Math.floor(seconds / (60 * 60));
  let secondsLeft = seconds - hours * 60 * 60;
  let minutes = Math.floor(secondsLeft / 60);
  secondsLeft = secondsLeft - minutes * 60;
  seconds = Math.floor(secondsLeft);

  return `${hours} hr ${minutes} min ${seconds} s`;
};

module.exports = formatSeconds;
