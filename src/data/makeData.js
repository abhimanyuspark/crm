import { faker } from "@faker-js/faker";

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  return {
    id: faker.string.uuid(),
    role: faker.helpers.arrayElement([["employee"], ["client"]]),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password: faker.internet.password({ length: 8 }),
    date: faker.date.between({ from: "2022-01-01", to: "2024-12-01" }),
    profile: faker.image.avatar(),
    age: faker.number.int({ min: 25, max: 50 }),
    visits: faker.number.int(1000),
    jobType: faker.person.jobType(),
    login: true,
    company: faker.company.name(),
    phone: faker.phone.number(),
    address: `${faker.location.streetAddress()}, ${faker.location.city()}`,
    progress: faker.number.int({ min: 40, max: 90 }),
    gender: faker.helpers.arrayElement(["Male", "Female", "Other"]),
    allowFollowUp: faker.helpers.arrayElement([
      { type: "Yes" },
      { type: "No" },
    ]),
    status: faker.helpers.arrayElement([
      { name: "InActive", color: "red", id: faker.string.uuid() },
      { name: "Active", color: "#0cf90c", id: faker.string.uuid() },
    ]),
    statusMenu: [
      { name: "InActive", color: "red", id: faker.string.uuid() },
      { name: "Active", color: "#0cf90c", id: faker.string.uuid() },
    ],
    tasks: [
      {
        id: faker.string.uuid(),
        title: faker.lorem.words(6),
        description: faker.lorem.sentence(),
        status: { name: "pending", color: "yellow", id: faker.string.uuid() },
        start: faker.date.between({ from: "2024-01-01", to: "2024-12-01" }),
        end: faker.date.between({ from: "2024-01-01", to: "2024-12-01" }),
      },
    ],
    projects: [
      {
        id: faker.string.uuid(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        status: { name: "inprocess", color: "blue", id: faker.string.uuid() },
        start: faker.date.between({ from: "2024-01-01", to: "2024-12-01" }),
        end: faker.date.between({ from: "2024-01-01", to: "2024-12-01" }),
      },
    ],
    events: [
      {
        id: faker.string.uuid(),
        title: faker.lorem.words(4),
        description: faker.lorem.words(10),
        status: { name: "inprocess", color: "blue", id: faker.string.uuid() },
        start: faker.date.between({ from: "2024-01-01", to: "2024-12-01" }),
        end: faker.date.between({ from: "2024-01-01", to: "2024-12-01" }),
        allDay: faker.helpers.arrayElement([true, false]),
      },
    ],
  };
};

export function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...newPerson(),
      };
    });
  };

  return makeDataLevel();
}
