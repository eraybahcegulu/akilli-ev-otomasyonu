import React from "react";
import { useState } from "react";

function NewColumnInput({ handleCreateColumn }) {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    handleCreateColumn(inputValue);
    setInputValue("");
  };

  return (
    <div className="space-x-1 pt-2 border-t-2 w-64 border-orange-500 ">
      <input
        type="text"
        className="border border-slate-400 rounded-md h-8 w-52 bg-transparent"
        onChange={handleInputChange}
        value={inputValue}
        placeholder="yeni oda oluştur"
      />
      <button
        className="border border-green-400 rounded-md w-8 h-8 text-center text-green-400"
        onClick={handleButtonClick}
      >
        +
      </button>
    </div>
  );
}

export default NewColumnInput;
