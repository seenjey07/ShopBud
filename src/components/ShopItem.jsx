import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const ShopItem = ({ id, itemName, handleEditItem, handleDeleteItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newItemName, setNewItemName] = useState(itemName);

  useEffect(() => {
    setNewItemName(itemName);
  }, [isEditing, itemName]);

  const onEdit = () => {
    handleEditItem(id, newItemName);
    setIsEditing(false);
  };

  const onDelete = () => {
    handleDeleteItem(id);
  };

  const onCancel = () => {
    setNewItemName(itemName);
    setIsEditing(false);
  };

  return (
    <>
      <li className="flex justify-between">
        {isEditing ? (
          <input
            className="flex-grow p-1 text-xs font-thin rounded bg-white text-black border-none outline-none"
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
        ) : (
          <span className="pl-1 font-semibold text-black text-xs self-center">
            {itemName}
          </span>
        )}

        <div className="flex flex-row justify-between items-center">
          <button
            className="ml-1 btn btn-xs px-1 font-semibold bg-transparent border-2 border-orange-300 hover:bg-orange-300 hover:border-orange-200 rounded"
            onClick={() => (isEditing ? onEdit() : setIsEditing(true))}
          >
            {isEditing ? "💾" : "✏️"}
          </button>

          {isEditing ? (
            <button
              className="ml-1 btn btn-xs px-1 font-semibold bg-transparent border-2 border-red-500 hover:bg-red-500 hover:border-red-300 rounded"
              onClick={onCancel}
            >
              ✖️
            </button>
          ) : (
            <button
              className="ml-2 btn btn-xs px-1 font-semibold bg-transparent border-2 border-red-500 hover:bg-red-400 hover:border-red-300 rounded"
              onClick={onDelete}
            >
              ❌
            </button>
          )}
        </div>
      </li>
      <hr className="m-1 border-1 border-blue-300" />
    </>
  );
};

ShopItem.propTypes = {
  id: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
  handleEditItem: PropTypes.func.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
};

export default ShopItem;
