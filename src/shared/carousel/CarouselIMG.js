import React, { useContext } from 'react';

import { useHistory } from 'react-router-dom';

import { SearchContext } from '../../shared/context/search-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

const CarouselIMG = props => {

    const search = useContext(SearchContext);
    const { sendRequest } = useHttpClient();


    const history = useHistory();

    let content;
    const clickHandle = async () => {
        try {
            content = props.code
            const responseData = await sendRequest(`http://localhost:2000/api/products/numbers/${content}`)//need to change the url we send the req to
            search.products = responseData.products
            history.push('/searchresults')

        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div
            className={props.className}
            onClick={clickHandle}
        >
            <a type='button' onClick={clickHandle}>
                <img
                    src={`http://localhost:2000/${props.image}`}
                    alt={props.name}
                />
            </a>
        </div>

    )
}



export default CarouselIMG;