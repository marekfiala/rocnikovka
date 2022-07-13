import React, { useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

const MatchPage = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:3001/matchapi/${id}`)
      .then((res) => {
        const data = res.data;
        data.scores.forEach((item) => {
          item.a = item.score[0];
          item.b = item.score[1];
        });
        console.log(data);
        setData(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="match-page">
      <div>
        {data?.participants !== undefined && (
          <>
            <div className="participants">

              <div><div className="red-box"></div><h1 className="first-participant">{data.participants[0].name}</h1></div>

              <div><div className="green-box"></div><h1 className="second-participant">{data.participants[1].name}</h1></div>

            </div>
            <p>{data.timestamp}</p>
            <p>
              {data.scores[data?.scores.length - 1].score[0]} -{" "}
              {data.scores[data?.scores.length - 1].score[1]}
            </p>
          </>
        )}
      </div>
      <LineChart width={800} height={400} data={data.scores}>
        <Line dataKey="a" stroke="red" isAnimationActive={false}/>
        <Line dataKey="b" stroke="yellowgreen" isAnimationActive={false}/>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="minutes" />
        <YAxis allowDecimals={false} />
      </LineChart>
      <a className="link-button" href={`https://www.livesport.cz/zapas/${data?.urlID}/#/prehled-zapasu/prehled-zapasu`}>LIVESPORT</a>
    </div>
  );
};

export default MatchPage;
