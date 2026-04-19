const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    eventName: { type: String, required: true },
    city: { type: String, default: '' },
    seats: [{ type: String }],
    isCheckedIn: { type: Boolean, default: false },
    registeredAt: { type: Date, default: Date.now }
});

// Compound unique: same email can't register for the same event twice
registrationSchema.index({ email: 1, eventName: 1 }, { unique: true });

module.exports = mongoose.model('Registration', registrationSchema);
