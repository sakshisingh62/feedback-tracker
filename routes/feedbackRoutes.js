const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createFeedback,
    getFeedbacks,
    getSingleFeedback,
    updateFeedback,
    deleteFeedback
} = require("../controllers/feedbackController");

router.post("/", authMiddleware, createFeedback);

router.get("/", getFeedbacks);

router.get("/:id", getSingleFeedback);

router.put("/:id", authMiddleware, updateFeedback);

router.delete("/:id", authMiddleware, deleteFeedback);

module.exports = router;