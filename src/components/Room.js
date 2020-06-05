import React from 'react'
import defaultImage from '../images/imagenotavailable.png'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
export default function Room({room}) {
    //console.log(room);
    const {name, slug, images, capacity, price, id} = room;
    //console.log(images[0]);
        return (
            <article className="room">
                <div className="img-container">
                    <img src={images[0] || defaultImage}></img>
                    <div className="price-top">
                        <h6>${price}</h6> 
                        <p>/15 min</p>
                    </div>
                    <Link to={`/rooms/${slug}`} className="room-link btn-primary">
                        see more 
                    </Link>
                </div>
                <p className='room-info'>{name}</p>    
            </article>

        )
    
    
}

Room.propTypes = {
    room: PropTypes.shape({
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        price: PropTypes.number.isRequired,
    })
}