export const logNow = (...message) => {
  const now = new Date();

  console.log(
    now.getHours() +
      ':' +
      now.getMinutes() +
      ':' +
      now.getSeconds() +
      '.' +
      now.getMilliseconds() +
      ':',
    ...message,
  );
};