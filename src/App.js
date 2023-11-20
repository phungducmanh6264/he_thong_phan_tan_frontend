import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useGlobal } from "@hooks";
import { useEffect } from "react";
import Page404 from "@pages/page404/Page404";
import PageInit from "@pages/pageInit/PageInit";
import HomePage from "@pages/homePage/HomePage";
function App() {
  const [uGlobal, sUGlobal] = useGlobal();

  return (
    <BrowserRouter>
      <Routes>
        {uGlobal?.status === 1 ? (
          <Route path="">
            <Route path="" element={<HomePage />} />
            <Route path="*" element={<Page404 />} />
          </Route>
        ) : (
          <Route path="">
            <Route path="" element={<PageInit />} />
            <Route path="*" element={<Page404 />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
