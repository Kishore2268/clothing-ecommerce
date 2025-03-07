import React from "react";
import CartItem from "./CartItem";
import { Badge, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./Cart.css"
import { getCart } from "../../../Redux/Customers/Cart/Action";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const { cart } = useSelector(store => store);
  console.log("cart ", cart);

  useEffect(() => {
    dispatch(getCart(jwt));
  }, [jwt]);

  if (cart.cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <img className="h-48 w-48 object-cover" src="https://imgs.search.brave.com/sNUiiIvHNPUINkt7Gf9x12JaJ8vUN6jgMNqrmEFpptM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM3/MDM3MzI3Ni92ZWN0/b3Ivc2FkLWZhY2Ut/ZW1vamkuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPVlYUzds/amNISE9PeFVsOVF3/cGNBNnA1eEFZWmlG/bnJ4VmZ6ZzZ3RmVZ/Ync9" alt="Empty Cart" />
        <h2>Your cart is empty!</h2>
        <Button onClick={() => navigate('/')}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="">
      <div className="lg:grid grid-cols-3 lg:px-16 relative">
        <div className="lg:col-span-2 lg:px-5 bg-white">
          <div className="space-y-3">
            {cart.cartItems.map((item) => (
              <CartItem key={item.id} item={item} showButton={true} />
            ))}
          </div>
        </div>
        <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0 ">
          <div className="border p-5 bg-white shadow-lg rounded-md">
            <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
            <hr />
            <div className="space-y-3 font-semibold">
              <div className="flex justify-between pt-3 text-black ">
                <span>Price ({cart.cart?.totalItem} item)</span>
                <span>₹{cart.cart.totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-700">-₹{cart.cart?.discounte}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-green-700">Free</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span className="text-green-700">₹{cart.cart?.totalDiscountedPrice}</span>
              </div>
            </div>
            <Button
              onClick={() => navigate("/checkout?step=2")}
              variant="contained"
              type="submit"
              sx={{ padding: ".8rem 2rem", marginTop: "2rem", width: "100%" }}
            >
              Check Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
