const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

const { sendTicketEmail } = require('../utils/emailService');

// POST /registrations — Create a new registration
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, age, gender, eventName, city, seats } = req.body;

        if (!name || !email || !phone || !age || !gender || !eventName) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        if (!seats || seats.length === 0) {
            return res.status(400).json({ message: 'Please select at least one seat.' });
        }

        if (seats.length > 10) {
            return res.status(400).json({ message: 'Maximum 10 seats allowed per booking.' });
        }

        // Check if any of the requested seats are already booked for this event
        const existingBookings = await Registration.find({ eventName });
        const alreadyBooked = new Set();
        existingBookings.forEach(reg => {
            reg.seats.forEach(s => alreadyBooked.add(s));
        });

        const conflicts = seats.filter(s => alreadyBooked.has(s));
        if (conflicts.length > 0) {
            return res.status(409).json({ 
                message: `Seats ${conflicts.join(', ')} are already booked. Please select different seats.` 
            });
        }

        const registration = new Registration({ name, email, phone, age, gender, eventName, city, seats });
        await registration.save();
        
        // Asynchronously dispatch the QR Code email ticket
        sendTicketEmail(registration);

        res.status(201).json({ message: 'Registration successful!', registration });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'You have already registered for this event with this email.' });
        }
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
});

// GET /registrations — Get all registrations
router.get('/', async (req, res) => {
    try {
        const registrations = await Registration.find().sort({ registeredAt: -1 });
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching registrations.' });
    }
});

// GET /registrations/seats/:eventName — Get booked seats for a specific event
router.get('/seats/:eventName', async (req, res) => {
    try {
        const eventName = decodeURIComponent(req.params.eventName);
        const bookings = await Registration.find({ eventName });
        const bookedSeats = [];
        bookings.forEach(reg => {
            reg.seats.forEach(s => bookedSeats.push(s));
        });
        res.json({ bookedSeats });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching seat data.' });
    }
});

// DELETE /registrations/:id — Delete a registration
router.delete('/:id', async (req, res) => {
    try {
        const registration = await Registration.findByIdAndDelete(req.params.id);
        if (!registration) {
            return res.status(404).json({ message: 'Registration not found.' });
        }
        res.json({ message: 'Registration deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting registration.' });
    }
});

// PATCH /registrations/:id/checkin — Set attendee as checked in via QR Scanner
router.patch('/:id/checkin', async (req, res) => {
    try {
        const registration = await Registration.findByIdAndUpdate(
            req.params.id,
            { isCheckedIn: true },
            { new: true }
        );
        if (!registration) {
            return res.status(404).json({ message: 'Registration not found (Invalid QR Code).' });
        }
        res.json({ message: `Successfully validated ticket for ${registration.name}.`, registration });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying QR ticket.' });
    }
});

module.exports = router;
