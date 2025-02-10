export const UserImage = ({ fill, width }: { fill: string; width?: string }) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      viewBox="0 0 40.000000 41.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,41.000000) scale(0.100000,-0.100000)"
        fill={fill}
        stroke="none"
      >
        <path
          d="M155 398 c-118 -25 -187 -164 -136 -273 73 -157 289 -157 362 0 68
147 -66 308 -226 273z m124 -38 c73 -37 110 -112 92 -190 -5 -23 -11 -44 -14
-46 -3 -3 -24 4 -47 16 -42 21 -43 21 -76 4 -33 -18 -35 -18 -68 0 -33 17 -34
17 -76 -4 -48 -24 -54 -21 -65 37 -25 137 128 248 254 183z"
        />
        <path
          d="M174 330 c-53 -21 -68 -82 -34 -137 34 -57 94 -53 125 7 21 41 19 75
-7 104 -27 29 -55 38 -84 26z"
        />
      </g>
    </svg>
  );
};
