const { canViewProject } = require("../authentication/permissions/project");

function authUser(req, res, next) {
  if (req.user == null) {
    return res.status(403).send("You need to sign in");
  }
  next();
}

function authRole(role) {
  return (req, res, next) => {
    console.log(role, req.user.role);
    if (req.user.role !== role) {
      return res.status(401).send("Not Allowed");
    }
    next();
  };
}

function authGetProject(req, res, next) {
  if (!canViewProject(req.user, req.project)) {
    return res.status(404).send("Not Allowed");
  }
  next();
}

module.exports = {
  authUser,
  authRole,
  authGetProject,
};
