import { createContext } from "react";

const AppContext = createContext({
  showCart: false,
  cartItems: [],
  products: [],
  showAddProduct: false,
  isLoading:false,
  onCartClick: () => {},
  onAddProductClick: () => {},
  onAddToCart: () => {},
  closeCart: () => {},
  onDecQuantity: () => {},
  onIncQuantity: () => {},
  closeAddProduct: () => {},
  onAddProduct: () => {},
});

export default AppContext;
