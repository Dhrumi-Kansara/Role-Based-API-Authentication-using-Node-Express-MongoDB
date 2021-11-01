const express = require("express");
const router = express.Router();
const { projects } = require("../data");
const { setProject } = require("../middlerware/authentication/validaton/index");
const {
  scopedProjects,
} = require("../middlerware/authentication/permissions/project");

const {
  authGetProject,
  authUser,
} = require("../middlerware/authentication/basicAuth");

router.get("/", authUser, (req, res) => {
  res.json(scopedProjects(req.user, projects));
});

router.get("/:projectId", setProject, authUser, authGetProject, (req, res) => {
  res.json(req.project);
});

module.exports = router;
