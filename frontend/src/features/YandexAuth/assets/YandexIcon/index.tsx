import { useTheme } from '@emotion/react';

export const YandexIcon = () => {
  const theme = useTheme();
  return (
    <svg
      width="19"
      height="20"
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_47_217)">
        <path
          d="M9.5 19.875C14.7467 19.875 19 15.6217 19 10.375C19 5.12829 14.7467 0.875 9.5 0.875C4.25329 0.875 0 5.12829 0 10.375C0 15.6217 4.25329 19.875 9.5 19.875Z"
          fill={theme.primary.black}
        />
        <path
          d="M8.56946 16.3867V15.2056C8.56946 13.6027 8.38336 12.8097 7.74044 11.4262L4.61041 4.66016H6.77604L9.43233 10.4475C10.2106 12.1348 10.549 13.0122 10.549 14.9526V16.3867H8.56946Z"
          fill={theme.secondary.light}
        />
        <path
          d="M9.83838 10.3294L12.3086 4.66016H14.3896L11.8856 10.3294H9.83838Z"
          fill={theme.secondary.light}
        />
      </g>
      <defs>
        <clipPath id="clip0_47_217">
          <rect
            width="19"
            height="19"
            fill={theme.secondary.light}
            transform="translate(0 0.875)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
