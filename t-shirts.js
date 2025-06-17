const data = [
  {
    title: 'Blue T-Shirt',
    image: 'blue-t-shirt.jpg',
    price: 7.99,
    stock: 4,
    quantity: 1
  },
  {
    title: 'Bright Purple T-Shirt',
    image: 'bright-purple-t-shirt.jpg',
    price: 5.99,
    stock: 1,
    quantity: 1
  },
  {
    title: 'Cobalt Blue T-Shirt',
    image: 'cobalt-blue-t-shirt.jpg',
    price: 9.99,
    stock: 5,
    quantity: 1
  },
  {
    title: 'Green T-Shirt',
    image: 'green-t-shirt.jpg',
    price: 6.99,
    stock: 0,
    quantity: 1
  },
  {
    title: 'Grey T-Shirt',
    image: 'blue-t-shirt.jpg',
    price: 4.99,
    stock: 2,
    quantity: 1
  },
  {
    title: 'Light Green T-Shirt',
    image: 'light-green-t-shirt.jpg',
    price: 7.99,
    stock: 4,
    quantity: 1
  },
  {
    title: 'Purple T-Shirt',
    image: 'purple-t-shirt.jpg',
    price: 7.99,
    stock: 0,
    quantity: 1
  },
  {
    title: 'Red T-Shirt',
    image: 'red-t-shirt.jpg',
    price: 6.99,
    stock: 3,
    quantity: 1
  },
  {
    title: 'Teal T-Shirt',
    image: 'teal-t-shirt.jpg',
    price: 7.99,
    stock: 2,
    quantity: 1
  }
]
// TShirt List Component
// #5 Destructuring the shirts prop to access the array of t-shirts
const ShirtCard = ({ tshirt, handleBuyShirt }) => {
  const [selectedQuantity, setSelectedQuantity] = React.useState(tshirt.quantity);
  // Creates an array of available stock numbers for the select options
  const stockOptions = [];
  for (let i = 1; i <= tshirt.stock; i++) {
    stockOptions.push(i);
  }
  // Function to handle the buy button click
  const handleBuyButtonClick = () => {
    handleBuyShirt(tshirt, selectedQuantity);
    setSelectedQuantity(1); // Resetting the selected quantity after purchase
  }
  return (
    <div key={tshirt.title} className="tshirt-card">
      <img src={`images/${tshirt.image}`} alt={tshirt.title} />
      <h2>{tshirt.title}</h2>
      <p className="price">${tshirt.price.toFixed(2)}</p>
      {
        // Conditional rendering based on stock availability
        tshirt.stock > 0 ? (
          <p>{tshirt.stock} left!</p>
        ) : (
          <span className="out-of-stock">Out of stock</span>
        )
      }
      {
        tshirt.stock > 0 && (
          <div className="tshirt-dropdown">
            <select className="quantity"
              value={selectedQuantity}
              onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}>
              {
                // Dynamically generating options based on stock
                stockOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))
              }
            </select>
            <button className="buy" onClick={handleBuyButtonClick}>
              Buy
            </button>
          </div>
        )
      }
    </div>
  )
}


// #1 Parent Component
const App = () => {
  // Initial state for the t-shirts using the data array
  const [shirts, setShirts] = React.useState(data);

  // #4 Function to handle the purchase of a shirt
  const handleBuyShirt = (shirt, purchaseQuantity) => {
    // Extra validation to check if the shirt is in stock
    if (shirt.stock === 0) {
      alert('Out of Stock!');
      return;
    }
    // Update the stock of the shirt by reducing it by the purchase quantity
    setShirts(prevState => {
      return prevState.map((s) => {
        if (s.title === shirt.title) {
          return { ...s, stock: s.stock - purchaseQuantity };
        }
        return s;
      });
    });
  }

  //#3 Structure of the App component that will display the t-shirts
  return (
    <div className="container">
      <h1 className="title">T-Shirts</h1>
      {/* <ShirtList shirts={data} /> */}
      <div className="tshirt-list-grid">
        {shirts.map((tshirt) => (
          <ShirtCard key={tshirt.title} tshirt={tshirt} handleBuyShirt={handleBuyShirt} />
        ))}
      </div>
    </div>
  )
}

//#2 Root element for React in the DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
//Render the App component into the root element
root.render(<App />);