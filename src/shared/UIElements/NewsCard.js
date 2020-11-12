import React from 'react';

import { Link } from 'react-router-dom';

import './NewsCard.css';


const NewsCard = props => {
    return (
        <div className='NewsCard-container'>
            <div className='card-frame'>
                <div className='card-item'>
                    <div className='image-container'>
                        <img src="/images/NewsCard/Market-report.jpg" alt='BBQ' />
                    </div>
                    <div>
                        <h2>Card Title</h2>
                        <p>This is a wider card with supporting text below as a natural lead-in to
                    additional content. This content is a little bit longer.</p>
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
                        <img src="/images/NewsCard/online-ordering.jpg" alt='BBQ' />
                    </div>
                    <div>
                        <h2>Card Title</h2>
                        <p>This is a wider card with supporting text below as a natural lead-in to
                    additional content. This content is a little bit longer.</p>
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
                        <h2>Card Title</h2>
                        <p>This is a wider card with supporting text below as a natural lead-in to
                    additional content. This content is a little bit longer.</p>
                        <div className='horizontal-line'></div>
                        <div className='see-more'>
                            <Link to='/'>See more...</Link>
                        </div>                    </div>
                </div>
            </div>
        </div>
    )

}



export default NewsCard;