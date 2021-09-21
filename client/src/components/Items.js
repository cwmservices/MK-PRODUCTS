import React, { useContext } from 'react';
import { ContextApi } from '../App';

function Items({ id, title, price, quantity, img }) {

    const { removeItem, increment, decrement } = useContext(ContextApi);

    return (
        <>
            <div class="card" style={{ "width": "350px","margin":"5px auto"}}>
                <img src={img} style={{"width":"320px","height":"320px","marginLeft":"15px"}} class="card-img-top" alt="image" />
                <div class="card-body">
                    <h3>{title}</h3>
                    <h5>{price}$</h5>
                    <i onClick={()=>{decrement(id)}} class="fas fa-minus" style={{"background":"orange","color":"white","padding":"5px 10px"}}></i>
                    <span style={{"border":"1px solid black","padding":"0px 30px","margin":"7px 4px"}}>{quantity}</span>
                    <i onClick={()=>{increment(id)}} class="fas fa-plus" style={{"background":"orange","color":"white","padding":"5px 10px"}}></i>
                    <i onClick={()=>removeItem(id)} class="fas fa-trash-alt" style={{"background":"white","color":"red","padding":"5px 10px","marginLeft":"110px"}}></i>
                </div>
            </div>
        </>
    )
}

export default Items;
