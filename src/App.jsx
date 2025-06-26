import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/routes";
import { UserProvider } from "./Components/userContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
