import { useState } from "react";
import { v4 as uuid } from "uuid";
import ShopItem from "./ShopItem";

const ShopBud = () => {
  const [item, setItem] = useState("");
  const [listItems, setListItems] = useState([]);
  const [editItem, setEditItem] = useState("");

  const handleAddItem = (e) => {
    e.preventDefault();
    setListItems([...listItems, { id: uuid(), itemName: item }]);
    setItem("");
  };

  const handleEditItem = (e) => {
    e.preventDefault();

    if (editItem) {
      setListItems(
        listItems.map((listItem) => {
          if (listItem.id === editItem.id) {
            return { ...listItem, itemName: item };
          }
          return listItem;
        })
      );
      setEditItem("");
      setItem("");
    }
  };

  const handleDeleteItem = (id) => {
    setListItems(listItems.filter((listItem) => listItem.id !== id));
  };

  return (
    <>
      <div className="flex flex-col align-center w-full max-w-3xl p-4 bg-blue-100 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-5 text-center text-blue-800">
          🛒ShopBud
        </h1>
        <div className="flex flex-col justify-between w-full">
          <div className="flex justify-between mb-4">
            <input
              className="flex-grow p-1 text-sm font-thin rounded bg-white text-black border-none outline-none"
              type="text"
              placeholder="Enter item..."
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />

            <button
              className="ml-4 py-1 px-2 text-xs font-semibold text-black bg-yellow-400 border-none rounded cursor-pointer"
              onClick={handleAddItem}
            >
              Add Item
            </button>

            {/* <button
              className="ml-2 py-1.5 px-3.5 text-xs font-semibold text-black bg-orange-400 border-none rounded cursor-pointer"
              onClick={handleEditItem}
            >
              Edit
            </button>

            <button
              className="ml-2 py-1 px-2 text-xs font-semibold text-black bg-red-500 border-none rounded cursor-pointer"
              onClick={handleDeleteItem}
            >
              Delete
            </button> */}
          </div>
          <div className="flex justify-between mb-2">
            <ul>
              {listItems.map((item) => (
                <ShopItem
                  key={item.id}
                  itemName={item.itemName}
                  onEdit={() => handleEditItem(item.itemName)}
                  onDelete={() => handleDeleteItem(item.id)}
                />
              ))}
            </ul>
          </div>
          <button
            className="m-auto mt-4 py-1 px-2 text-xs font-semibold border-solid bg-green-500 text-black rounded cursor-pointer"
            onClick={() => setListItems([])}
          >
            Clear List
          </button>
        </div>
      </div>
    </>
  );
};

export default ShopBud;
