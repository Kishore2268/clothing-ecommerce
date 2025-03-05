const Order = require("../models/order.model.js");
const Product = require("../models/product.model.js");
const User = require("../models/user.model.js");

// Get monthly statistics
const getMonthlyStats = async (req, res) => {
  try {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    const totalSales = await Order.countDocuments({ orderDate: { $gte: firstDayOfMonth } });
    const totalCustomers = await User.countDocuments({ createdAt: { $gte: firstDayOfMonth } });
    const totalProducts = await Product.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $match: { orderDate: { $gte: firstDayOfMonth } } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);

    // Calculate monthly growth (example calculation)
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const lastMonthRevenue = await Order.aggregate([
      { $match: { orderDate: { $gte: lastMonth, $lt: firstDayOfMonth } } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);

    const currentRevenue = totalRevenue[0]?.total || 0;
    const previousRevenue = lastMonthRevenue[0]?.total || 0;
    const monthlyGrowth = previousRevenue === 0 ? 100 : ((currentRevenue - previousRevenue) / previousRevenue) * 100;

    res.status(200).json({
      totalSales,
      totalCustomers,
      totalProducts,
      totalRevenue: currentRevenue,
      monthlyGrowth: Math.round(monthlyGrowth * 100) / 100
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get weekly statistics
const getWeeklyStats = async (req, res) => {
  try {
    const currentDate = new Date();
    const lastWeek = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    const weeklySales = await Order.aggregate([
      { $match: { orderDate: { $gte: lastWeek } } },
      { $group: { 
        _id: { $dayOfWeek: "$orderDate" },
        total: { $sum: "$totalPrice" }
      }},
      { $sort: { _id: 1 } }
    ]);

    // Fill in missing days with 0
    const salesByDay = new Array(7).fill(0);
    weeklySales.forEach(day => {
      salesByDay[day._id - 1] = day.total;
    });

    // Calculate weekly performance
    const previousWeek = new Date(lastWeek.getTime() - 7 * 24 * 60 * 60 * 1000);
    const previousWeekSales = await Order.aggregate([
      { $match: { orderDate: { $gte: previousWeek, $lt: lastWeek } } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);

    const currentWeekTotal = salesByDay.reduce((a, b) => a + b, 0);
    const previousWeekTotal = previousWeekSales[0]?.total || 0;
    const weeklyPerformance = previousWeekTotal === 0 ? 100 : ((currentWeekTotal - previousWeekTotal) / previousWeekTotal) * 100;

    res.status(200).json({
      weeklySales: salesByDay,
      weeklyPerformance: Math.round(weeklyPerformance * 100) / 100
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get sales trend
const getSalesTrend = async (req, res) => {
  try {
    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);

    const monthlySales = await Order.aggregate([
      { $match: { orderDate: { $gte: startOfYear } } },
      { $group: { 
        _id: { $month: "$orderDate" },
        total: { $sum: "$totalPrice" }
      }},
      { $sort: { _id: 1 } }
    ]);

    // Fill in all months with 0 if no sales
    const salesByMonth = new Array(12).fill(0);
    monthlySales.forEach(month => {
      salesByMonth[month._id - 1] = month.total;
    });

    const totalSales = salesByMonth.reduce((a, b) => a + b, 0);
    const growthRate = ((salesByMonth[currentDate.getMonth()] - salesByMonth[currentDate.getMonth() - 1]) / 
                       (salesByMonth[currentDate.getMonth() - 1] || 1)) * 100;

    res.status(200).json({
      monthlySales: salesByMonth,
      totalSales,
      growthRate: Math.round(growthRate * 100) / 100
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get earnings statistics
const getEarningStats = async (req, res) => {
  try {
    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);

    const totalEarning = await Order.aggregate([
      { $match: { orderDate: { $gte: startOfYear } } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);

    const lastYear = new Date(currentDate.getFullYear() - 1, 0, 1);
    const lastYearEarning = await Order.aggregate([
      { $match: { orderDate: { $gte: lastYear, $lt: startOfYear } } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);

    // Calculate category earnings
    const categoryEarnings = await Order.aggregate([
      { $match: { orderDate: { $gte: startOfYear } } },
      { $unwind: "$items" },
      { $lookup: {
        from: "products",
        localField: "items.product",
        foreignField: "_id",
        as: "productDetails"
      }},
      { $unwind: "$productDetails" },
      { $group: {
        _id: "$productDetails.category",
        earnings: { $sum: { $multiply: ["$items.price", "$items.quantity"] } }
      }},
      { $project: {
        category: "$_id",
        earnings: 1,
        description: { 
          $switch: {
            branches: [
              { case: { $eq: ["$_id", "men"] }, then: "Men's Fashion" },
              { case: { $eq: ["$_id", "women"] }, then: "Women's Fashion" },
              { case: { $eq: ["$_id", "kids"] }, then: "Kids' Fashion" }
            ],
            default: "Other Categories"
          }
        }
      }}
    ]);

    const yearlyComparison = ((totalEarning[0]?.total || 0) - (lastYearEarning[0]?.total || 0)) / 
                            (lastYearEarning[0]?.total || 1) * 100;

    res.status(200).json({
      totalEarning: totalEarning[0]?.total || 0,
      yearlyComparison: Math.round(yearlyComparison * 100) / 100,
      categoryEarnings: categoryEarnings.map(cat => ({
        ...cat,
        imageUrl: `/images/categories/${cat.category}.png`
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get achievement statistics
const getAchievementStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);
    const totalCustomers = await User.countDocuments({ role: "CUSTOMER" });
    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      totalCustomers,
      totalProducts,
      achievementLevel: Math.floor((totalOrders / 1000) * 100) // Example calculation
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get recent orders
const getRecentOrders = async (req, res) => {
  try {
    const recentOrders = await Order.find()
      .sort({ orderDate: -1 })
      .limit(5)
      .populate('items.product');

    res.status(200).json(recentOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get recently added products
const getRecentProducts = async (req, res) => {
  try {
    const recentProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json(recentProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get recent customers
const getRecentCustomers = async (req, res) => {
  try {
    const recentCustomers = await User.find({ role: "CUSTOMER" })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('-password');

    res.status(200).json(recentCustomers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getMonthlyStats,
  getWeeklyStats,
  getSalesTrend,
  getEarningStats,
  getAchievementStats,
  getRecentOrders,
  getRecentProducts,
  getRecentCustomers
}; 