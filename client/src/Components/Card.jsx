import React from "react";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  return (
    <>
      <li>
        <Link to={`match/${item.urlID}`}>
        <div className="card top">
          <div>
            {item.participants[0].name}
            <em>{item.participants[0].country}</em>
          </div>
          <div>
            {item.participants[1].name}
            <em>{item.participants[1].country}</em>
          </div>
        </div>
        </Link>
      </li>
    </>
  );
};

export default Card;
