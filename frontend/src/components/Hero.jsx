import React, { useState, useEffect } from 'react';

const Hero = () => {
    // Event date set to 5 days from now
    const [targetDate] = useState(() => {
        const d = new Date();
        d.setDate(d.getDate() + 5);
        d.setHours(d.getHours() + 12);
        return d.getTime();
    });

    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const tick = () => {
            const now = Date.now();
            const diff = Math.max(0, targetDate - now);
            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / (1000 * 60)) % 60),
                seconds: Math.floor((diff / 1000) % 60)
            });
        };
        tick();
        const interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, [targetDate]);

    const pad = (n) => String(n).padStart(2, '0');

    return (
        <section className="hero-section">
            <div className="hero-content">
                <h1>
                    Meet your<br/>
                    species in this<br/>
                    <span className="highlight-text">Designer</span> Meetup
                </h1>
                <p>
                    Join the most anticipated design conference of the year. Connect with creative minds, 
                    learn cutting-edge techniques, and shape the future of digital design.
                </p>
                
                <div className="event-timer">
                    <h4>Event starts in</h4>
                    <div className="timer-nums">
                        <div>
                            {pad(timeLeft.days)}
                            <span>Days</span>
                        </div>
                        <div className="timer-colon">:</div>
                        <div>
                            {pad(timeLeft.hours)}
                            <span>Hours</span>
                        </div>
                        <div className="timer-colon">:</div>
                        <div>
                            {pad(timeLeft.minutes)}
                            <span>Min</span>
                        </div>
                        <div className="timer-colon">:</div>
                        <div>
                            {pad(timeLeft.seconds)}
                            <span>Sec</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="hero-illustration">
                <div className="hero-grid">
                    <div className="hero-cell hero-cell--orange">
                        <div className="hero-person">
                            <div className="person-head"></div>
                            <div className="person-body"></div>
                        </div>
                    </div>
                    <div className="hero-cell hero-cell--yellow">
                        <div className="hero-person">
                            <div className="person-head person-head--alt"></div>
                            <div className="person-body person-body--alt"></div>
                        </div>
                    </div>
                    <div className="hero-cell hero-cell--blue">
                        <div className="hero-person">
                            <div className="person-head"></div>
                            <div className="person-body person-body--dark"></div>
                        </div>
                    </div>
                    <div className="hero-cell hero-cell--red">
                        <div className="hero-person">
                            <div className="person-head person-head--alt"></div>
                            <div className="person-body"></div>
                        </div>
                    </div>
                </div>
                
                <svg className="deco-star hero-star" width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M24 0L29.4 18.6L48 24L29.4 29.4L24 48L18.6 29.4L0 24L18.6 18.6L24 0Z" fill="#f34b5c"/>
                </svg>
            </div>
        </section>
    );
};

export default Hero;
