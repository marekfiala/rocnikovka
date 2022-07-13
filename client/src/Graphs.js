import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Graphs= () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:3001/matchapi/${id}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {data?.participants !== undefined && (
        <>
          <p>
            {data?.participants[0].name}  {data?.participants[0].country}
          </p>
          <p>
            {data?.participants[1].name} - {data?.participants[1].country}
          </p>
          <p>{data?.timestamp}</p>
          <p>
            {data?.scores[data?.scores.length - 1].score[0]} -{" "}
            {data?.scores[data?.scores.length - 1].score[1]}
          </p>
        </>
      )}
    </div>
  );
};

export default Graphs;