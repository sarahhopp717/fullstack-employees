import express from "express";
const router = express.Router();
export default router;

// TODO: this file!
import {
  getEmployees,
  createEmployee,
  deleteEmployee,
  getEmployee,
  updateEmployee,
} from "#db/queries/employees";

/////

router.get("/", async (req, res) => {
  const movies = await getEmployees();
  res.send(movies);
});

/////

router.post("/", async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ error: "Missing request body." });
  }

  const { name, birthday, salary } = req.body;

  if (!name || !birthday || !salary) {
    return res
      .status(400)
      .send({ error: "Missing required employee details." });
  }

  const employee = await createEmployee({ name, birthday, salary });
  res.status(201).send(employee);
});

/////

router.get("/:id", async (req, res) => {
  const employee = await getEmployee(req.params.id);

  if (!employee) {
    return res.status(404).send({ error: "Employee not found." });
  }

  res.send(employee);
});

/////

router.delete("/:id", async (req, res) => {
  const employee = await getEmployee(req.params.id);

  if (!employee) {
    return res.status(404).send({ error: "Employee not found." });
  }

  await deleteEmployee(req.params.id);
  res.sendStatus(204);
});

/////

router.put("/:id", async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ error: "Missing request body." });
  }

  const { name, birthday, salary } = req.body;
  const { id } = req.params;

  if (!name || !birthday || !salary) {
    return res.status(400).send({ error: "Missing required movie details." });
  }

  const existingEmployee = await getEmployee(id);
  if (!existingEmployee) {
    return res.status(404).send({ error: "Employee not found." });
  }

  const updatedEmployee = await updateEmployee({
    id,
    name,
    birthday,
    salary,
  });
  res.send(updatedEmployee);
});
