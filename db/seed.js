import db from "#db/client";
import { createEmployee } from "./queries/employees.js";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  const employeesToSeed = [
    { name: "John Hancock", birthday: "2000-01-30", salary: 100000 },
    { name: "Mary Elizabeth", birthday: "2000-02-04", salary: 200000 },
    { name: "Teri Barton", birthday: "2000-03-30", salary: 300000 },
    { name: "Max Barton", birthday: "2000-04-30", salary: 400000 },
    { name: "Grace Barton", birthday: "2000-05-30", salary: 500000 },
    { name: "Abraham Barton", birthday: "2000-06-30", salary: 600000 },
    { name: "Jeff Hopp", birthday: "2000-07-30", salary: 700000 },
    { name: "Ashlee Call", birthday: "2000-08-30", salary: 800000 },
    { name: "Chenoa Baker", birthday: "2000-09-30", salary: 900000 },
    { name: "Griffin Hopp", birthday: "2000-10-30", salary: 990000 },
    { name: "River Hopp", birthday: "2000-11-30", salary: 1000000 },
  ];

  for (const employee of employeesToSeed) {
    await createEmployee(employee);
  }
}
