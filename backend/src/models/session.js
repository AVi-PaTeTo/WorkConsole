import mongoose from "mongoose";

const intervalSchema = new mongoose.Schema({
    start: {
        type: Date, 
        required: true
    },
    end:{
        type: Date, 
        required: true
    }
}, {_id : false});

const sessionSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true, 
        index: true
    },
    title: {
        type: String, 
        maxlength:120, 
        trim: true, 
        required: true
    },
    tags: {
        type: [String],
        validate: { 
            validator: (arr) => arr.length <= 6,
            message: 'Session can have at most 6 tags.'
        }
    },
    status: {
        type: String, 
        enum: ['active', 'paused', 'completed', 'planned'], 
        default: 'planned', 
        index: true
    },
    intervals: [intervalSchema],
}, {timestamps: true});


sessionSchema.methods.getDurationMs = function() {
    return this.intervals.reduce((sum, i) => {
        if (!i.end) return sum;
        return sum + (i.end - i.start);
    }, 0);
}

export const Session = mongoose.model("Session", sessionSchema);