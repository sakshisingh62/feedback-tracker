const Feedback = require("../models/Feedback");

const createFeedback = async (req, res) => {

    try {

        const feedback = await Feedback.create({
            ...req.body,
            createdBy: req.user.id
        });

        res.status(201).json(feedback);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const getFeedbacks = async (req, res) => {

    try {

        const { category } = req.query;

        let filter = {};

        if (category) {
            filter.category = category;
        }

        const feedbacks = await Feedback.find(filter);

        res.status(200).json(feedbacks);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const getSingleFeedback = async (req, res) => {

    try {

        const feedback = await Feedback.findById(req.params.id);

        if (!feedback) {

            return res.status(404).json({
                message: "Feedback not found"
            });

        }

        res.status(200).json(feedback);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const updateFeedback = async (req, res) => {

    try {

        const feedback = await Feedback.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(feedback);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const deleteFeedback = async (req, res) => {

    try {

        await Feedback.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Feedback Deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    createFeedback,
    getFeedbacks,
    getSingleFeedback,
    updateFeedback,
    deleteFeedback
};