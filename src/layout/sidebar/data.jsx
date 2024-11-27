import {
  FaCalendar,
  FaDashcube,
  FaGear,
  FaUserFriends,
  FaUsers,
} from "../../components/icons";

const url = "/crm"

export const admin = [
  {
    id: 1,
    icon: <FaDashcube />,
    value: "Dashboard",
    subMenu: [
      {
        id: 1,
        value: "Private Dashboard",
        link: `${url}/`,
      },
    ],
  },
  {
    id: 2,
    icon: <FaUserFriends />,
    value: "Clients",
    link: `${url}/clients`,
  },
  {
    id: 3,
    icon: <FaUsers />,
    value: "Employees",
    link: `${url}/employees`,
  },
  {
    id: 4,
    icon: <FaCalendar />,
    value: "Events",
    link: `${url}/events`,
  },
  {
    id: 5,
    icon: <FaGear />,
    value: "Settings",
    link: `${url}/settings`,
  },
];

export const client = [
  {
    id: 1,
    icon: <FaDashcube />,
    value: "Dashboard",
    link: `${url}/`,
  },
  {
    id: 2,
    icon: <FaGear />,
    value: "Settings",
    link: `${url}/settings`,
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
        link: `${url}/`,
      },
    ],
  },
  {
    id: 2,
    icon: <FaCalendar />,
    value: "Events",
    link: `${url}/events`,
  },
  {
    id: 3,
    icon: <FaGear />,
    value: "Settings",
    link: `${url}/settings`,
  },
];
