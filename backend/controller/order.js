const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const Order = require("../model/order");
const Shop = require("../model/shop");
const Product = require("../model/product");
const axios = require("axios");
// Create new order
router.post(
  "/create-order",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;
       console.log("order created req.body",cart)

      // Group cart items by shopId
      const shopItemsMap = new Map();

      for (const item of cart) {
        const shopId = item.shopId;
        if (!shopItemsMap.has(shopId)) {
          shopItemsMap.set(shopId, []);
        }
        shopItemsMap.get(shopId).push(item);
        // console.log("cart1", item.stock);
      }

      // Create an order for each shop
      const orders = [];
      for (const [shopId, items] of shopItemsMap) {
        
        const order = await Order.create({

          cart: items,
          shippingAddress,
          user,
          totalPrice,
          paymentInfo,
        });
        orders.push(order);

        // Update stock for each item in the shop's cart
        for (const item of cart) {
          // console.log("item",item)

          await updateStockAfterOrderCreation(item); // Pass individual item to updateStockAfterOrderCreation
        }
      }

      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Function to update stock after order creation
async function updateStockAfterOrderCreation(item) {
  const productId = item._id;
  const newStock = item.stock; // Assuming item.stock contains the updated stock array
  console.log("newStock", newStock);

  try {
    for (const stockItem of newStock) {
      // Check if the item is selected and has quantity to update
      if (stockItem.isSelected && stockItem.qty > 0) {
        //stockItem.quantity -= stockItem.qty; // Update the quantity based on item.qty
        stockItem.isSelected = false; // Set isSelected to false after updating stock
        stockItem.qty = 0; // Reset qty to 0

        // Make HTTP PUT request to update stock using Axios
        const response = await axios.patch(`http://localhost:8000/api/v2/product/update-stock/${productId}`, {
          stock: newStock, // Update the stock value in the request body
        });

        if (response.status >= 200 && response.status < 300) {
          // console.log("Stock updated successfully");
        } else {
          throw new Error(`Failed to update stock - Unexpected status code: ${response.status}`);
        }
      } else {
        // If item is not selected or qty is 0, do nothing
        console.log("Item is not selected for updating stock or qty is 0.");
      }
    }
  } catch (error) {
    // console.error("Error updating stock:", error.message);
    throw new Error("Failed to update stock");
  }
}


// Function to update stock after order creation
async function updateStockCancel(item,size) {
  const productId = item._id;
  const newStock = item.stock; // Assuming item.stock contains the updated stock array
  console.log("newStock", newStock);

  try {
    for (const stockItem of newStock) {
      // Check if the item is selected and has quantity to update
      if (stockItem.isSelected && stockItem.qty > 0 && stockItem.size==size) {
        if(stockItem.qty==1){
          stockItem.isSelected = false;
        }
        stockItem.quantity += 1; // Update the quantity based on item.qty
         // Set isSelected to false after updating stock
        stockItem.qty -= 1; // Reset qty to 0

        // Make HTTP PUT request to update stock using Axios
        const response = await axios.patch(`http://localhost:8000/api/v2/product/update-stock/${productId}`, {
          stock: newStock, // Update the stock value in the request body
        });

        if (response.status >= 200 && response.status < 300) {
          // console.log("Stock updated successfully");
        } else {
          throw new Error(`Failed to update stock - Unexpected status code: ${response.status}`);
        }
      } else {
        // If item is not selected or qty is 0, do nothing
        console.log("Item is not selected for updating stock or qty is 0.");
      }
    }
  } catch (error) {
    // console.error("Error updating stock:", error.message);
    throw new Error("Failed to update stock");
  }
}























































// get all orders of user
router.get(
  "/get-all-orders/:userId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({ "user._id": req.params.userId }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all orders of seller
router.get(
  "/get-seller-all-orders/:shopId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({
        "cart.shopId": req.params.shopId,
      }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update order status for seller
router.put(
  "/update-order-status/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }
      console.log(req.body.status)
      if (req.body.status === "Transferred to delivery partner") {
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty);
        });
      }

      order.status = req.body.status;

      if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
        order.paymentInfo.status = "Succeeded";
        // const serviceCharge = order.totalPrice * .10;
        // await updateSellerInfo(order.totalPrice - serviceCharge);
        // const serviceCharge = order.totalPrice ;
        await updateSellerInfo(order.totalPrice);
      }

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
      });

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);

        product.stock -= qty;
        product.sold_out += qty;


        await product.save({ validateBeforeSave: false });
      }

      async function updateSellerInfo(amount) {
        const seller = await Shop.findById(req.seller.id);
        
        seller.availableBalance = amount;

        await seller.save();
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// give a refund ----- user
router.put(
  "/order-refund/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      order.status = req.body.status;

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
        message: "Order Refund Request successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


// give a refund ----- user
router.put(
  "/order-del-qty/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
      console.log("lllllllllllllll3",req.body.itemList)
      
      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }
       const cartItemIndex = order.cart.findIndex((item) => item._id == req.body.itemList._id);
 console.log("cartItemIndex",cartItemIndex)
      if (cartItemIndex === -1) {
        return next(new ErrorHandler("Cart item not found in the order2", 404));
      }
      order.cart[cartItemIndex] = req.body.itemList;
      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
        message: "Order Refund Request successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);







// accept the refund ---- seller
router.put(
  "/order-refund-success/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      order.status = req.body.status;

      await order.save();

      res.status(200).json({
        success: true,
        message: "Order Refund successfull!",
      });

      if (req.body.status === "Refund Success") {
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty);
        });
      }

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);

        product.stock += qty;
        product.sold_out -= qty;

        await product.save({ validateBeforeSave: false });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all orders --- for admin
router.get(
  "/admin-all-orders",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find().sort({
        deliveredAt: -1,
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


module.exports = router;



