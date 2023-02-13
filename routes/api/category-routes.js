const router = require("express").Router();
const { Model } = require("sequelize/types");
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const categorydata = await Category.findAll({
      include: [{ Model: Product }],
    });
    res.status(200).json(categorydata);
  } catch (error) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const categorydata = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categorydata) {
      res.status(404).json({ message: "no id found, please try again" });
      return;
      // why ^
    }
    res.status(200).json(categorydata);
  } catch (error) {
    res.status(500).json(err);
  }
});
// unsure
router.post("/", async (req, res) => {
  try {
    const categorydata = await Category.create(req.body, {
      where: { id: req.params.id, category_name: req.params.category_name },
    });
    res.status(200).json(categorydata);
  } catch (error) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const categorydata = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (!categorydata) {
      res.status(404).json({ message: "no existing id found" });
      return;
    }
  } catch (error) {}
});

router.delete("/:id", async (req, res) => {
  try {
    const categorydata = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categorydata) {
      res
        .status(404)
        .json({ message: "not category found with this ID, try again" });
      return;
    }
    res.status(200).json(categorydata);
  } catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
