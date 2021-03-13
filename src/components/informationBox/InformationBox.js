import React from "react";
import { Card, CardContent, Typography, Tooltip } from "@material-ui/core";
import "./InformationBox.css";

export const InformationBox = ({
  title,
  cases,
  total,
  active,
  isGreen,
  isRed,
  isBlue,
  ...props
}) => {
  return (
    <Tooltip title="Click">
      <Card
        onClick={props.onClick}
        className={`infoBox ${active && "infoBox--selected"} ${
          isRed && "infoBox--red"
        } ${isBlue && "infoBox--blue"}`}
      >
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <h3
            className={`infoBox__cases ${isGreen && "infoBox__cases--green"} ${
              isRed && "infoBox__cases--red"
            }`}
          >
            {cases}
          </h3>

          <p
            className={`infoBox__total ${isGreen && "infoBox__cases--green"} ${
              isRed && "infoBox__cases--red"
            }`}
            color="textSecondary"
          >
            {total} Total
          </p>
        </CardContent>
      </Card>
    </Tooltip>
  );
};
