// import {
//   ADD_TO_CART,
//   DECREMENT_QUANTITY,
//   INCREMENT_QUANTITY,
//   REMOVE_FROM_CART,
// } from "../actions/type";
// import { minValueOne } from "../../utils";

// const initialState = {
//   cart: [],
// };

// export const cartReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_TO_CART:
//       const productIdToAdd = action.product.id;
//       const productQtyToAdd = action.qty ? action.qty : 1;
//       const existingProductIndex = state.cart.findIndex(
//         (product) => product.id === productIdToAdd
//       );

//       if (existingProductIndex !== -1) {
//         // Product already exists in cart, update quantity
//         const updatedCart = state.cart.map((product, index) => {
//           if (index === existingProductIndex) {
//             return {
//               ...product,
//               selected_color: action.color,
//               selected_size: action.size,
//               qty: product.qty + productQtyToAdd,
//               sum: product.price * action.nights * action.room,
//                 // ((product.price * product.discount) / 100) *
//                 // (product.qty + productQtyToAdd),
//               startDate: action.startDate,
//               endDate: action.endDate,
//               adult: action.adult,
//               child: action.child,
//               room: action.room,
//               nights: action.nights,
//               grossTotal: product.price || 1 * action.nights * action.room,
//             };
//           }
//           return product;
//         });

//         return { ...state, cart: updatedCart };
//       } else {
//         // Product does not exist in cart, add new product
//         const newProduct = {
//           ...action.product,
//           selected_color: action.color,
//           selected_size: action.size,
//           qty: productQtyToAdd,
//           sum:
//             ((action.product.price * action.product.discount) / 100) *
//             productQtyToAdd,
//           startDate: action.startDate,
//           endDate: action.endDate,
//           adult: action.adult,
//           child: action.child,
//           room: action.room,
//           nights: action.nights,
//         };

//         return {
//           ...state,
//           cart: [...state.cart, newProduct],
//         };
//       }

//     case REMOVE_FROM_CART:
//       const productIdToRemove = action.product_id;
//       const updatedCartAfterRemove = state.cart.filter(
//         (item) => item.id !== productIdToRemove
//       );
//       return { ...state, cart: updatedCartAfterRemove };

//     case INCREMENT_QUANTITY:
//       const productIdToIncrement = action.product_id;
//       const updatedCartAfterIncrement = state.cart.map((product) => {
//         if (product.id === productIdToIncrement) {
//           return {
//             ...product,
//             qty: product.qty + 1,
//           };
//         }
//         return product;
//       });
//       return { ...state, cart: updatedCartAfterIncrement };

//     case DECREMENT_QUANTITY:
//       const productIdToDecrement = action.product_id;
//       const updatedCartAfterDecrement = state.cart.map((product) => {
//         if (product.id === productIdToDecrement) {
//           return {
//             ...product,
//             qty: minValueOne(product.qty - 1),
//           };
//         }
//         return product;
//       });
//       return { ...state, cart: updatedCartAfterDecrement };

//     default:
//       return state;
//   }
// };

// export default cartReducer;
//above code is from chatGPT





import {
  ADD_TO_CART,
  DECREMENT_QUANTITY,
  INCREMENT_QUANTITY,
  REMOVE_FROM_CART,
} from "../actions/type";
import { minValueOne } from "../../utils";

const init = {
  cart: [],
};

export const cartReducer = (state = init, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const productId = action.product.id;
      const productQty = action.qty ? action.qty : 1;
      if (state.cart.findIndex((product) => product.id === productId) !== -1) {
        const cart = state.cart.reduce((cartAcc, product) => {
          if (product.id === productId) {
            cartAcc.push({
              ...product,
              selected_color: action.color,
              selected_size: action.size,
              qty: product.qty + productQty,
              startDate: action.startDate,
              child: action.child,
              room: action.room,
              nights: action.nights,
              endDate: action.endDate,
              adult: action.adult,
              sum:
              (action.product.basePrice * action.room * action.nights) || 0,
            }); // Increment qty
          } else {
            cartAcc.push(product);
          }

          return cartAcc;
        }, []);

        return { ...state, cart };
      }

      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...action.product,
            selected_color: action.color,
            selected_size: action.size,
            qty: action.qty,
            startDate: action.startDate,
            adult: action.adult,
            child: action.child,
            room: action.room,
            nights: action.nights,
            endDate: action.endDate,
            sum:
              (action.product.basePrice * action.room * action.nights)|| 0,
          },
        ],
      };

    case REMOVE_FROM_CART:
      return {
        cart: state.cart.filter((item) => item.id !== action.product_id),
      };

    case INCREMENT_QUANTITY:
      const inc_productId = action.product_id;
      const new_cart = state.cart.reduce((cartAcc, product) => {
        if (product.id === inc_productId) {
          cartAcc.push({
            ...product,
            qty: product.qty + 1,
          });
        } else {
          cartAcc.push(product);
        }
        return cartAcc;
      }, []);
      return { ...state, cart: new_cart };

    case DECREMENT_QUANTITY:
      const decProductId = action.product_id;
      const decCart = state.cart.reduce((cartAcc, product) => {
        if (product.id === decProductId) {
          cartAcc.push({
            ...product,
            qty: minValueOne(product.qty - 1),
          });
        } else {
          cartAcc.push(product);
        }
        return cartAcc;
      }, []);

      return { ...state, cart: decCart };

    default:
      return state;
  }
};

export default cartReducer;




