import { lazy } from "react";

import {
  APDashboard,
  Client,
  Employee,
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
} from "./admin/index";

import { ClientDashboard } from "./client/index";

import { Settings, ProfileTab, AppTab } from "./settings/index";

import { initialData } from "./data.json";

const Login = lazy(() => import("./Login"));
const Not_Found = lazy(() => import("./Not_Found"));
const UnAuth = lazy(() => import("./UnAuth"));
const DashBoards = lazy(() => import("./DashBoards"));

export {
  // Index Pages
  Login,
  Not_Found,
  UnAuth,
  DashBoards,
  initialData,

  // Setting Pages
  Settings,
  ProfileTab,
  AppTab,

  //  Admin Pages
  APDashboard,
  Client,
  Employee,
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

  //  Client pages
  ClientDashboard,
};
