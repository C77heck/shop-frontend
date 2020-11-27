import React, { useContext } from 'react';

import { useHistory } from 'react-router-dom';

import { SearchContext } from '../../shared/context/search-context';
import { useHttpClient } from '../../shared/hooks/http-hook';


const Image = props => {
    const { id, image, name, code } = props.file;
    const search = useContext(SearchContext);
    const { sendRequest } = useHttpClient();


    const history = useHistory();
    const clickHandle = async (e) => {

        const { alt } = e.target;
        console.log(e.target.alt)
        try {

            const responseData = await sendRequest(
                process.env.REACT_APP_SEARCH_ROUTE2 + alt
            )
            search.products = responseData.products
            if (search.products.length > 0) {
                localStorage.setItem(
                    'searchedItems',
                    JSON.stringify({
                        searches: search.products
                    })
                );
                history.push('/')
                history.push('/searchresults')

            }

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