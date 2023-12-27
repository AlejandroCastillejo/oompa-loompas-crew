import { Link } from "react-router-dom";

import "./ListItem.scss";

function ListItem({ id, image, first_name, last_name, gender, profession }) {
  return (
    <Link className="list-item" to={`/${id}`}>
      <img src={image} alt={`${first_name}'s picture`} width={400} />
      <p className="name">
        {first_name} {last_name}
      </p>
      <p className="gender">{gender}</p>
      <p className="profession">{profession}</p>
    </Link>
  );
}

export default ListItem;
