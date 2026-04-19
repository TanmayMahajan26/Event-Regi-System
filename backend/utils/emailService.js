const nodemailer = require('nodemailer');
const qrcode = require('qrcode');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
    }
});

const sendTicketEmail = async (registration) => {
    try {
        const qrContent = JSON.stringify({
            ticketNo: registration._id.toString(),
            name: registration.name,
            event: registration.eventName,
            seats: registration.seats.join(', ')
        });
        
        const qrDataUrl = await qrcode.toDataURL(qrContent, {
            color: { dark: '#1a1a2e', light: '#ffffff' },
            width: 300,
            margin: 1
        });
        
        // Premium BookMyShow-style layout
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <style>
                    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 40px 10px; }
                    .ticket-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.08); }
                    .header-image { width: 100%; height: 220px; object-fit: cover; display: block; }
                    .content-wrapper { padding: 40px; }
                    .brand-tag { text-transform: uppercase; letter-spacing: 2px; font-size: 12px; color: #f34b5c; font-weight: 700; margin-bottom: 10px; display: block; }
                    .event-title { margin: 0 0 5px; font-size: 28px; color: #111827; font-weight: 800; line-height: 1.2; }
                    .event-meta { font-size: 15px; color: #6b7280; margin: 0 0 30px; font-weight: 500; }
                    .divider { height: 2px; background: repeating-linear-gradient(90deg, #e5e7eb, #e5e7eb 10px, transparent 10px, transparent 20px); margin: 30px 0; }
                    .info-grid { display: table; width: 100%; }
                    .info-row { display: table-row; }
                    .info-cell { display: table-cell; padding-bottom: 15px; font-size: 15px; }
                    .info-label { color: #6b7280; }
                    .info-value { color: #111827; font-weight: 700; text-align: right; }
                    .seat-badge { background-color: #f34b5c; color: white; padding: 4px 10px; border-radius: 6px; font-size: 13px; font-weight: bold; }
                    .qr-section { text-align: center; background-color: #f9fafb; border-radius: 16px; padding: 30px; margin-top: 30px; border: 1px solid #f3f4f6; }
                    .qr-image { width: 200px; height: 200px; margin: 0 auto 15px; border-radius: 12px; }
                    .qr-help { font-size: 13px; color: #6b7280; margin: 0; }
                    .footer { text-align: center; margin-top: 30px; font-size: 13px; color: #9ca3af; }
                </style>
            </head>
            <body>
                <div class="ticket-container">
                    <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000" alt="Event Banner" class="header-image" />
                    
                    <div class="content-wrapper">
                        <span class="brand-tag">Confirmed Ticket</span>
                        <h1 class="event-title">${registration.eventName}</h1>
                        <p class="event-meta">📍 ${registration.city} · Official Event Partner</p>

                        <div class="divider"></div>

                        <div class="info-grid">
                            <div class="info-row">
                                <span class="info-cell info-label">Attendee Name</span>
                                <span class="info-cell info-value">${registration.name}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-cell info-label">Ticket Type</span>
                                <span class="info-cell info-value">General Admission</span>
                            </div>
                            <div class="info-row">
                                <span class="info-cell info-label">Allocated Seats</span>
                                <span class="info-cell info-value"><span class="seat-badge">${registration.seats.join(', ')}</span></span>
                            </div>
                        </div>

                        <div class="qr-section">
                            <img src="cid:ticket_qr_code" alt="Scan QR Code at Venue" class="qr-image" />
                            <p class="qr-help">Please present this QR code at the venue entrance.</p>
                            <p style="font-family: monospace; font-size: 12px; color: #d1d5db; margin-top: 10px;">ID: ${registration._id}</p>
                        </div>
                    </div>
                </div>
                <div class="footer">
                    This email acts as your official electronic ticket. Do not share the QR code.
                </div>
            </body>
            </html>
        `;

        const base64Data = qrDataUrl.split(';base64,').pop();

        const info = await transporter.sendMail({
            from: '"Designer Meetups" <${process.env.SMTP_EMAIL}>',
            to: registration.email,
            subject: \`🎟️ Your Confirmed Tickets: \${registration.eventName}\`,
            html: htmlContent,
            attachments: [
                {
                    filename: 'premium_qr.png',
                    content: base64Data,
                    encoding: 'base64',
                    cid: 'ticket_qr_code'
                }
            ]
        });

        console.log('Premium Ticket email sent successfully! Message ID:', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending ticket email:', error);
        return false;
    }
};

module.exports = { sendTicketEmail };
