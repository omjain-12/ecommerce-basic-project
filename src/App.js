import Header from "./components/Header/Header";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import AddProduct from "./components/AddProduct/AddProduct";
import AppProvider from "./store/AppProvider";

function App() {
  return (
    <>
      <AppProvider>
        <Header />
        <Products />
        <Cart />
        <AddProduct />
      </AppProvider>
    </>
  );
}

export default App;
