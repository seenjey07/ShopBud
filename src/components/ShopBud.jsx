import { useState, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import ShopItem from "./ShopItem";
import ShopBudImg from "../assets/background-image.jpg";

const ShopBud = () => {
  const [item, setItem] = useState("");
  const [listItems, setListItems] = useState([]);
  const [error, setError] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleAddItem = (e) => {
    e.preventDefault();

    const trimmedItem = item.trim().toLowerCase();

    if (!trimmedItem && listItems.length === 0) {
      setError("You haven't added any items yet.");
      inputRef.current.focus();
      clearErrorAfterTimeout();
      return;
    }

    if (trimmedItem === "") {
      setError("Please add a valid item.");
      inputRef.current.focus();
      clearErrorAfterTimeout();
      return;
    }

    if (listItems.find((listItem) => listItem.itemName === trimmedItem)) {
      setError("Item already on list. Please add a different one.");
      setItem("");
      inputRef.current.focus();
      clearErrorAfterTimeout();
      return;
    }

    setListItems([...listItems, { id: uuid(), itemName: trimmedItem }]);
    setItem("");
    setError("");

    inputRef.current.focus();
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
    <div className="flex flex-col justify-center items-center">
      <div className="flex overflow-hidden fixed top-0 left-0 w-screen h-screen bg-no-repeat bg-contain opacity-85 -z-50">
        <img src={ShopBudImg} alt="ShopBud" />
      </div>

      {error && (
        <div className="z-50 absolute xl:px-3 xl:py-4 xl:top-64 xl:right-1/3 bg-red-100 border border-red-400 text-red-700 p-1 m-auto mb-1 rounded w-fit">
          <div>
            <p className="xl:text-2xl font-bold text-sm">Oops!</p>
            <p className="xl:text-2xl text-xs text-center">{error}</p>
          </div>
          <button
            className="xl:btn:sm xl:text-xl xl:top-1 btn btn-xs btn-ghost absolute top-0 right-0"
            onClick={() => setError("")}
          >
            X
          </button>
        </div>
      )}

      <div className="absolute flex flex-col align-center w-96 h-96 py-4 px-2 bg-blue-100 rounded-lg shadow-lg shadow-white">
        <h1 className="text-xl font-bold mb-2 text-center text-blue-800">
          🛒ShopBud
        </h1>

        <div className="flex flex-col justify-between w-full h-full">
          <div className="flex justify-between items-center mt-2 mb-6">
            <input
              className="p-1 w-full text-xs font-thin rounded bg-white text-black border-2 border-gray-100 outline-none"
              type="text"
              placeholder="Enter item..."
              value={item}
              onChange={(e) => setItem(e.target.value)}
              ref={inputRef}
            />
            <button
              className="text-xs ml-4 py-1 px-2 btn btn-xs self-center font-semibold text-black bg-yellow-400 border-2 border-yellow-300 hover:bg-yellow-300 hover:border-yellow-200 rounded"
              onClick={handleAddItem}
            >
              Add Item
            </button>
          </div>

          <div className="flex flex-col justify-between">
            <ul className="h-2/3 mb-2 overflow-auto">
              {listItems.map((item) => (
                <ShopItem
                  key={item.id}
                  id={item.id}
                  itemName={item.itemName}
                  handleEditItem={handleEditItem}
                  handleDeleteItem={handleDeleteItem}
                  // error={error}
                  // clearErrorAfterTimeout={clearErrorAfterTimeout}
                />
              ))}
            </ul>

            {listItems.length > 0 && !error && (
              <button
                className="btn btn-xs m-auto mt-4 font-semibold border-solid bg-transparent hover:bg-green-400 hover:border-green-500 text-black rounded border-2 border-green-400"
                onClick={() => setListItems([])}
              >
                Clear List
              </button>
            )}
          </div>
          {listItems.length === 0 && !error && (
            <span className="m-auto mt-4 text-xs">Add your first item 🛍️</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopBud;
