export const reducer = (state,action)=>{
    if(action.type==='FETCH_DATA'){
        return {products:action.payload};
    }
    if(action.type==='REMOVE_ITEM'){
        return {
            ...state,
            products: state.products.filter((currentItem)=>{
                return currentItem.id != action.payload
            }),
        };
    }
    if(action.type==='INCREMENT'){
        let updatedCart = state.products.map((currentItem)=>{
            if(currentItem.id===action.payload){
                return {...currentItem,quantity:currentItem.quantity+1};
            }
            return currentItem;
        })
        return {...state,products:updatedCart};
    }
    if(action.type==='DECREMENT'){
        let updatedCart = state.products.map((currentItem)=>{
            if(currentItem.id===action.payload){
                return {...currentItem,quantity:currentItem.quantity-1};
            }
            
            return currentItem;

        }).filter((currentItem)=> currentItem.quantity != 0);

        return {...state,products:updatedCart}; 
    }
    if (action.type === "GET_TOTAL") {
        let { totalItems, totalAmount } = state.products.reduce(
          (accum, curVal) => {
            let { price, quantity } = curVal;
    
            let updatedTotalAmount = price * quantity;
            accum.totalAmount += updatedTotalAmount;
    
            accum.totalItems += quantity;
            return accum;
          },
          {
            totalItems: 0,
            totalAmount: 0,
          }
        );
        return { ...state, totalItems, totalAmount };
      }
    return state;
}