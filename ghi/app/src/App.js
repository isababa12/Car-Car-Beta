import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ManufacturerList from "./ManufacturerList";
import CreateManufacturer from "./CreateManufacturer";
import ModelList from "./ModelList";
import CreateModel from "./CreateModel";
import AutomobileList from "./AutomobileList";
import CreateAutomobile from "./CreateAutomobile";
import TechnicianList from "./TechnicianList";
import CreateTechnician from "./CreateTechnician";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers">
            <Route index element={<ManufacturerList />} />
            <Route path="new" element={<CreateManufacturer />} />
          </Route>
          <Route path="models">
            <Route index element={<ModelList />} />
            <Route path="new" element={<CreateModel />} />
          </Route>
          <Route path="automobiles">
            <Route index element={<AutomobileList />} />
            <Route path="new" element={<CreateAutomobile />} />
          </Route>
          <Route path="technicians">
            <Route index element={<TechnicianList />} />
            <Route path="new" element={<CreateTechnician />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
