import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import { StudentRoute } from "./app/modules/student/student.route";
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//app routes
app.use ("/api/v1/students", StudentRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
