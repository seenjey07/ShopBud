import { useState } from "react";
import { v4 as uuid } from "uuid";
import ShopItem from "./ShopItem";

const ShopBud = () => {
  const [item, setItem] = useState("");
  const [listItems, setListItems] = useState([]);

  const handleAddItem = (e) => {
    e.preventDefault();

    if (!item) {
      alert("Please enter an item.");
      return;
    }

    setListItems([...listItems, { id: uuid(), itemName: item }]);
    setItem("");
  };

  const handleEditItem = (id, newItemName) => {
    const updatedItem = listItems.map((item) => {
      if (item.id === id) {
        return { ...item, itemName: newItemName };
      }
      return item;
    });
    setListItems(updatedItem);
  };

  const handleDeleteItem = (id) => {
    setListItems(listItems.filter((listItem) => listItem.id !== id));
  };

  return (
    <>
      <div className="flex flex-col align-center min-w-60 max-w-96 min-h-80 max-h-96 p-4 bg-blue-100 rounded-lg shadow-md overflow-auto">
        <h1 className="text-xl md:text-2xl xl:text-3xl font-bold mb-5 text-center text-blue-800">
          🛒ShopBud
        </h1>
        <div className="flex flex-col justify-between w-full">
          <div className="flex justify-between mb-4">
            <input
              className="p-1 text-xs md:text-sm xl:text-md font-thin rounded bg-white text-black border-2 border-gray-100 outline-none"
              type="text"
              placeholder="Enter item..."
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />

            <button
              className="ml-4 py-1 px-2 text-xs font-semibold text-black bg-yellow-400 border-2 border-yellow-300 rounded cursor-pointer"
              onClick={handleAddItem}
            >
              Add Item
            </button>
          </div>
          <div>
            <ul className="w-full">
              {listItems.map((item) => (
                <ShopItem
                  key={item.id}
                  id={item.id}
                  itemName={item.itemName}
                  handleEditItem={handleEditItem}
                  handleDeleteItem={handleDeleteItem}
                />
              ))}
            </ul>
          </div>

          {listItems.length >= 1 ? (
            <button
              className="m-auto mt-4 py-1 px-2 text-xs font-semibold border-solid bg-green-500 text-black rounded cursor-pointer border-2 border-green-400"
              onClick={() => setListItems([])}
            >
              Clear List
            </button>
          ) : (
            <span className="m-auto mt-4 text-xs md:text-sm xl:text-md">
              Add your first item 🛍️
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default ShopBud;
