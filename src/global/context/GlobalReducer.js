const GlobalState = {};

function GlobalReducer(state, callBack) {
  return callBack(state);
}

export default GlobalReducer;
export { GlobalState };
