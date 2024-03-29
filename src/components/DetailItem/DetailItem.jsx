import PropTypes from "prop-types";
import HTMLReactParser from "html-react-parser";

import "./DetailItem.scss";

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
      <img className="image" src={imageSrc} alt={`${first_name}'s picture`} />
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

DetailItem.propTypes = {
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  gender: PropTypes.string,
  profession: PropTypes.string,
  description: PropTypes.string,
  imageSrc: PropTypes.string,
};

export default DetailItem;
