import { DropdownButton, DropdownItem, DropdownList, StyledDropdown, StyledText } from './styled';
import { DropdownIcon } from '../assets/Dropdown';
import { useTheme } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import { Typography } from '../../Typography';

type item = {
  icon: JSX.Element;
  text: string;
  color?: string;
  onClick: () => void;
};

interface dropdownProps {
  items: item[];
}

export const Dropdown = ({ items }: dropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <StyledDropdown ref={dropdownRef}>
      <DropdownButton onClick={toggleDropdown}>
        <DropdownIcon fill={theme.primary.contrastText} />
      </DropdownButton>
      {isOpen && (
        <DropdownList>
          {items.map(item => (
            <DropdownItem onClick={item.onClick}>
              {item.icon}
              <Typography variant="body4">
                <StyledText $color={item.color || theme.primary.contrastText}>
                  {item.text}
                </StyledText>
              </Typography>
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </StyledDropdown>
  );
};
