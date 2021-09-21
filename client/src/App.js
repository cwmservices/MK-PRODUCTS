import React, { createContext, useDebugValue, useEffect, useReducer } from 'react';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Header from './components/Header';
import { reducer } from './Reducer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ErrorPage from './components/ErrorPage';
import Logout from './components/Logout';
import Contact from './components/Contact';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';


export const ContextApi = createContext();

function App() {

    const initialState = {
        products: [],
        totalAmount: 25600,
        totalItems: 0,
        quantity: 1,
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const pageLoaded = async () => {
        try {
            const res = await fetch('/products', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            const data = await res.json();

            dispatch({
                type: 'FETCH_DATA',
                payload: data
            })

            if (!res.status === 200) {
                console.log('error');
            }

        } catch (e) {
            console.log(console.error);
        }
    }

    useEffect(() => {
        pageLoaded();
    }, [])

    const removeItem = (id) => {
        return dispatch({
            type: "REMOVE_ITEM",
            payload: id
        })
    }

    const increment = (id) => {
        return dispatch({
            type: "INCREMENT",
            payload: id
        })
    }

    const decrement = (id) => {
        return dispatch({
            type: "DECREMENT",
            payload: id
        })
    }

    useEffect(() => {
        dispatch({ type: "GET_TOTAL" });
    }, [state.products]);


    return (
        <>
            <ContextApi.Provider value={{ ...state, removeItem, increment, decrement }}>
                <BrowserRouter>
                    <Header />
                    <Switch>
                        <Route exact path="/">
                            <Cart />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route path="/logout">
                            <Logout />
                        </Route>
                        <Route path="/contact">
                            <Contact />
                        </Route>
                        <Route>
                            <ErrorPage />
                        </Route>
                    </Switch>
                    <Footer />
                </BrowserRouter>

            </ContextApi.Provider>
        </>
    )
}

export default App;
