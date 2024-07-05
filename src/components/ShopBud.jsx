import { useState } from "react";
import { v4 as uuid } from "uuid";

const ShopBud = () => {
  const [item, setItem] = useState("");
  const [listItems, setListItems] = [useState([])];

  return (
    <>
      <div className="flex flex-col align-center w-full max-w-2xl p-4 bg-blue-100 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-5 text-center text-blue-800">
          🛒ShopBud
        </h1>
        <div className="flex flex-col justify-between w-full">
          <div className="flex justify-between mb-4">
            <input
              className="border-1 flex-grow p-2 text-sm rounded"
              type="text"
              placeholder="Enter item..."
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />

            <button
              className="ml-4 py-1.5 px-3.5 text-xs font-semibold text-black bg-yellow-400 border-none rounded-md cursor-pointer"
              onClick={() =>
                setListItems([...listItems, { id: uuid(), itemName: item }])
              }
            >
              Add
            </button>

            <button
              className="ml-2 py-1.5 px-3.5 text-xs font-semibold text-black bg-orange-400 border-none rounded-md cursor-pointer"
              onClick={() => setItem()}
            >
              Edit
            </button>

            <button
              className="ml-2 py-1 px-2 text-xs font-semibold text-black bg-red-500 border-none rounded-md cursor-pointer"
              onClick={() => {
                setListItems(listItems.filter((i) => i !== item));
                setItem("");
              }}
            >
              Delete
            </button>
          </div>
          <div>
            <ul>
              {listItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <button
            className="m-auto mt-4 p-2 text-xs font-semibold border-solid bg-green-600 text-white rounded-md cursor-pointer"
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
