import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { mainActions } from "../../redux/main-slice";
import { filterResults } from "../../helpers/search-bar";

import logo from "../../assets/icons/ic_search.png";

import "./SearchBar.scss";

function SearchBar() {
  const { allResults } = useSelector((state) => state.main);

  const dispatch = useDispatch();
  const dispatchChangeSearchResults = (results) =>
    dispatch(mainActions.changeSearchResults(results));

  const [searchValue, setSearchValue] = useState("");

  const filterBy = ["first_name", "last_name", "profession"];

  const handleChangeValue = ({ target: { value } }) => {
    setSearchValue(value);

    dispatchChangeSearchResults({
      searchResults: filterResults(allResults, filterBy, value),
      searchActive: value !== "",
    });
  };

  return (
    <div className="search-bar">
      <input
        className="input"
        value={searchValue}
        onChange={handleChangeValue}
      />
      <div className="vl" />
      <img className="logo" src={logo} alt="Search" />
    </div>
  );
}

export default SearchBar;
