export default (filterValue = []) =>
  ({ participants }) =>
    filterValue.every((v) => participants.includes(v));
