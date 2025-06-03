import React, { useContext } from "react";
import "./Products.css";
import AppContext from "../../store/App-Context";

export function Product({ id, name, image, onAddToCart }) {
  return (
    <div key={id} className="product">
      <img src={require(`../../assets/${image}`)} alt={name} />
      <div className="product-name">{name}</div>
      <button onClick={() => onAddToCart(id, name, image)}>Add to cart</button>
    </div>
  );
}

function Products() {
  const { products, isLoading } = useContext(AppContext);

  if (isLoading) return <p className="isloading">Loading Products...</p>;
  return (
    <div className="products-container">
      {Object.keys(products).map((k) => (
        <Product
          key={k}
          id={products[k].id}
          name={products[k].name}
          image={products[k].image}
        />
      ))}
    </div>
  );
}

export default Products;
