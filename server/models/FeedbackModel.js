

import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        trim: true
    },
    images: [String]
}, {
    timestamps: true
});

// Auto-calculate and update hotel’s average rating

feedbackSchema.post('save', async function () {
    const Feedback = mongoose.model("Feedback");
    const Hotel = mongoose.model("Hotel");

    // find all feedback for this hotel
    const feedbacks = await Feedback.find({ hotel: this.hotel });
    const avgRating = feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length;

    // update the hotel’s rating
    await Hotel.findByIdAndUpdate(this.hotel, { rating: avgRating.toFixed(1) });
});

const Feedback = mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);
export default Feedback;
