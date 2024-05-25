import { buildRoutePath } from "./utils/build-route-path.js";
import { randomUUID } from "node:crypto"
import { Database } from "./database.js"

const database = new Database();

export const routes = [
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;

      if (!title || title === "") {
        return res.writeHead(400).end(
          JSON.stringify({ message: "title must be provided", })
        )
      }

      if (!description || description === "") {
        return res.writeHead(400).end(
          JSON.stringify({ message: "description must be provided" })
        )
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      database.insert("tasks", task);

      return res.writeHead(201).end();
    }
  }
]