import express, { Request, Response } from 'express';

const app = express();
const port = 1000;
const NewTodo = require("./db")
// const App = require("./routes/index")
import App from "./routes/index"
import getdata from "./routes/showData"
app.use(express.json())

app.use("/api/v1" , App)
app.use("/api/v2" , getdata)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});