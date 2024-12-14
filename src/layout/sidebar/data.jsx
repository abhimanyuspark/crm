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
        link: `/`,
      },
    ],
  },
  {
    id: 2,
    icon: <FaUserFriends />,
    value: "Clients",
    link: `/clients`,
  },
  {
    id: 3,
    icon: <FaUsers />,
    value: "Employees",
    link: `/employees`,
  },
  {
    id: 4,
    icon: <FaCalendar />,
    value: "Events",
    link: `/events`,
  },
  {
    id: 5,
    icon: <FaGear />,
    value: "Settings",
    link: `/settings`,
  },
];

export const client = [
  {
    id: 1,
    icon: <FaDashcube />,
    value: "Dashboard",
    link: `/`,
  },
  {
    id: 2,
    icon: <FaGear />,
    value: "Settings",
    link: `/settings`,
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
        link: `/`,
      },
    ],
  },
  {
    id: 2,
    icon: <FaCalendar />,
    value: "Events",
    link: `/events`,
  },
  {
    id: 3,
    icon: <FaGear />,
    value: "Settings",
    link: `/settings`,
  },
];
