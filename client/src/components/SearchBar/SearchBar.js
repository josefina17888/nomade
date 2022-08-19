import React from 'react'

export default function SearchBar() {
  return (
    <form className="searchForm" /* onSubmit={handleSubmit} */>
      <input className="searchInput"
        type="text"
        placeholder="Ciudad"
        /* value={city} */
        /* onChange={handleInputChange} */
      />
      {/* <input type="submit" value="Buscar" /> */}

    </form>
  )
}