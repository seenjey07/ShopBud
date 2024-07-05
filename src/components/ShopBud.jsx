import { useState } from "react";

const ShopBud = () => {
  const [item, setItem] = useState("");
  const [listItems, setListItems] = [useState([])];

  return (
    <>
      <div className="flex flex-col align-center w-full max-w-2xl p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-5 underline text-center text-blue-800">
          ShopBud
        </h1>
        <div className="flex flex-col justify-between w-full mb-4">
          <div className="flex justify-between">
            <input
              className="border-1 flex-grow p-2 rounded"
              type="text"
              placeholder="Enter item"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />

            <button
              className="ml-4 py-1.5 px-3.5 text-sm font-semibold text-black bg-yellow-400 border-none rounded-md cursor-pointer"
              onClick={() => setListItems([...listItems, item])}
            >
              Add
            </button>

            <button
              className="ml-2 py-1 px-2 text-sm font-semibold text-black bg-red-500 border-none rounded-md cursor-pointer"
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
