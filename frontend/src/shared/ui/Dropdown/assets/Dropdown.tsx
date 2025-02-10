export const DropdownIcon = ({ fill }: { fill: string }) => {
  return (
    <svg
      width="6"
      height="20"
      viewBox="0 0 6 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.5"
        width="5"
        height="5"
        rx="2.5"
        fill={fill}
      />
      <rect
        x="0.5"
        y="7.5"
        width="5"
        height="5"
        rx="2.5"
        fill={fill}
      />
      <rect
        x="0.5"
        y="14.5"
        width="5"
        height="5"
        rx="2.5"
        fill={fill}
      />
    </svg>
  );
};
