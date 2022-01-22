// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
const { hasMany } = require('./Product');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false
  },
  as: "tags",
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false
  },
  as: "products",
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};

// TODO: 

// TEST ALL END POINTS IN INSOMNIA
  // GET ALL has duplicate product_id and tag_id for PRODUCT AND TAG 
// CHECK READ ME FOR ANY REQUIREMENTS YOU MAY HAVE MISSED
// UPDATE YOUR READ ME TO INCLUDE DESCRIPTION
// MAKE INSOMNIA VIDEO
// TAKE SCREENSHOTS?