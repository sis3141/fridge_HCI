export const sleep = ms => {
  return new Promise(r => setTimeout(r, ms));
};

export const PromiseAllSettle = promiseList => {
  return Promise.all(
    promiseList.map(promise =>
      promise
        .then(value => ({status: 'fulfilled', value}))
        .catch(reason => ({status: 'rejected', reason})),
    ),
  );
};

export const DoNothing = () => {};
