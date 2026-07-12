const db = require("../config/db");

const getDashboardStats = async () => {

    const [[vehicleTotal]] = await db.query(
        "SELECT COUNT(*) total FROM vehicles"
    );

    const [[vehicleAvailable]] = await db.query(
        "SELECT COUNT(*) total FROM vehicles WHERE status='AVAILABLE'"
    );

    const [[vehicleTrip]] = await db.query(
        "SELECT COUNT(*) total FROM vehicles WHERE status='ON_TRIP'"
    );

    const [[vehicleShop]] = await db.query(
        "SELECT COUNT(*) total FROM vehicles WHERE status='IN_SHOP'"
    );

    const [[driverTotal]] = await db.query(
        "SELECT COUNT(*) total FROM drivers"
    );

    const [[driverAvailable]] = await db.query(
        "SELECT COUNT(*) total FROM drivers WHERE status='AVAILABLE'"
    );

    const [[driverTrip]] = await db.query(
        "SELECT COUNT(*) total FROM drivers WHERE status='ON_TRIP'"
    );

    const [[tripTotal]] = await db.query(
        "SELECT COUNT(*) total FROM trips"
    );

    const [[tripScheduled]] = await db.query(
        "SELECT COUNT(*) total FROM trips WHERE trip_status='SCHEDULED'"
    );

    const [[tripActive]] = await db.query(
        "SELECT COUNT(*) total FROM trips WHERE trip_status IN ('DISPATCHED','IN_PROGRESS')"
    );

    const [[tripCompleted]] = await db.query(
        "SELECT COUNT(*) total FROM trips WHERE trip_status='COMPLETED'"
    );

    const [[tripCancelled]] = await db.query(
        "SELECT COUNT(*) total FROM trips WHERE trip_status='CANCELLED'"
    );

    return {

        vehicles: {

            total: vehicleTotal.total,
            available: vehicleAvailable.total,
            onTrip: vehicleTrip.total,
            inShop: vehicleShop.total

        },

        drivers: {

            total: driverTotal.total,
            available: driverAvailable.total,
            onTrip: driverTrip.total

        },

        trips: {

            total: tripTotal.total,
            scheduled: tripScheduled.total,
            active: tripActive.total,
            completed: tripCompleted.total,
            cancelled: tripCancelled.total

        }

    };

};

module.exports = {
    getDashboardStats
};