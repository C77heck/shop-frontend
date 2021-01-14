import React, { useContext } from 'react';

import { useHistory } from 'react-router-dom';

import { SearchContext } from '../../shared/context/search-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { PurchaseContext } from '../context/purchase-context';


const Image = props => {

    const { basketContent } = useContext(PurchaseContext);
    const { id, image, name } = props.file;
    const { search } = useContext(SearchContext);


    const history = useHistory();
    const clickHandle = async (e) => {

        const { alt } = e.target;
        try {
            search(basketContent, name)
            history.push('/searchresults')
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <div onClick={clickHandle}>
            <img
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