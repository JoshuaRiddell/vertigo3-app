import React from "react";

export default function CurrentLocationIcon({ active, handler }) {
  return (
    <span
      className="current-location-icon"
      onClick={() => handler("userAction")}
    >
      {/* <img src={pauseIcon} class="video-icon pause-icon" /> */}

      <svg
        id="Group_175"
        data-name="Group 175"
        xmlns="http://www.w3.org/2000/svg"
        width="70"
        height="70"
        viewBox="0 0 80.518 80.517"
      >
        <defs>
          <linearGradient
            id="linear-gradient"
            y1="0.5"
            x2="1"
            y2="0.5"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#d1d3d4" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-2"
            y1="0.5"
            x2="1"
            y2="0.5"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stopColor="#d1d3d4" />
            <stop offset="1" stopColor="#fff" />
          </linearGradient>
        </defs>
        <ellipse
          id="Ellipse_1250"
          data-name="Ellipse 1250"
          cx="40.259"
          cy="40.259"
          rx="40.259"
          ry="40.259"
          transform="translate(0 0)"
          fill="url(#linear-gradient)"
        />
        <ellipse
          id="Ellipse_1251"
          data-name="Ellipse 1251"
          cx="38.246"
          cy="38.246"
          rx="38.246"
          ry="38.246"
          transform="translate(2.013 2.013)"
          fill="url(#linear-gradient-2)"
        />
        <g
          id="Group_148"
          data-name="Group 148"
          transform="translate(10.568 10.568)"
        >
          <ellipse
            id="Ellipse_25"
            data-name="Ellipse 25"
            cx="30.194"
            cy="30.194"
            rx="30.194"
            ry="30.194"
            transform="translate(7.757 7.757)"
            fill="#fff"
            opacity="0"
          />
          <ellipse
            id="Ellipse_26"
            data-name="Ellipse 26"
            cx="30.162"
            cy="30.162"
            rx="30.162"
            ry="30.162"
            transform="translate(7.272 7.272)"
            fill="#f7f7f7"
            opacity="0.063"
          />
          <ellipse
            id="Ellipse_27"
            data-name="Ellipse 27"
            cx="30.131"
            cy="30.131"
            rx="30.131"
            ry="30.131"
            transform="translate(6.787 6.787)"
            fill="#efeff0"
            opacity="0.125"
          />
          <ellipse
            id="Ellipse_28"
            data-name="Ellipse 28"
            cx="30.1"
            cy="30.1"
            rx="30.1"
            ry="30.1"
            transform="translate(6.303 6.302)"
            fill="#e7e8e8"
            opacity="0.188"
          />
          <ellipse
            id="Ellipse_29"
            data-name="Ellipse 29"
            cx="30.068"
            cy="30.068"
            rx="30.068"
            ry="30.068"
            transform="translate(5.818 5.818)"
            fill="#dfe0e1"
            opacity="0.25"
          />
          <ellipse
            id="Ellipse_30"
            data-name="Ellipse 30"
            cx="30.037"
            cy="30.037"
            rx="30.037"
            ry="30.037"
            transform="translate(5.333 5.333)"
            fill="#d7d8d9"
            opacity="0.313"
          />
          <ellipse
            id="Ellipse_31"
            data-name="Ellipse 31"
            cx="30.005"
            cy="30.005"
            rx="30.005"
            ry="30.005"
            transform="translate(4.848 4.848)"
            fill="#cfd0d1"
            opacity="0.375"
          />
          <ellipse
            id="Ellipse_32"
            data-name="Ellipse 32"
            cx="29.974"
            cy="29.974"
            rx="29.974"
            ry="29.974"
            transform="translate(4.363 4.363)"
            fill="#c7c8ca"
            opacity="0.438"
          />
          <ellipse
            id="Ellipse_33"
            data-name="Ellipse 33"
            cx="29.942"
            cy="29.942"
            rx="29.942"
            ry="29.942"
            transform="translate(3.878 3.878)"
            fill="#c0c1c2"
            opacity="0.5"
          />
          <ellipse
            id="Ellipse_34"
            data-name="Ellipse 34"
            cx="29.911"
            cy="29.911"
            rx="29.911"
            ry="29.911"
            transform="translate(3.394 3.394)"
            fill="#b8b9ba"
            opacity="0.563"
          />
          <ellipse
            id="Ellipse_35"
            data-name="Ellipse 35"
            cx="29.879"
            cy="29.879"
            rx="29.879"
            ry="29.879"
            transform="translate(2.909 2.909)"
            fill="#b0b1b3"
            opacity="0.625"
          />
          <ellipse
            id="Ellipse_36"
            data-name="Ellipse 36"
            cx="29.848"
            cy="29.848"
            rx="29.848"
            ry="29.848"
            transform="translate(2.424 2.424)"
            fill="#a8a9ab"
            opacity="0.688"
          />
          <ellipse
            id="Ellipse_37"
            data-name="Ellipse 37"
            cx="29.816"
            cy="29.816"
            rx="29.816"
            ry="29.816"
            transform="translate(1.939 1.939)"
            fill="#a0a1a4"
            opacity="0.75"
          />
          <ellipse
            id="Ellipse_38"
            data-name="Ellipse 38"
            cx="29.785"
            cy="29.785"
            rx="29.785"
            ry="29.785"
            transform="translate(1.454 1.454)"
            fill="#98999c"
            opacity="0.813"
          />
          <ellipse
            id="Ellipse_39"
            data-name="Ellipse 39"
            cx="29.754"
            cy="29.754"
            rx="29.754"
            ry="29.754"
            transform="translate(0.97 0.97)"
            fill="#909294"
            opacity="0.875"
          />
          <ellipse
            id="Ellipse_40"
            data-name="Ellipse 40"
            cx="29.722"
            cy="29.722"
            rx="29.722"
            ry="29.722"
            transform="translate(0.485 0.485)"
            fill="#888a8d"
            opacity="0.938"
          />
          <ellipse
            id="Ellipse_41"
            data-name="Ellipse 41"
            cx="29.691"
            cy="29.691"
            rx="29.691"
            ry="29.691"
            fill="#808285"
          />
        </g>
        <ellipse
          id="Ellipse_1252"
          data-name="Ellipse 1252"
          cx="30.194"
          cy="30.194"
          rx="30.194"
          ry="30.194"
          transform="translate(10.065 10.065)"
          fill="#2e4442"
        />
        <ellipse
          id="Ellipse_1253"
          data-name="Ellipse 1253"
          cx="25.162"
          cy="25.162"
          rx="25.162"
          ry="25.162"
          transform="translate(15.261 15.261)"
          fill="#2e4442"
        />

        <path
          id="Rectangle_3"
          d="M40.2,49.5c-5.1,0-9.2-4-9.1-9.1c0-5,4.1-9,9.2-9c5.1,0,9.2,4,9.1,9.1C49.4,45.5,45.3,49.5,40.2,49.5z"
          fill={active ? "#e06c22" : "#fff"}
        />
        <path
          d="M14.9,42.8c0-1.6,0-3.1,0-4.7c1.6,0,3.1,0,4.7,0c1.9-10.2,8-16.2,18.3-18.1c0-1.6,0-3.1,0-4.6
	c1.6,0,3.2,0,4.7,0c0,1.5,0,3.1,0,4.6C53,21.9,59,28,60.9,38.1c1.6,0,3.1,0,4.7,0c0,1.6,0,3.1,0,4.7c-1.6,0-3.1,0-4.7,0
	C59,53,52.9,59,42.6,60.8c0,1.6,0,3.1,0,4.6c-1.6,0-3.2,0-4.7,0c0-1.5,0-3.1,0-4.6c-10.3-1.9-16.4-7.9-18.3-18.1
	C18,42.8,16.5,42.8,14.9,42.8z M56.4,40.5c0-8.8-7.1-15.9-16-16c-9,0-16.2,7-16.2,15.9c0,8.8,7.1,15.9,16,16
  C49.1,56.4,56.4,49.3,56.4,40.5z"
          fill={active ? "#e06c22" : "#fff"}
        />
      </svg>
    </span>
  );
}
