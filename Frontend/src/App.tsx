import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState<{ name: string; price: number }[]>(
    []
  );

  useEffect(() => {
    fetch("https://localhost:5001/api/products")
      .then((response) => response.json)
      .then((data) => setProducts(data));
  }, []);

  const addProduct = () => {
    setProducts((prev) => [
      ...prev,
      { name: "Product" + (prev.length + 1), price: (prev.length + 1) * 100 },
    ]);
  };

  return (
    <div>
      <h1>eCommerce</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
}

export default App;
