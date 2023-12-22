import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { getDetailData } from "../../services/oompa-loompas.service";
import { getGenderByLetter } from "../../utils/parse-data";

import DetailItem from "../../components/DetailItem";

import "./DetailView.scss";

function DetailView() {
  const { id } = useParams();

  const [result, setResult] = useState(null);

  useEffect(() => {
    getDetailData(id).then((res) => {
      console.log(res.data);
      setResult(res.data);
    });
  }, []);

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
