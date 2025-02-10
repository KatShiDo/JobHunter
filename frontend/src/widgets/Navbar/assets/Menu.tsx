export const MenuIcon = ({ fill }: { fill: string }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_364_2578)">
        <mask
          id="mask0_364_2578"
          style={{ maskType: 'luminance' }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="18"
          height="19"
        >
          <path
            d="M18 0.000671387H0V18.0007H18V0.000671387Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0_364_2578)">
          <path
            d="M1 4H17M1 9.49999H17M1 15H17"
            stroke={fill}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_364_2578">
          <rect
            width="18"
            height="18"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
