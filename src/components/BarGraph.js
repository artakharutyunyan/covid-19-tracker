import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import numeral from "numeral";
import { casesTypeColors } from "../util";

const options = {
  legend: {
    display: false,
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          callback: function (value, index, values) {
            return numeral(value).format("0,0a");
          },
        },
      },
    ],
  },
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("0,0");
      },
    },
  },
};

function BarGraph({ countryInfo }) {
  const data = {
    labels: ["Cases", "Recovered", "Active", "Critical", "Deaths"],
    datasets: [
      {
        data: [
          countryInfo.cases,
          countryInfo.recovered,
          countryInfo.active,
          countryInfo.critical,
          countryInfo.deaths,
        ],
        backgroundColor: [
          "rgba(51, 154, 214, 0.2)",
          "rgba(40,167,69, 0.2)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(251, 68, 67, 0.2)",
          "rgba(251, 68, 67, 0.5)",
        ],
        borderColor: [
          "rgba(51, 154, 214, 1)",
          "rgba(40,167,69, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(251, 68, 67, 1)",
          "rgba(251, 68, 67, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      {data.datasets?.length > 0 ? (
        <div>
          <p>Population: {numeral(countryInfo.population).format("0,0")} </p>
          <p style={{ paddingBottom: 10 }}>
            People tested:{" "}
            {numeral((countryInfo.tests / countryInfo.population) * 100).format(
              "00.00"
            )}
            %
          </p>
          <Bar style={{ maxHeight: 170 }} data={data} options={options} />
        </div>
      ) : (
        <h2 style={{ color: "red" }}>No data available</h2>
      )}
    </div>
  );
}

export default BarGraph;
