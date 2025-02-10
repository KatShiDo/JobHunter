export const ProfileIcon = ({ fill }: { fill: string }) => {
  return (
    <svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_22_887)">
        <path
          d="M10.5 5C10.5 5.82842 9.82845 6.5 9 6.5C8.17155 6.5 7.5 5.82842 7.5 5C7.5 4.17158 8.17155 3.5 9 3.5C9.82845 3.5 10.5 4.17158 10.5 5Z"
          fill={fill}
          stroke={fill}
          strokeWidth="5"
        />
        <path
          d="M8.57143 10C5.20861 10 2.5 12.78 2.5 16.1875V16.625C2.5 17.3746 3.09796 18 3.85714 18H14.1429C14.9021 18 15.5 17.3746 15.5 16.625V16.1875C15.5 12.78 12.7914 10 9.42857 10H8.57143Z"
          fill={fill}
          stroke={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_22_887">
          <rect
            width="18"
            height="18"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
