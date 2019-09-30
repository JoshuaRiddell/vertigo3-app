import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    height: "295px",
    position: "absolute",
    bottom: "40px"
  }
});

function valuetext(value) {
  return `${value}m`;
}

const VerticalSlider = withStyles({
  root: {
    height: 300,
    color: "#cd0909"
  },

  active: {},
  valueLabel: {
    transform: "rotate(90deg) !important",
    left: "calc(-50% + 14px)",
    top: "calc(-50% + -21px)",
    fontSize: 14
  },
  track: {
    height: 2,
    borderRadius: 4
  },
  rail: {
    height: 2,
    borderRadius: 4,
    backgroundColor: "transparent"
  }
})(Slider);

export default function VerticalRangeSlider({ expandSonar }) {
  const classes = useStyles();

  const [value, setValue] = React.useState([90, 50]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div
      className={classes.root}
      style={expandSonar ? { height: "670px" } : { height: "295px" }}
    >
      <VerticalSlider
        orientation="vertical"
        valueLabelFormat={val => val + "m"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        aria-labelledby="vertical-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}
