export const initialStore = { user: null };

export const reducer = (state, dispatch) => {
  switch (dispatch.type) {
    case "SET_USER":
      return {
        ...state,
        ...dispatch.payload,
      };
    case "REMOVE_USER":
      return initialStore;
    default:
      return initialStore;
  }
};
