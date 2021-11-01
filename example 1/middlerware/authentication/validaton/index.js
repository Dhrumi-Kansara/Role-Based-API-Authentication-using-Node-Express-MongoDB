const { users, projects } = require("../../../data");

function setProject(req, res, next) {
  const projectId = parseInt(req.params.projectId);
  req.project = projects.find((project) => project.id === projectId);

  if (req.project == null) {
    return res.status(404).send("Project not found");
  }
  next();
}

function setUser(req, res, next) {
  const userId = req.body.userId;
  if (userId) {
    req.user = users.find((user) => user.id === userId);
  }
  next();
}
module.exports = {
  setProject,
  setUser,
};
