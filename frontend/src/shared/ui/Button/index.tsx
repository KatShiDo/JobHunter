import { StyledButton } from './styled';

export interface ButtonProps {
  variant: string;
  maxHeight?: string;
  children: React.ReactNode;
  onClick?: () => void;
  maxWidth?: string;
  disabled?: boolean;
}

export const Button = ({
  variant,
  maxHeight,
  maxWidth,
  children,
  onClick,
  disabled,
}: ButtonProps) => {
  return (
    <StyledButton
      variant={variant}
      maxHeight={maxHeight}
      maxWidth={maxWidth}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};
