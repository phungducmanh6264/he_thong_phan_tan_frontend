import GlobalContext from "./GlobalContext";
import { useReducer } from "react";

import GlobalReducer, { GlobalState } from "./GlobalReducer";

function GlobalProvider({ children }) {
  const [state, dispath] = useReducer(GlobalReducer, GlobalState);
  return (
    <GlobalContext.Provider value={[state, dispath]}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;
