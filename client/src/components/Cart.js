import { React, useContext, useEffect, useState } from 'react';
import Items from './Items';
import { ContextApi } from '../App';

const Cart = () => {

    const { products } = useContext(ContextApi);

    return (
        <>
            <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="images/amazonbanner.jpg" class="d-block w-100" alt="banner" />
                    </div>
                </div>
            </div>
            <h1 id="shop" style={{"textAlign":"center","fontFamily":"fantasy","color":"orange","background":"black"}}>SHOPPING CART</h1>
            <div style={{ "display": "flex", "flexWrap": "wrap", "justifyContent": "space-between" }}>
                {
                    products.map((curentObj) => {
                        return (
                            <Items
                                {...curentObj}
                            />)
                    })
                }
            </div>
        </>)
}

export default Cart
