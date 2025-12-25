import React, { useState } from "react";

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setQuery("");
    }
  };

  return (
    <nav className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between sm:items-center">
        
        {/* Logo */}
        <h1 className="text-white text-2xl font-extrabold tracking-wider text-center sm:text-left">
          Movie Explorer
        </h1>

        {/* Search Bar (same for mobile & desktop) */}
        <form
          onSubmit={handleSubmit}
          className="flex w-full sm:w-auto max-w-md mx-auto sm:mx-0"
        >
          <input
            type="text,"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            className="bg-gray-900 flex-1 px-4 py-3 rounded-full outline-none focus:ring-2 focus:ring-gray-400 text-gray-100"
          />
         
        </form>

      </div>
    </nav>
  );
};

export default Navbar;
