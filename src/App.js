import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useGlobal } from "@hooks";
import { useEffect } from "react";
import Page404 from "@pages/page404/Page404";
import PageInit from "@pages/pageInit/PageInit";
function App() {
  const [global, setGLB] = useGlobal();

  useEffect(() => {
    console.log(global.user);
  }, [global]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="">
          <Route path="" element={<PageInit />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
