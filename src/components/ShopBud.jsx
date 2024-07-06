import { useState } from "react";
import { v4 as uuid } from "uuid";
import ShopItem from "./ShopItem";

const ShopBud = () => {
  const [item, setItem] = useState("");
  const [listItems, setListItems] = useState([]);
  const [error, setError] = useState("");

  const handleAddItem = (e) => {
    e.preventDefault();

    const trimmedItem = item.trim().toLowerCase();

    if (!trimmedItem && listItems.length === 0) {
      setError("You haven't added any items yet.");
      clearErrorAfterTimeout();
      return;
    }

    if (trimmedItem === "") {
      setError("Please add a valid item.");
      clearErrorAfterTimeout();
      return;
    }

    if (listItems.find((listItem) => listItem.itemName === trimmedItem)) {
      setError("Item already on list. Please add a different one.");
      setItem("");
      clearErrorAfterTimeout();
      return;
    }

    setListItems([...listItems, { id: uuid(), itemName: trimmedItem }]);
    setItem("");
    setError("");
  };

  const handleEditItem = (id, newItemName) => {
    const trimmedNewItemName = newItemName.trim().toLowerCase();

    if (trimmedNewItemName === "") {
      setError("Please add a valid item.");
      clearErrorAfterTimeout();
      return;
    }

    if (listItems.some((item) => item.itemName === trimmedNewItemName)) {
      setError("Item already on list. Please add a different one.");
      clearErrorAfterTimeout();
      return;
    }

    const updatedItems = listItems.map((item) => {
      if (item.id === id) {
        return { ...item, itemName: trimmedNewItemName };
      }
      return item;
    });

    setListItems(updatedItems);
  };

  const handleDeleteItem = (id) => {
    setListItems(listItems.filter((listItem) => listItem.id !== id));
  };

  const clearErrorAfterTimeout = () => {
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  return (
    <>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 p-1 rounded relative mb-2"
          role="alert"
        >
          <div>
            <p className="font-bold text-sm">Oops!</p>
            <p className="text-xs text-center">{error}</p>
          </div>
          <button
            className="btn btn-xs btn-ghost absolute top-0 right-0"
            onClick={() => setError("")}
          >
            X
          </button>
        </div>
      )}
      <div className="flex flex-col align-center w-80 max-w-80 min-h-80 max-h-96 py-4 px-2 bg-blue-100 rounded-lg shadow-md overflow-auto">
        <h1 className="text-xl md:text-2xl xl:text-3xl font-bold mb-5 text-center text-blue-800">
          🛒ShopBud
        </h1>
        <div className="flex flex-col justify-between w-full">
          <div className="flex justify-between mb-4">
            <input
              className="p-1 w-full text-xs md:text-sm xl:text-md font-thin rounded bg-white text-black border-2 border-gray-100 outline-none"
              type="text"
              placeholder="Enter item..."
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
            <button
              className="ml-4 py-1 px-2 btn btn-xs self-center font-semibold text-black bg-yellow-400 border-2 border-yellow-300 hover:bg-yellow-300 hover:border-yellow-200 rounded"
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
                  error={error}
                  clearErrorAfterTimeout={clearErrorAfterTimeout}
                />
              ))}
            </ul>
          </div>

          {listItems.length === 0 && !error && (
            <span className="m-auto mt-4 text-xs md:text-sm xl:text-md">
              Add your first item 🛍️
            </span>
          )}

          {listItems.length > 0 && !error && (
            <button
              className="btn btn-xs m-auto mt-4 font-semibold border-solid bg-green-500 hover:bg-green-400 hover:border-green-500 text-black rounded border-2 border-green-400"
              onClick={() => setListItems([])}
            >
              Clear List
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ShopBud;
