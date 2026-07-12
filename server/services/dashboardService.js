const Dashboard = require("../models/Dashboard");

const getDashboardStats = () =>
    Dashboard.getDashboardStats();

module.exports = {
    getDashboardStats
};