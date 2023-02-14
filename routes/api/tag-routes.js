const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint
// get all tags
router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: "tag-product" }],
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});
// get one tag
router.get("/:id", async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: "tag-product" }],
    });
    if (!tagData) {
      res.status(404).json({ message: "id not found" });
    }
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});
// create taf
router.post("/", async (req, res) => {
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    if (!tagData) {
      res.status(404).res.json({ message: "could not create" });
    }
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(err);
  }
});
// update tag
router.put("/:id", async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: "this id not found" });
      return;
    }
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(err);
  }
});
// delete tag
router.delete("/:id", async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: "can not delete, id not found" });
    }
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
