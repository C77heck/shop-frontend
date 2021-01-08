import React from 'react';

import CreateProduct from '../components/CreateProduct'
import UpdateProduct from '../components/UpdateProduct'
import DeleteProduct from '../components/DeleteProduct'

const Admin = () => {

    return (
        <div className='admin-flex__container'>
            <CreateProduct />
            <UpdateProduct />
            <DeleteProduct />
        </div>
    )

}


export default Admin;