const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  const allCategories = await Category.findAll()
  .catch((err) => {
    res.json(err);
  });

  res.status(200).json(allCategories);
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  const category = await Category.findByPk(req.params.id)
  .catch((err) => {
    res.json(err);
  });

  res.status(200).json(category);
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  const createCategory = await Category.create(
  {
    category_name: req.body.category_name
  })
  .catch((err) => {
    res.json(err);
  });

  res.status(200).json(createCategory);
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const updateCategory = await Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      },
    }
    )
    .catch((err) => {
      res.json(err);
    });
  
    res.status(200).json(updateCategory);
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const deleteCategory = await Category.destroy(
    {
      where: {
        id: req.params.id
      },
    }
    )
    .catch((err) => {
      res.json(err);
    });
  
    res.status(200).json(deleteCategory);
});

module.exports = router;
