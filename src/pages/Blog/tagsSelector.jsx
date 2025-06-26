import React, { useState } from "react";
import { XIcon } from "lucide-react"; 

const TagsSelector = ({ tags, selectedTags, setSelectedTags }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSelect = (tag) => {
    if (!selectedTags.includes(tag.name)) {
      setSelectedTags([...selectedTags, tag.name]);
    }
  };

  const handleRemove = (id) => {
    setSelectedTags(selectedTags.filter((t) => t !== id));
  };

  return (
    <div className="relative">
      <label className="block font-medium mb-1">Tags</label>

      <div
        className="w-full border rounded p-2 min-h-[42px] flex flex-wrap gap-1 cursor-pointer"
        onClick={() => {
          if (tags.length !== selectedTags.length) {
            setDropdownOpen(!dropdownOpen);
          }
        }}>
        {selectedTags.length === 0 && (
          <span className="text-gray-400">Select tags...</span>
        )}
        {selectedTags.map((id) => {
          const tag = tags.find((t) => t.name === id);
          return (
            <span
              key={id}
              className="bg-blue-100 text-blue-700 px-2 py-1 rounded flex items-center gap-1">
              {tag?.name}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(id);
                }}>
                <XIcon className="w-3 h-3" />
              </button>
            </span>
          );
        })}
      </div>

      {dropdownOpen && (
        <div className="absolute z-10 bg-white border rounded shadow mt-1 w-full max-h-40 overflow-auto">
          {tags
            .filter((tag) => !selectedTags.includes(tag.name))
            .map((tag) => (
              <div
                key={tag._id}
                className="px-2 py-1 hover:bg-blue-100 cursor-pointer"
                onClick={() => {
                  setDropdownOpen(!dropdownOpen);
                  handleSelect(tag);
                }}>
                {tag.name}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default TagsSelector;
