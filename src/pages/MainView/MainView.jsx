import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { mainActions } from "../../redux/main-slice";
import { getGenderByLetter } from "../../utils/parse-data";
import { isOutdated } from "../../utils/date";

import { STORAGE_CACHE_TIME } from "../../constants";

import SearchBar from "../../components/SearchBar";
import ListItem from "../../components/ListItem";

import "./MainView.scss";

//ToDo: check useEffect dependencies, use useCallback for dispatch functions
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
    if (!results || !lastUpdate || isOutdated(lastUpdate, STORAGE_CACHE_TIME)) {
      dispatchUpdateResults();
    }
  }, []);

  useEffect(() => {
    const handleLoadPage = (entries) => {
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
      {results && (
        <div className="results-grid" role="list">
          {results?.length &&
            results.map((item) => (
              <ListItem
                key={item.id}
                id={item.id}
                imageSrc={item.image}
                first_name={item.first_name}
                last_name={item.last_name}
                gender={item.gender && getGenderByLetter(item.gender)}
                profession={item.profession}
              />
            ))}
        </div>
      )}

      {isLoading && <div>Loading next page...</div>}
      <div ref={loadTriggerRef}>Load next page</div>
    </div>
  );
}

export default MainView;
