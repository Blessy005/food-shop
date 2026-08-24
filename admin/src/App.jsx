import { BrowserRouter } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";

import "./styles/variables.css";
import "./styles/admin.css";



function App() {
  return (
    <BrowserRouter>
      <AdminRoutes />
    </BrowserRouter>
  );
}

export default App;