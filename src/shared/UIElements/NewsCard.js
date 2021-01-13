import React from 'react';

import { Link } from 'react-router-dom';

import './NewsCard.css';


const NewsCard = props => {
    return (
        <div className='centering-container'>

            <div className='NewsCard-container'>
                <div className='card-frame'>
                    <div className='card-item'>
                        <div className='image-container'>
                            <img src="/images/NewsCard/hams.jpg" alt='serrano ham' />
                        </div>
                        <div>
                            <h2>Market report</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                         Ut enim ad minim veniam.</p>
                            <div className='horizontal-line'></div>
                            <div className='see-more'>
                                <Link to='/'>See more...</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='card-frame'>
                    <div className='card-item'>
                        <div className='image-container'>
                            <img src="/images/NewsCard/Market-report.jpg" alt='market report' />
                        </div>
                        <div>
                            <h2>Market report</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                         Ut enim ad minim veniam.</p>
                            <div className='horizontal-line'></div>
                            <div className='see-more'>
                                <Link to='/'>See more...</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='card-frame'>
                    <div className='card-item'>
                        <div className='image-container'>
                            <img src="/images/NewsCard/online-ordering.jpg" alt='online ordering' />
                        </div>
                        <div>
                            <h2>New online ordering </h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                         Ut enim ad minim veniam.</p>
                            <div className='horizontal-line'></div>
                            <div className='see-more'>
                                <Link to='/'>See more...</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='card-frame'>
                    <div className='card-item'>
                        <div className='image-container'>
                            <img src="/images/NewsCard/spices.jpg" alt='BBQ' />
                        </div>
                        <div>
                            <h2>Fresh spices from India</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                         Ut enim ad minim veniam.</p>
                            <div className='horizontal-line'></div>
                            <div className='see-more'>
                                <Link to='/'>See more...</Link>
                            </div>                    </div>
                    </div>
                </div>
            </div>
        </div>
    )

}



export default NewsCard;