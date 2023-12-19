const reducer = (state = "", action) => {
  switch (action.type) {
    case "FILTER":
      return action.payload;
    default:
      return state;
  }
};

export const setFilter = (filter) => {
  return {
    type: "FILTER",
    payload: filter,
  };
};

export const selectFilter = (state) => state.filter;

export default reducer;
