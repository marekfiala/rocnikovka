import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Card from "../Components/Card";

const HomePage = () => {
  const [matches, setMatches] = useState([]);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:3001/matchapi`)
      .then((res) => {
        console.log(res.data);
        setMatches(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="home-page">  
        <ul className="list">
          {matches !== [] &&
            matches?.map((item, index) => <Card item={item} key={index} />)}
        </ul>
      </div>
    </>
  );
};

export default HomePage;
