const router = require("express").Router();
const apiRoutes = require("./api");
// uses api
router.use("/api", apiRoutes);
// sends an error if any other route is used
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>");
});

module.exports = router;
