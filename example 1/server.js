const express = require("express");
const app = express();
const {
  authUser,
  authRole,
} = require("./middlerware/authentication/basicAuth.js");
const { setUser } = require("./middlerware/authentication/validaton/index");
const { ROLE } = require("./data");
const projectRouter = require("./routes/projects");

app.use(express.json());
app.use(setUser);
app.use("/projects", projectRouter);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/dashboard", authUser, (req, res) => {
  res.send("Dashboard Page");
});

app.get("/admin", authUser, authRole(ROLE.ADMIN), (req, res) => {
  res.send("Admin Page");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`server started at port ${PORT}`));
