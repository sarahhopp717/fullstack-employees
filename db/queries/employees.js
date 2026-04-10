import client from "#db/client";

/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  const result = await client.query(
    `INSERT INTO employees (name, birthday, salary)
    VALUES ($1, $2, $3)
    RETURNING *;`,
    [name, birthday, salary],
  );
  return result.rows[0];
}

// === Part 2 ===

/** @returns all employees */
export async function getEmployees() {
  const sql = `
  SELECT *
  FROM employees
  `;
  const { rows: employees } = await client.query(sql);
  return employees;
}

/**
 * @returns the employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function getEmployee(id) {
  const result = await client.query(
    `
    SELECT *
    FROM employees
    WHERE id = $1`,
    [id],
  );
  return result.rows[0];
}

/**
 * @returns the updated employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function updateEmployee({ id, name, birthday, salary }) {
  const result = await client.query(
    `UPDATE employees
    SET
      name = $2,
      birthday = $3,
      salary = $4
    WHERE id = $1
    RETURNING *`,
    [id, name, birthday, salary],
  );
  return result.rows[0];
}

/**
 * @returns the deleted employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function deleteEmployee(id) {
  const result = await client.query(
    `DELETE FROM employees
    WHERE id = $1
    RETURNING *`,
    [id],
  );
  return result.rows[0];
}
