import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { useCart } from '../context/CartContext';
import './../assets/css/booking/ShoppingCart.css';

function ShoppingCart() {
    const { cartItems, removeFromCart, updateQuantity } = useCart();
    const navigate = useNavigate();

    const [subtotal, setSubtotal] = useState(0);
    const [taxes, setTaxes] = useState(0);
    const [total, setTotal] = useState(0);

    const TAX_RATE = 0.21;

    useEffect(() => {
        const newSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const newTaxes = newSubtotal * TAX_RATE;
        const newTotal = newSubtotal + newTaxes;
        
        setSubtotal(newSubtotal);
        setTaxes(newTaxes);
        setTotal(newTotal);
    }, [cartItems]);

    const handleCheckout = () => {
        // Navegar al formulario de checkout, pasando el estado del carrito
        navigate('/checkout', { state: { cartItems } });
    };

    return (
        <div id="wrapper">
            <Header />
            <div className="shopping-cart-page">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <h2>Tu Carrito de Compras</h2>
                            <hr className="mb-4" />
                            {cartItems.length > 0 ? (
                                cartItems.map(item => (
                                    <div className="cart-item" key={item.cartId}>
                                        <div className="cart-item-image">
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                        <div className="cart-item-details">
                                            <h4>{item.name}</h4>
                                            <p>{item.location}</p>
                                        </div>
                                        <div className="cart-item-quantity">
                                            <button onClick={() => updateQuantity(item.cartId, -1)}>
                                                <FontAwesomeIcon icon={faMinus} />
                                            </button>
                                            <span className="quantity">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.cartId, 1)}>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </button>
                                        </div>
                                        <div className="cart-item-price">
                                            {(item.price * item.quantity).toFixed(2)} €
                                        </div>
                                        <div className="cart-item-remove">
                                            <button onClick={() => removeFromCart(item.cartId)}>
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Tu carrito está vacío.</p>
                            )}
                        </div>

                        <div className="col-lg-4">
                            <div className="order-summary">
                                <h3>Resumen del Pedido</h3>
                                <div className="summary-row">
                                    <span>Subtotal</span>
                                    <span>{subtotal.toFixed(2)} €</span>
                                </div>
                                <div className="summary-row">
                                    <span>Impuestos (21%)</span>
                                    <span>{taxes.toFixed(2)} €</span>
                                </div>
                                <div className="summary-row total">
                                    <span>Total</span>
                                    <span>{total.toFixed(2)} €</span>
                                </div>
                                <button className="btn-checkout mt-4" onClick={handleCheckout} disabled={cartItems.length === 0}>
                                    Continuar con la reserva
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ShoppingCart;
