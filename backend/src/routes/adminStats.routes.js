const express = require("express");
const router = express.Router();
const adminStatsController = require("../controllers/adminStats.controller.js");
const authenticate = require("../middleware/authenticat.js");
const isAdmin = require("../middleware/isAdmin.js");

// Protect all routes with authentication and admin middleware
router.use(authenticate, isAdmin);

// Monthly statistics
router.get("/monthly", adminStatsController.getMonthlyStats);

// Weekly statistics
router.get("/weekly", adminStatsController.getWeeklyStats);

// Sales trend
router.get("/sales-trend", adminStatsController.getSalesTrend);

// Earnings statistics
router.get("/earnings", adminStatsController.getEarningStats);

// Achievement statistics
router.get("/achievements", adminStatsController.getAchievementStats);

// Recent orders
router.get("/recent-orders", adminStatsController.getRecentOrders);

// Recently added products
router.get("/recent-products", adminStatsController.getRecentProducts);

// Recent customers
router.get("/recent-customers", adminStatsController.getRecentCustomers);

module.exports = router; 