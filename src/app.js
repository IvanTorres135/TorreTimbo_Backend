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
app.use("/ne-Emision/servicio-al-cliente/v1/deudas",deudasRoutes);
app.use("/ne-Emision/servicio-al-cliente/v1/consumoagua",consumoaguaRoutes);
app.use("/ne-Multas/servicio-al-cliente/v1/multas",multasRoutes);
app.use("/ne-Emision/servicio-al-cliente/v1/Fecharecibo",fecharecRoutes);
app.use("/ne-Emision/servicio-al-cliente/v1/generaterecibo",generaterecRoutes);
app.use("/ne-User/servicio-al-cliente/v1/dpto",datauserRoutes);
//app.use("/api/recibodepa",recibodepaRoutes);

export default app;