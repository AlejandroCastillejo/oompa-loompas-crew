import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { mainActions } from "../../redux/main-slice";
import { getGenderByLetter } from "../../utils/parse-data";
import { isOutdated } from "../../utils/date";

import { STORAGE_CACHE_TIME } from "../../constants";

import SearchBar from "../../components/SearchBar";
import ListItem from "../../components/ListItem";

import "./MainView.scss";

function MainView() {
  const loadTriggerRef = useRef(null);

  const {
    allResults,
    searchResults,
    searchActive,
    lastPage,
    totalPages,
    lastUpdate,
    isLoading,
  } = useSelector((state) => state.main);

  const dispatch = useDispatch();
  const dispatchUpdateResults = () => dispatch(mainActions.updateResults());
  const dispatchAddPage = (page) => dispatch(mainActions.addPage(page));

  const results = searchActive ? searchResults : allResults;

  useEffect(() => {
    console.log(lastPage);
  }, [lastPage]);

  useEffect(() => {
    // dispatchUpdateData();
    console.log("results", results);
    console.log("lastUpdate", lastUpdate);
    console.log("lastPage", lastPage);
    console.log("totalPages", totalPages);
    if (!results || !lastUpdate || isOutdated(lastUpdate, STORAGE_CACHE_TIME)) {
      dispatchUpdateResults();
    }
  }, []);

  useEffect(() => {
    const handleLoadPage = (entries) => {
      console.log("laod page", entries[0].isIntersecting);
      console.log("lastPage", lastPage);

      const [entry] = entries;
      entry.isIntersecting &&
        allResults?.length &&
        lastPage < totalPages &&
        !isLoading &&
        !searchActive &&
        dispatchAddPage(lastPage + 1);
    };

    const observer = new IntersectionObserver(handleLoadPage);

    loadTriggerRef.current && observer.observe(loadTriggerRef.current);

    return () => {
      loadTriggerRef.current && observer.unobserve(loadTriggerRef.current);
    };
  }, [
    loadTriggerRef,
    allResults,
    lastPage,
    totalPages,
    isLoading,
    searchActive,
  ]);

  return (
    <div className="main-view">
      <div className="info">
        MainView {lastPage}/{totalPages}
      </div>
      <SearchBar />
      {/* <div> */}
      {results && (
        <div className="results-grid">
          {results?.length &&
            results.map((item) => (
              <ListItem
                key={item.id}
                id={item.id}
                image={item.image}
                first_name={item.first_name}
                last_name={item.last_name}
                gender={item.gender && getGenderByLetter(item.gender)}
                profession={item.profession}
              />
            ))}
        </div>
      )}
      <button
        onClick={() => {
          // dispatchUpdate();
          console.log(results);
        }}
      >
        Show More
      </button>
      {isLoading && <div>Loading next page...</div>}
      <div ref={loadTriggerRef}>Load next page</div>
      {/* </div> */}
    </div>
  );
}

export default MainView;
