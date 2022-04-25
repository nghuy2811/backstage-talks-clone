import { useEffect } from "react";

import Issues from "./components/issues";

function App() {
  useEffect(() => {
    document.title = "Backstage Talks Magazine";
    document.body.style.transition = "background-color 500ms ease-out";
  }, []);

  return <Issues />;
}

export default App;
