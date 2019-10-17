import React from "react";

export default function ExpandButton({ active, handler, classNames, frame }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="46.305"
      height="46.305"
      viewBox="0 0 46.305 46.305"
      className={classNames}
      onClick={handler}
    >
      <defs>
        <linearGradient
          id="linear-gradient"
          y1="0.5"
          x2="1"
          y2="0.5"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stop-color="#fff" />
          <stop offset="1" stop-color="#d1d3d4" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-2"
          y1="0.5"
          x2="1"
          y2="0.5"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stop-color="#d1d3d4" />
          <stop offset="1" stop-color="#fff" />
        </linearGradient>
      </defs>
      <g
        id="Group_165"
        data-name="Group 165"
        transform="translate(-1856.328 -387.8)"
      >
        <circle
          id="Ellipse_1262"
          data-name="Ellipse 1262"
          cx="23.153"
          cy="23.153"
          r="23.153"
          transform="translate(1856.328 387.8)"
          fill="url(#linear-gradient)"
        />
        <ellipse
          id="Ellipse_1263"
          data-name="Ellipse 1263"
          cx="21.995"
          cy="21.995"
          rx="21.995"
          ry="21.995"
          transform="translate(1857.485 388.958)"
          fill="url(#linear-gradient-2)"
        />
        <g
          id="Group_153"
          data-name="Group 153"
          transform="translate(1862.405 393.878)"
        >
          <ellipse
            id="Ellipse_25"
            data-name="Ellipse 25"
            cx="17.365"
            cy="17.365"
            rx="17.365"
            ry="17.365"
            transform="translate(4.461 4.461)"
            fill="#fff"
            opacity="0"
          />
          <circle
            id="Ellipse_26"
            data-name="Ellipse 26"
            cx="17.346"
            cy="17.346"
            r="17.346"
            transform="translate(4.182 4.182)"
            fill="#f7f7f7"
            opacity="0.063"
          />
          <ellipse
            id="Ellipse_27"
            data-name="Ellipse 27"
            cx="17.328"
            cy="17.328"
            rx="17.328"
            ry="17.328"
            transform="translate(3.903 3.903)"
            fill="#efeff0"
            opacity="0.125"
          />
          <circle
            id="Ellipse_28"
            data-name="Ellipse 28"
            cx="17.31"
            cy="17.31"
            r="17.31"
            transform="translate(3.625 3.625)"
            fill="#e7e8e8"
            opacity="0.188"
          />
          <circle
            id="Ellipse_29"
            data-name="Ellipse 29"
            cx="17.292"
            cy="17.292"
            r="17.292"
            transform="translate(3.346 3.346)"
            fill="#dfe0e1"
            opacity="0.25"
          />
          <circle
            id="Ellipse_30"
            data-name="Ellipse 30"
            cx="17.274"
            cy="17.274"
            r="17.274"
            transform="translate(3.067 3.067)"
            fill="#d7d8d9"
            opacity="0.313"
          />
          <circle
            id="Ellipse_31"
            data-name="Ellipse 31"
            cx="17.256"
            cy="17.256"
            r="17.256"
            transform="translate(2.788 2.788)"
            fill="#cfd0d1"
            opacity="0.375"
          />
          <ellipse
            id="Ellipse_32"
            data-name="Ellipse 32"
            cx="17.238"
            cy="17.238"
            rx="17.238"
            ry="17.238"
            transform="translate(2.509 2.509)"
            fill="#c7c8ca"
            opacity="0.438"
          />
          <circle
            id="Ellipse_33"
            data-name="Ellipse 33"
            cx="17.22"
            cy="17.22"
            r="17.22"
            transform="translate(2.23 2.23)"
            fill="#c0c1c2"
            opacity="0.5"
          />
          <circle
            id="Ellipse_34"
            data-name="Ellipse 34"
            cx="17.202"
            cy="17.202"
            r="17.202"
            transform="translate(1.952 1.952)"
            fill="#b8b9ba"
            opacity="0.563"
          />
          <ellipse
            id="Ellipse_35"
            data-name="Ellipse 35"
            cx="17.184"
            cy="17.184"
            rx="17.184"
            ry="17.184"
            transform="translate(1.673 1.673)"
            fill="#b0b1b3"
            opacity="0.625"
          />
          <ellipse
            id="Ellipse_36"
            data-name="Ellipse 36"
            cx="17.166"
            cy="17.166"
            rx="17.166"
            ry="17.166"
            transform="translate(1.394 1.394)"
            fill="#a8a9ab"
            opacity="0.688"
          />
          <ellipse
            id="Ellipse_37"
            data-name="Ellipse 37"
            cx="17.147"
            cy="17.147"
            rx="17.147"
            ry="17.147"
            transform="translate(1.115 1.115)"
            fill="#a0a1a4"
            opacity="0.75"
          />
          <circle
            id="Ellipse_38"
            data-name="Ellipse 38"
            cx="17.129"
            cy="17.129"
            r="17.129"
            transform="translate(0.836 0.836)"
            fill="#98999c"
            opacity="0.813"
          />
          <circle
            id="Ellipse_39"
            data-name="Ellipse 39"
            cx="17.111"
            cy="17.111"
            r="17.111"
            transform="translate(0.558 0.558)"
            fill="#909294"
            opacity="0.875"
          />
          <ellipse
            id="Ellipse_40"
            data-name="Ellipse 40"
            cx="17.093"
            cy="17.093"
            rx="17.093"
            ry="17.093"
            transform="translate(0.279 0.279)"
            fill="#888a8d"
            opacity="0.938"
          />
          <circle
            id="Ellipse_41"
            data-name="Ellipse 41"
            cx="17.075"
            cy="17.075"
            r="17.075"
            fill="#808285"
          />
        </g>
        <ellipse
          id="Ellipse_1264"
          data-name="Ellipse 1264"
          cx="17.365"
          cy="17.365"
          rx="17.365"
          ry="17.365"
          transform="translate(1862.116 393.588)"
          fill="#2e4442"
        />
        <ellipse
          id="Ellipse_1265"
          data-name="Ellipse 1265"
          cx="14.47"
          cy="14.47"
          rx="14.47"
          ry="14.47"
          transform="translate(1865.01 396.482)"
          fill="#2e4442"
        />
        {frame === "sonar" && (
          <g
            id="Group_158"
            data-name="Group 158"
            transform="translate(1868 400)"
          >
            <path
              class="st0"
              d="M17.3,11.8h4.6v9.7H12V17H0V0h17.3V11.8z M13.4,20.2h7.1v-7h-3.2V17h-3.9V20.2z M13.4,15.6h2.5v-2.4h-2.5V15.6
    z M1.4,1.4v14.3H12v-3.8h3.9V1.4H1.4z"
              fill={active ? "#e06c22" : "#fff"}
            />
            <path
              class="st0"
              d="M10.4,11.2L5,5.9v2.6c0,0.4-0.3,0.7-0.7,0.7S3.6,8.9,3.6,8.5v-5h5.1c0.4,0,0.7,0.3,0.7,0.7
    c0,0.4-0.3,0.7-0.7,0.7H6l5.4,5.3L10.4,11.2z"
              fill={active ? "#e06c22" : "#fff"}
            />
          </g>
        )}

        {frame === "map" && (
          <g
            id="Group_158"
            data-name="Group 158"
            transform="translate(1868 400)"
          >
            <path
              class="st0"
              d="M17.3,9.7h4.6V0H12v4.5H0v17h17.3V9.7z M13.4,1.4h7.1v7h-3.2V4.5h-3.9V1.4z M13.4,5.9h2.5v2.4h-2.5V5.9z
M1.4,20.2V5.9H12v3.8h3.9v10.5H1.4z"
              fill={active ? "#e06c22" : "#fff"}
            />
            <path
              class="st0"
              d="M10.4,10.4L5,15.7v-2.6c0-0.4-0.3-0.7-0.7-0.7s-0.7,0.3-0.7,0.7v5h5.1c0.4,0,0.7-0.3,0.7-0.7S9,16.6,8.7,16.6
H6l5.4-5.3L10.4,10.4z"
              fill={active ? "#e06c22" : "#fff"}
            />
          </g>
        )}
      </g>
    </svg>
  );
}
