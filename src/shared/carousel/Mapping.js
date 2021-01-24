import React, { useContext } from 'react';

import { useHistory } from 'react-router-dom';

import { SearchContext } from '../../shared/context/search-context';
import { AuthContext } from '../context/auth-context';
import { PurchaseContext } from '../context/purchase-context';
import Img from 'react-lazy-img';




const Image = props => {

    const { userId } = useContext(AuthContext);
    const { basketContent } = useContext(PurchaseContext);
    const { id, image, name } = props.file;
    const { search } = useContext(SearchContext);


    const history = useHistory();
    const clickHandle = async (e) => {

        try {
            search(basketContent.products, name, userId)
            history.push('/searchresults')
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <div onClick={clickHandle}>
            <Img
                defer
                key={id}
                src={process.env.REACT_APP_IMAGE_ROUTE + image}
                alt={name}
            />
        </div>
    )
}

const Mapping = props => {
    const { images } = props

    return (
        images.map(i => (
            <Image
                key={i.id}
                file={i}
            />
        ))
    )

}


export default Mapping;