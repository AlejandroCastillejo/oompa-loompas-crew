import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./ListItem.scss";

function ListItem({ id, imageSrc, first_name, last_name, gender, profession }) {
  return (
    <Link className="list-item" to={`/${id}`}>
      <img src={imageSrc} alt={`${first_name}'s picture`} width={400} />
      <p className="name">
        {first_name} {last_name}
      </p>
      <p className="gender">{gender}</p>
      <p className="profession">{profession}</p>
    </Link>
  );
}

ListItem.propTypes = {
  id: PropTypes.number,
  imageSrc: PropTypes.string,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  gender: PropTypes.string,
  profession: PropTypes.string,
};

export default ListItem;
