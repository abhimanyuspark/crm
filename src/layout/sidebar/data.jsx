import {
  FaCalendar,
  FaDashcube,
  FaGear,
  FaUserFriends,
  FaUsers,
} from "../../components/icons";

export const admin = [
  {
    id: 1,
    icon: <FaDashcube />,
    value: "Dashboard",
    subMenu: [
      {
        id: 1,
        value: "Private Dashboard",
        link: "/crm_project/",
      },
    ],
  },
  {
    id: 2,
    icon: <FaUserFriends />,
    value: "Clients",
    link: "/crm_project/clients",
  },
  {
    id: 3,
    icon: <FaUsers />,
    value: "Employees",
    link: "/crm_project/employees",
  },
  {
    id: 4,
    icon: <FaCalendar />,
    value: "Events",
    link: "/crm_project/events",
  },
  {
    id: 5,
    icon: <FaGear />,
    value: "Settings",
    link: "/crm_project/settings",
  },
];

export const client = [
  {
    id: 1,
    icon: <FaDashcube />,
    value: "Dashboard",
    link: "/crm_project/",
  },
  {
    id: 2,
    icon: <FaGear />,
    value: "Settings",
    link: "/crm_project/settings",
  },
];

export const employee = [
  {
    id: 1,
    icon: <FaDashcube />,
    value: "Dashboard",
    subMenu: [
      {
        id: 1,
        value: "Private Dashboard",
        link: "/crm_project/",
      },
    ],
  },
  {
    id: 2,
    icon: <FaCalendar />,
    value: "Events",
    link: "/crm_project/events",
  },
  {
    id: 3,
    icon: <FaGear />,
    value: "Settings",
    link: "/crm_project/settings",
  },
];
