import { lazy } from "react";

const Settings = lazy(() => import("./settings"));
const ProfileTab = lazy(() => import("./ProfileTab"));
const AppTab = lazy(() => import("./AppTab"));

export { Settings, ProfileTab, AppTab };
