import "./App.css";

import React,{useContext} from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { useRoutes } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import routes from "./routes";
import theme from "./theme/theme";
import {UserContext} from "./contexts/userContext";
function App() {
  const {auth,loading,user} = useContext(UserContext);
  const routing = useRoutes(routes(auth,loading,user));


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loading ? routing : <p>Loading....</p> }
    </ThemeProvider>
  );
}
export default App;
