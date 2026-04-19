import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ minimal }) => {
    return (
        <header>
            <div className="logo"><Link to="/">m</Link></div>
            {!minimal && (
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/cities">Events</Link></li>
                        <li><Link to="/admin">Admin</Link></li>
                    </ul>
                </nav>
            )}
            <Link to="/cities" className="btn btn-primary">Explore Events</Link>
        </header>
    );
};

export default Header;
