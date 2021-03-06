const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const allCategories = await Category.findAll({
  // be sure to include its associated Products
      include: [{ model: Product }],
    })

    res.status(200).json(allCategories);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id,
       // be sure to include its associated Products
      {include: [{ model: Product }],
    })

    if (!category) {
      res.status(404).json({"message": "That Category ID does not exist"})
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createCategory = await Category.create(
      {
        category_name: req.body.category_name
      })
    
    res.status(201).json(createCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
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

    if(!updateCategory[0]) {
      res.status(404).json({"message": "That Category ID does not exist"})
      return;
    }

    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy(
      {
        where: {
          id: req.params.id
        },
      }
      )
      if(!deleteCategory) {
        res.status(404).json({"message": "That Category ID does not exist"});
        return;
      }
      res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
