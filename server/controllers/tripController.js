const tripService = require('../services/tripService');

const getTrips = async (req, res, next) => {
  try {
    const result = await tripService.getTrips(req.query);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const getTripById = async (req, res, next) => {
  try {
    const result = await tripService.getTripById(req.params.id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const createTrip = async (req, res, next) => {
  try {
    const result = await tripService.createTrip(req.body);
    res.status(201).json({ success: true, message: 'Trip created', data: result });
  } catch (error) {
    next(error);
  }
};

const updateTrip = async (req, res, next) => {
  try {
    const result = await tripService.updateTrip(req.params.id, req.body, req.user._id);
    res.status(200).json({ success: true, message: 'Trip updated', data: result });
  } catch (error) {
    next(error);
  }
};

const deleteTrip = async (req, res, next) => {
  try {
    const result = await tripService.deleteTrip(req.params.id);
    res.status(200).json({ success: true, message: 'Trip deleted', data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTrips, getTripById, createTrip, updateTrip, deleteTrip };
