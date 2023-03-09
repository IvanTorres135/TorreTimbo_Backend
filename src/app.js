import express from "express";
import morgan from "morgan";
import cors from "cors";

// Routes
import deudasRoutes from "./routes/deudas.routes";
import consumoaguaRoutes from "./routes/consumoagua.routes";
import multasRoutes from "./routes/multas.routes";
import fecharecRoutes from "./routes/fecharec.routes";
import generaterecRoutes from "./routes/generaterec.routes";
import datauserRoutes from "./routes/datauser.routes";
import recibodepaRoutes from "./routes/recibodepa.routes";

const app = express();

app.use(cors());

// Settings
app.set("port", 3000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/api/deudas",deudasRoutes);
app.use("/api/consumoagua",consumoaguaRoutes);
app.use("/api/multas",multasRoutes);
app.use("/api/fecharecibo",fecharecRoutes);
app.use("/api/generaterecibo",generaterecRoutes);
app.use("/api/datauser",datauserRoutes);
app.use("/api/recibodepa",recibodepaRoutes);

export default app;