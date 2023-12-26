import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { detailActions } from "../../redux/detail-slice";
import { getGenderByLetter } from "../../utils/parse-data";
import { isOutdated } from "../../utils/date";

import { STORAGE_CACHE_TIME } from "../../constants";

import DetailItem from "../../components/DetailItem";

import "./DetailView.scss";

function DetailView() {
  const { id } = useParams();

  const { results, isLoading } = useSelector((state) => state.detail);
  const result = results[id];

  const dispatch = useDispatch();

  const dispatchAddItem = useCallback(
    (id) => dispatch(detailActions.addItem(id)),
    [dispatch]
  );

  useEffect(() => {
    if (
      !result ||
      !result.lastUpdate ||
      isOutdated(result.lastUpdate, STORAGE_CACHE_TIME)
    ) {
      dispatchAddItem(id);
    }
  }, [result, dispatchAddItem, id]);

  if (isLoading) {
    return <div>Loading... </div>;
  }

  return (
    <div className="detail-view">
      <div className="detail-container">
        DetailView {id}
        {result && (
          <DetailItem
            first_name={result.first_name}
            last_name={result.last_name}
            gender={result.gender && getGenderByLetter(result.gender)}
            profession={result.profession}
            description={result.description}
            imageSrc={result.image}
          />
        )}
      </div>
    </div>
  );
}

export default DetailView;
