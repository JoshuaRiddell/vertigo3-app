import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: 500
  }
});

function valuetext(value) {
  return `${value}m`;
}

const HSlider = withStyles({
  root: {
    color: "#cd0909"
  },
  thumb: {
    height: 18,
    width: 18,
    top: 5
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
    fontSize: 14,
    top: -35
  },
  track: {
    height: 2,
    borderRadius: 4,
    backgroundColor: "transparent"
  },
  rail: {
    height: 2,
    borderRadius: 4,
    backgroundColor: "transparent"
  }
})(Slider);

export default function HorizontalSlider({ expandSonar }) {
  const classes = useStyles();
  const [value, setValue] = React.useState([50]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={!expandSonar ? { width: 500 } : {}}>
      <HSlider
        valueLabelFormat={val => val + "m"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
      <div
        className="horizantal-center"
        style={expandSonar ? { right: 522 } : { right: 235 }}
      >
        <i className="fa fa-circle-thin" aria-hidden="true" />
      </div>
    </div>
  );
}
