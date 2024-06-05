"use client";

import { useState } from "react";

export default function SearchInput({ query }) {
  const [value, setValue] = useState(query);
  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <input
      autoComplete="off"
      name="search"
      value={value}
      onChange={handleInputChange}
      placeholder="Search"
      className="rounded border-gray-300 py-3 min-w-96 mb-8"
    />
  );
}
