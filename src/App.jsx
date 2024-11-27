import React, { Suspense, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  Login,
  Not_Found,
  UnAuth,
  Client,
  Employee,
  Settings,
  AddClient,
  AddEmployee,
  EditClient,
  EditEmployee,
  ViewClient,
  ViewEmployee,
  Events,
  AddEvent,
  ViewEvent,
  EditEvent,
  initialData,
  ProfileTab,
  DashBoards,
  AppTab,
} from "./pages";
import { RequireAuth, PersistenceAuth, Loader } from "./components/index";
import { Tooltip } from "react-tooltip";
import { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { getContryApi } from "./redux/server/other_api";
const initialImage = initialData[0].initialImage;

function App() {
  const role = {
    Admin: "admin",
    Employee: "employee",
    Client: "client",
  };

  const url = "/crm_project";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContryApi());
  }, [dispatch]);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path={`${url}/login`} element={<Login />} />
        <Route path={`${url}/unAuthorized`} element={<UnAuth />} />
        <Route path={`${url}/*`} element={<Not_Found />} />

        <Route element={<PersistenceAuth />}>
          <Route
            element={
              <RequireAuth
                roleAccess={[role.Admin, role.Employee, role.Client]}
              />
            }
          >
            <Route path="/crm_project/" element={<DashBoards role={role} />} />
            <Route path={`${url}/settings/`} element={<Settings />}>
              <Route index element={<ProfileTab />} />
              <Route path="profile" element={<ProfileTab />} />
              <Route path="app_settings" element={<AppTab />} />
            </Route>
          </Route>

          <Route element={<RequireAuth roleAccess={[role.Admin]} />}>
            {/* Clients Start */}
            <Route path={`${url}/clients/`}>
              <Route index element={<Client />} />
              <Route
                path=":id"
                element={<ViewClient intialImage={initialImage} />}
              />
              <Route
                path="add"
                element={<AddClient intialImage={initialImage} />}
              />
              <Route path=":id/edit" element={<EditClient />} />
            </Route>
            {/* Clients End */}

            {/* Emplyees Start */}
            <Route path={`${url}/employees/`}>
              <Route index element={<Employee />} />
              <Route
                path=":id"
                element={<ViewEmployee intialImage={initialImage} />}
              />
              <Route
                path="add"
                element={<AddEmployee intialImage={initialImage} />}
              />
              <Route path=":id/edit" element={<EditEmployee />} />
            </Route>
            {/* Emplyees End */}
          </Route>

          <Route
            element={<RequireAuth roleAccess={[role.Admin, role.Employee]} />}
          >
            {/* Events Start */}
            <Route path={`${url}/events/`}>
              <Route index element={<Events />} />
              <Route path="create" element={<AddEvent />} />
              <Route path=":userId/:id/edit" element={<EditEvent />} />
              <Route path=":userId/:id" element={<ViewEvent />} />
            </Route>
            {/* Events End */}
          </Route>
        </Route>
      </Routes>
      <Toaster position="top-right" />
      <Tooltip id="my-tooltip" className="z-50" />
    </Suspense>
  );
}

export default App;
