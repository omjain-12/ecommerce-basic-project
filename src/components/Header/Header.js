import "./Header.css";
import { useContext } from "react";
import AppContext from "../../store/App-Context";

function Header() {
  const { onCartClick, onAddProductClick } = useContext(AppContext);
  return (
    <header className="header">
      <h1>My React Store</h1>
      <div>
        <button
          className="yellow-button"
          onClick={onAddProductClick}
          style={{ marginRight: "20px" }}
        >
          Add Product
        </button>
        <button className="yellow-button" onClick={onCartClick}>
          Cart
        </button>
      </div>
    </header>
  );
}

export default Header;
