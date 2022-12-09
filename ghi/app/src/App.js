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
import AppointmentList from "./AppointmentList";
import CreateAppointment from "./CreateAppointment";
import AppointmentsByVin from "./AppointmentsByVin";
import CreateSalesPerson from "./CreateSalesPerson";
import SalesPersonList from "./SalespeopleList";
import SalesCustomerList from "./SalesCustomerList";
import CreateSalesCustomer from "./CreateSalesCustomer";
import SalesRecordList from "./SalesRecordList";
import CreateSalesRecord from "./CreateSalesRecord";
import SalesPersonSales from "./SalesPersonSales";

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
          <Route path="appointments">
            <Route index element={<AppointmentList />} />
            <Route path="new" element={<CreateAppointment />} />
            <Route path="vin" element={<AppointmentsByVin />} />
          </Route>
          <Route path="salespeople">
            <Route index element={<SalesPersonList />} />
            <Route path="new" element={<CreateSalesPerson />} />
          </Route>
          <Route path="salescustomer">
            <Route index element={<SalesCustomerList />} />
            <Route path="new" element={<CreateSalesCustomer />} />
          </Route>
          <Route path="salesrecord">
            <Route index element={<SalesRecordList />} />
            <Route path="new" element={<CreateSalesRecord />} />
            <Route path="filter" element={<SalesPersonSales />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
