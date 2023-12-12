// OrderPlacementForm.js
import React, { useState } from 'react';
import burger from '../assets/burger.jpeg'
import pizza from '../assets/pizza.jpeg'

const OrderPlacementForm = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleToggleItem = (itemId) => {
    setSelectedItems((prevItems) => {
      if (prevItems.includes(itemId)) {
        return prevItems.filter((id) => id !== itemId);
      } else {
        return [...prevItems, itemId];
      }
    });
  };

  const renderFoodItems = () => {
    // Replace this data with actual data from your API
    const foodItems = [
      { id: 1, name: 'Burger', image: `${burger}` },
      { id: 2, name: 'Pizza', image: `${pizza}` },
      // Add more items as needed
    ];

    return foodItems.map((item) => (
      <div key={item.id} className={`food-card ${selectedItems.includes(item.id) ? 'selected' : ''}`} onClick={() => handleToggleItem(item.id)}>
        <img src={item.image} alt={item.name} />
        <h3>{item.name}</h3>
      </div>
    ));
  };

  return (
    <div className="food-cards-container">
      <h2>Place Your Order</h2>
      <div className="food-cards">
        {renderFoodItems()}
      </div>
      {/* Display selected items */}
      <div className="selected-items">
        <h3>Selected Items</h3>
        <ul>
          {selectedItems.map((itemId, index) => (
            <li key={index}>Item {itemId} - Quantity: 1</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderPlacementForm;
