import * as types from "./type";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export const fetchProductsBegin = () => ({
  type: types.FETCH_PRODUCTS_BEGIN,
});

export const receiveProducts = (products) => ({
  type: types.RECEIVE_PRODUCTS,
  products,
});

export const addToCart = (product, qty, startDate, endDate, adult, child, room,nights) => (dispatch) => {
  console.log("add to cart action",product,qty,startDate,endDate,adult,child,room,)
  toast.success("Room Added to Your Cart");
  dispatch({
    type: types.ADD_TO_CART,
    product,
    qty,
    startDate,
    endDate,
    adult,
    child,
    room,
    nights,
  });
};

export const removeFromCart = (product_id) => (dispatch) => {
  toast.success("Room Removed from Cart");
  dispatch({
    type: types.REMOVE_FROM_CART,
    product_id,
  });
};

export const incrementQuantity = (product_id) => (dispatch) => {
  dispatch({
    type: types.INCREMENT_QUANTITY,
    product_id,
  });
};

export const decrementQuantity = (product_id) => (dispatch) => {
  dispatch({
    type: types.DECREMENT_QUANTITY,
    product_id,
  });
};

export const addToWishList = (product) => (dispatch) => {
  dispatch({
    type: types.ADD_TO_WISHLIST,
    product,
  });
};

export const removeFromWishList = (id) => (dispatch) => {
  toast.error("Item removed from WishList");
  dispatch({
    type: types.REMOVE_FROM_WISHLIST,
    id,
  });
};

export const addToCompareList = (product) => (dispatch) => {
  dispatch({
    type: types.ADD_TO_COMPARE,
    product,
  });
};

export const removeFromCompareList = (product) => (dispatch) => {
  dispatch({
    type: types.REMOVE_FROM_COMPARE_LIST,
    product,
  });
};
