import AppContext from "./App-Context";
import { useEffect, useState } from "react";
function AppProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const openCart = () => setShowCart(true);
  const closeCart = () => setShowCart(false);

  const openAddProduct = () => setShowAddProduct(true);
  const closeAddProduct = () => setShowAddProduct(false);

  const handleAddToCart = (productId, productName, productImg) => {
    const productInCartIndex = cartItems.findIndex(
      (item) => item.id === productId
    );
    if (productInCartIndex === -1) {
      setCartItems((prev) => [
        ...prev,
        { id: productId, name: productName, image: productImg, quantity: 1 },
      ]);
    } else {
      const newCartItems = [...cartItems];
      newCartItems[productInCartIndex].quantity += 1;
      setCartItems(newCartItems);
    }
  };

  const handleIncreaseQuantity = (productId) => {
    const productIndex = cartItems.findIndex((item) => item.id === productId);
    if (productIndex === -1) return;
    const newCartItems = [...cartItems];
    newCartItems[productIndex].quantity += 1;
    setCartItems(newCartItems);
  };

  const handleDecreaseQuantity = (productId) => {
    const productIndex = cartItems.findIndex((item) => item.id === productId);
    if (productIndex === -1) return;
    let newCartItems = [...cartItems];
    if (newCartItems[productIndex].quantity === 1) {
      newCartItems = newCartItems.filter((item) => item.id !== productId);
    } else {
      newCartItems[productIndex].quantity -= 1;
    }
    setCartItems(newCartItems);
  };

  const handleAddProduct = (productName) => {
    const newProduct = {
      id: products.length + 1,
      name: productName,
      image: "default_produ ct.png",
    };
    sendProductData(newProduct);
    setProducts((state) => {
      return { ...state, [Object.keys(state).length + 1]: newProduct };
    });
    closeAddProduct();
  };
  const sendProductData = async (newProduct) => {
    const response = await fetch(
      "https://reactstore-7552b-default-rtdb.firebaseio.com/products.json",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newProduct),
      }
    );
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://reactstore-7552b-default-rtdb.firebaseio.com/products.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const allValues = {
    showCart,
    cartItems,
    products,
    showAddProduct,
    isLoading,
    onCartClick: openCart,
    onAddProductClick: openAddProduct,
    onAddToCart: handleAddToCart,
    closeCart,
    onDecQuantity: handleDecreaseQuantity,
    onIncQuantity: handleIncreaseQuantity,
    closeAddProduct,
    onAddProduct: handleAddProduct,
  };
  return (
    <AppContext.Provider value={allValues}>{children}</AppContext.Provider>
  );
}

export default AppProvider;
