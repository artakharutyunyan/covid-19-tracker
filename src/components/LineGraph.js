import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import { casesTypeColors } from "../util";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data?.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function LineGraph({ casesType, country }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const url =
        country === "worldwide"
          ? "https://disease.sh/v3/covid-19/historical/all?lastdays=30"
          : `https://disease.sh/v3/covid-19/historical/${country}?lastdays=30`;

      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData =
            country === "worldwide"
              ? buildChartData(data, casesType)
              : buildChartData(data.timeline, casesType);
          setData(chartData);
        });
    };

    fetchData();
  }, [casesType, country]);

  return (
    <div>
      {data?.length > 0 ? (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: casesTypeColors[casesType].half_op,
                borderColor: casesTypeColors[casesType].hex,
                data: data,
              },
            ],
          }}
          options={options}
        />
      ) : (
        <h2 style={{ color: "red" }}>No data available</h2>
      )}
    </div>
  );
}

export default LineGraph;
