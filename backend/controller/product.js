const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Product = require("../model/product");
const Order = require("../model/order");
const Shop = require("../model/shop");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/ErrorHandler");

router.post(
  "/create-product",
  // isAuthenticated,
  // isAdmin("Admin"),
  
  catchAsyncErrors(async (req, res, next) => {

    try {
      const shopId = req.body.shopId;
      if (!shopId) {
        return next(new ErrorHandler("Shop Id is required!", 400));
      }

      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      }

      let images = [];

      if (typeof req.body.images === "string") {
        images.push(req.body.images);
      } else {
        images = req.body.images;
      }
      

      // Validate other data fields here
      const { name, description, category,ShopPrice,originalPrice,subCategory, discountPrice, stock,gender,color } = req.body;
      // console.log(req.body)
      if (!name || !description || !category  ||!ShopPrice||!originalPrice ||  !discountPrice || !stock || !gender || !color|| !images ||!subCategory ) {
        console.log("object1111",originalPrice)
        
        return next(new ErrorHandler("Invalid product data. Please provide all required fields.", 400));

      }

      const imagesLinks = [];
    
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        });
    
        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    
      const productData = { ...req.body, images: imagesLinks };
      productData.shop = shop;

      const product = await Product.create(productData);
//       console.log("object",abc)
// console.log("productdata",productData)
// console.log("product",product)

      res.status(201).json({
        success: true,
        product,
      });
    } catch (error) {
      console.error("Error creating product:", error);
      return next(new ErrorHandler(error.message, 400));
    }
  })
);


// get all products of a shop
router.get(
  "/get-all-products-shop/:id",
  
    catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
//delete products from shop
router.delete(
  "/delete-shop-product/:id",
  isAuthenticated,
  isAdmin("Admin"),
  
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;
      console.log('Product ID:', productId); // Debugging statement

      const product = await Product.findByIdAndDelete(productId);

      if (!product) {
        return next(new ErrorHandler("Product not found with this id", 404));
      }

      for (let i = 0; i < product.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(
          product.images[i].public_id
        );
        console.log("Image deleted from cloudinary:", result);
      }

      if (typeof product.remove !== 'function') {
        return next(new ErrorHandler("Cannot delete product. Remove method not available.", 500));
      }

      await product.remove();

      console.log("Product deleted from database:", productId);

      res.status(200).json({
        success: true,
        message: "Product deleted successfully!",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      return next(new ErrorHandler("Error deleting product", 500));
    }
  })
);

// get all products
router.get(
  '/get-all-products',
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Pagination parameters
      const page = parseInt(req.query.page) || 1;
      const perPage = parseInt(req.query.perPage) || 30;
      // console.log('Pagination Params:', { page, perPage }); // Log pagination params

      // Sorting parameters
      let sortBy = ""; // Initialize sortBy variable
let sortOrder = -1; // Default sort order is descending (high to low)

if (req.query.sortBy === "priceHighToLow") {
  sortBy = "discountPrice"; // Sort by price (high to low)
} else if (req.query.sortBy === "priceLowToHigh") {
  sortBy = "discountPrice"; // Sort by price (low to high)
  sortOrder = 1; // Change sort order to ascending (low to high)
} else if (req.query.sortBy === "latest") {
  sortBy = "-createdAt"; // Sort by latest
} else {
  sortBy = "originalPrice"; // Default sort by originalPrice
}

// Use sortBy and sortOrder in your database query or sorting logic

      // console.log("req.query.sortBy",req.query.sortBy)
      // console.log("req.query.sortOrder",req.query.sortOrder)
      // console.log("req.query.sortBy",req.query)
      // console.log("req.query.sortBy",req.params)

      // console.log('Sorting Params:', { sortBy, sortOrder }); // Log sorting params

      // Filtering parameters
      const filters = {};
      if (req.query.category) {
        filters.category = { $in: req.query.category.split(',') };
      }
      if (req.query.sleeveType) {
        filters.sleeveType = { $in: req.query.sleeveType.split(',') };
      }
      if (req.query.neckType) {
        filters.neckType = { $in: req.query.neckType.split(',') };
      }
      if (req.query.color) {
        filters.color = { $in: req.query.color.split(',') };
      }
      if (req.query.subCategory) {
        filters.subCategory = { $in: req.query.subCategory.split(',') };
      }
      if (req.query.fit) {
        filters.fit = { $in: req.query.fit.split(',') };
      }
      if (req.query.fabric) {
        filters.fabric = { $in: req.query.fabric.split(',') };
      }
      if (req.query.gender) {
        filters.gender = { $in: req.query.gender.split(',') };
      }
      if (req.query.occasion) {
        filters.occasion = { $in: req.query.occasion.split(',') };
      }
      if (req.query.size) {
        filters['stock.size'] = { $in: req.query.size.split(',') };
      }
      if (req.query.customerRating) {
        const ratingRanges = req.query.customerRating.split(','); // Split multiple ranges
        const ratingFilters = ratingRanges.map((range) => {
          const [minRating, maxRating] = range.split('-').map(parseFloat);
          return { ratings: { $gte: minRating, $lte: maxRating } };
        });
        filters.$or = ratingFilters;
      }
      
      if (req.query.priceRange) {
        const priceRanges = req.query.priceRange.split(','); // Split multiple ranges
        let minPrice = Infinity;
        let maxPrice = -Infinity;
        priceRanges.forEach((range) => {
          const [min, max] = range.split('-').map(parseFloat);
          minPrice = Math.min(minPrice, min);
          maxPrice = Math.max(maxPrice, max);
        });
        filters.discountPrice = { $gte: minPrice, $lte: maxPrice };
      }

      // Query products with filtering, sorting, and pagination
      const products = await Product.find(filters)
        .sort({ [sortBy]: sortOrder })
        .skip((page - 1) * perPage)
        .limit(perPage);

      // Count total products for pagination
      const totalCount = await Product.countDocuments(filters);

      res.status(200).json({
        success: true,
        products,
        totalCount,
        totalPages: Math.ceil(totalCount / perPage),
      });
    } catch (error) {
      console.error('Error:', error); // Log error
      return next(new ErrorHandler(error, 400));
    }
  })
);



// review for a product
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;

      const product = await Product.findById(productId);

      const review = {
        user,
        rating,
        comment,
        productId,
      };

      const isReviewed = product.reviews.find(
        (rev) => rev.user._id === req.user._id
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id === req.user._id) {
            (rev.rating = rating), (rev.comment = comment), (rev.user = user);
          }
        });
      } else {
        product.reviews.push(review);
      }

      let avg = 0;

      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
        orderId,
        { $set: { "cart.$[elem].isReviewed": true } },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );

      res.status(200).json({
        success: true,
        message: "Reviwed succesfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// all products --- for admin
router.get(
  "/admin-all-products",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);



// Update stock for a single product
router.patch(
  "/update-stock/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;
      const { stock, sold_out } = req.body; // New stock object from the request body

      // Find the product by ID in the database
      const product = await Product.findById(productId);

      // Check if the product exists
      if (!product) {
        return next(new ErrorHandler(`Product not found with ID: ${productId}`, 404));
      }

      // Update the product's stock with the new stock array
      product.stock = stock;

      // Save the updated product
      await product.save();

      // Send success response
      res.status(200).json({
        success: true,
        message: "Product stock updated successfully",
        product,
      });
    } catch (error) {
      console.error("Error updating product stock:", error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);




// Update stock for a single product
router.patch(
  "/seller-update-stock/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;
      const { size, quantity } = req.body; // New size and quantity from the request body

      // Find the product by ID in the database
      const product = await Product.findById(productId);

      // Check if the product exists
      if (!product) {
        return next(new ErrorHandler(`Product not found with ID: ${productId}`, 404));
      }

      // Find the index of the size in the stock array
      const sizeIndex = product.stock.findIndex((item) => item.size === size);

      // Update the quantity of the specific size if found, otherwise add a new entry
      if (sizeIndex !== -1) {
        product.stock[sizeIndex].quantity = quantity;
      } else {
        product.stock.push({ size, quantity });
      }

      // Save the updated product
      await product.save();

      // Send success response
      res.status(200).json({
        success: true,
        message: `Stock for size ${size} updated successfully`,
        product,
      });
    } catch (error) {
      console.error("Error updating product stock:", error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);



module.exports = router;
