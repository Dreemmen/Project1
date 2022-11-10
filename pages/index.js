import Head from 'next/head'
import Image from 'next/image'
import { Toopbar, Topbar } from '../components/topbar';
import { useState } from 'react';

//header, menu will be component

export default function Home({  }) {
    const [products] = useState([{
        sku:'11111',
        name:'test1',
        type:'tips',
        price:'1.99',
        params:'parametrs'

    }]);

    // console.log(products);
    
    return (
        <div className='pagewrapper verticalcenter'>
        <Topbar />
            <form id="mass_delete_form" action="" method="post">
                {products.map((product, index) => (
                    <div key={index} className="flex-box">
                        <input type="checkbox" name="nameOfChoice[]" className="delete-checkbox" value="<?php echo $item['sku']; ?>" />
                        <div><b>{product.sku}</b></div>
                        <div>{product.name}</div>
                        <div>{product.productType}</div>
                        <div>{product.price}</div>
                        <div>{product.params}</div>
                    </div>
                ))}
            <input name="submit_condition" type="hidden" value="1" />
            </form>
        </div>
  )
}

/*
export const getServersSideProps = async pageContext => {
    const apiResponse await fetch();
}
*/