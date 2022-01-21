const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  const allTags = await Tag.findAll({
    include: [{ model: Product, through: ProductTag, as: 'products' }],
  })
  .catch((err) => {
    res.status(400).json(err);
  });

  res.status(200).json(allTags);
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'products' }],
    })
    if(!tag) {
      res.status(404).json({"message": "That Tag ID does not exist"})
      return;
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }

  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  const createdTag = await Tag.create(
    {
      tag_name: req.body.tag_name
    }
  )
  .catch((err) => {
      res.status(400).json(err);
    });

  res.status(200).json(createdTag);
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const updatedTag = await Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
  .catch((err) => {
      res.status(400).json(err);
    });

  res.status(200).json(updatedTag);
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const deletedTag = await Tag.destroy(
    {
      where: {
        id: req.params.id,
      },
    }
  )
  .catch((err) => {
      res.status(400).json(err);
    });

  res.status(200).json(deletedTag);
});

module.exports = router;
