import React from 'react'

const PublicEventBanners = () => {
    return (
        <div className="admin-panel">
            <h1 className="admin-title">Public Event Banners</h1>
            <div className="event-banners-list">
                <h2 className="section-title">Event Banners Listing</h2>
                <ul className="banner-list">
                    <li className="banner-item">
                        <div className="banner">
                            <h3 className="banner-title">Event Title 1</h3>
                            <p className="banner-date">Date: January 1, 2024</p>
                            <p className="banner-description">Description: This is a brief description of Event 1.</p>
                        </div>
                    </li>
                    <li className="banner-item">
                        <div className="banner">
                            <h3 className="banner-title">Event Title 2</h3>
                            <p className="banner-date">Date: February 15, 2024</p>
                            <p className="banner-description">Description: This is a brief description of Event 2.</p>
                        </div>
                    </li>
                    <li className="banner-item">
                        <div className="banner">
                            <h3 className="banner-title">Event Title 3</h3>
                            <p className="banner-date">Date: March 10, 2024</p>
                            <p className="banner-description">Description: This is a brief description of Event 3.</p>
                        </div>
                    </li>
                    <li className="banner-item">
                        <div className="banner">
                            <h3 className="banner-title">Event Title 4</h3>
                            <p className="banner-date">Date: April 20, 2024</p>
                            <p className="banner-description">Description: This is a brief description of Event 4.</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default PublicEventBanners