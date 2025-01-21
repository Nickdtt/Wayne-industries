import express from "express";
 
import cors from 'cors';
import { disconnect, getUsers, addSeguranca, addVeiculos, addArmamentos, getSeguranca, registerUser, getMenuItems, getArmamentos, getVeiculos, loginUser } from "./services";

const app = express();


// Middleware
app.use(express.json());
app.use(cors());

// Rotas
app.post("/seguranca", addSeguranca);
app.post("/veiculos", addVeiculos);
app.post("/armamento", addArmamentos);

app.post("/cadastrar", registerUser);
app.post("/login", loginUser);

app.get("/geral", getMenuItems);
app.get("/seguranca", getSeguranca);
app.get("/veiculos", getVeiculos);
app.get("/armamento", getArmamentos);
app.get("/users", getUsers);

// Fechando a conexão com o banco quando o servidor for encerrado
app.on("close", disconnect);

const PORT = 3004;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});