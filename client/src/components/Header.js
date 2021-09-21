import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { ContextApi } from '../App';
import StripeCheckout from "react-stripe-checkout";


const Header = () => {
    const { totalItems, totalAmount } = useContext(ContextApi);

    const [product, setProduct] = useState({
        name: "Shoping Cart Items",
        price: totalAmount ,
        productBy: "Masood Khan"
    });

    console.log(product.price);

    const makePayment = token => {
        const body = {
            token,
            product
        };
        const headers = {
            "Content-Type": "application/json"
        };

        return fetch('/charge', {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        })
            .then(response => {
                console.log("RESPONSE ", response);
                const { status } = response;
                console.log("STATUS ", status);
            })
            .catch(error => console.log(error));
    };

    return (<>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ "position": "sticky", "top": "0", "z-index": "9999" }}>
            <div className="container-fluid">
                <NavLink to="/" style={{ "textDecoration": "none" }}><a style={{ "fontFamily": "fantasy", "color": "orange" }} className="navbar-brand">MK PRODUCTS</a></NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to="/" style={{ "textDecoration": "none" }}><a className="nav-link">Home</a></NavLink>
                        </li>
                        <li className="nav-item">
                            <a href="#shop" style={{ "textDecoration": "none" }} className="nav-link">Shop</a>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/contact" style={{ "textDecoration": "none" }}><a className="nav-link">Contact</a></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/login" style={{ "textDecoration": "none" }}><a className="nav-link">LogIn</a></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/register" style={{ "textDecoration": "none" }}><a className="nav-link">SignUp</a></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/logout" style={{ "textDecoration": "none" }}><a className="nav-link">LogOut</a></NavLink>
                        </li>
                        <li className="nav-item">
                            <i style={{ "color": "orange", "fontSize": "20px" }} className="fas fa-cart-plus nav-link"><span style={{ "color": "white" }}>{totalItems}</span></i>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" style={{ "color": "yellow" }}>CART TOTAL:<span>{totalAmount}$</span></a>
                        </li>
                        <li className="nav-item">
                            <StripeCheckout
                                stripeKey="pk_test_51JBjbICMhsQwgAJ0LdCKWBh2rb5yA0JkGkDouRjTbs9JFMo0ROKWllIWgVZ9Vlds3GzWmjD5W1mZqwKIJdtmWQEV00caz3pu2m"
                                token={makePayment}
                                name="Shop Store"
                                amount={totalAmount*100}
                                // shippingAddress
                                // billingAddress
                            >
                                <button className="btn btn-primary">
                                    PROCEED TO CHECKOUT {totalAmount} $
                                </button>
                            </StripeCheckout>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
    )
}

export default Header
