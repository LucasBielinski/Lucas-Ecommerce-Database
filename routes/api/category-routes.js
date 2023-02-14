const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint
// gets all category
router.get("/", async (req, res) => {
  try {
    const categorydata = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categorydata);
  } catch (error) {
    res.status(500).json(error);
  }
});
// get one category
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
    res.status(500).json(error);
  }
});
// create category
router.post("/", async (req, res) => {
  try {
    const categorydata = await Category.create({
      category_name: req.body.category_name,
    });
    if (!categorydata) {
      res.status(404).res.json({ message: "could not create" });
    }
    res.status(200).json(categorydata);
  } catch (error) {
    res.status(500).json(error);
  }
});
// update category
router.put("/:id", async (req, res) => {
  try {
    const categorydata = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (!categorydata) {
      res.status(404).json({ message: "no existing id found" });
      return;
    }
    res.status(200).json(categorydata);
  } catch (error) {
    res.status(500).json(error);
  }
});
// delete category
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
    res.status(500).json(error);
  }
});

module.exports = router;
