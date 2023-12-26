import React from "react";
import HTMLReactParser from "html-react-parser";

import "./DetailItem.scss";
import { redirect } from "react-router-dom";

function DetailItem({
  first_name,
  last_name,
  gender,
  profession,
  description,
  imageSrc,
}) {
  return (
    <div className="detail-item">
      <img
        className="image"
        src={imageSrc}
        alt={`${first_name}'s picture`}
        onClick={() => {}}
      />
      <div>
        <p className="name">
          {first_name} {last_name}
        </p>
        <p className="gender">{gender}</p>
        <p className="profession">{profession}</p>
        <div className="description">
          {description && HTMLReactParser(description)}
        </div>
      </div>
    </div>
  );
}

export default DetailItem;
