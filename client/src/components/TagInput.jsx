import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handlekeydown = (e) => {
    if (e.key === "Enter") {
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove)=>{
    setTags(tags.filter((tag) => tag!== tagToRemove));
  }
  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-3">
          {tags.map((tag, index) => (
            <span className="flex items-center gap-2 text-sm text-slate-900  bg-slate-100 px-3 py-1 rounded" key={index}>
              #{tag}
              <button onClick={() => handleRemoveTag(tag)}>
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          className="text-sm bg-transparent border px-3 py-2 rounded outline-none border-slate-200"
          placeholder="Add Tags"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handlekeydown}
        />
        <button
          className="w-8 h-8 flex items-center justify-center border rounded-md border-blue-700 hover:bg-blue-700"
          onClick={handleAddTag}
        >
          <MdAdd className="text-2xl text-blue-500 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
