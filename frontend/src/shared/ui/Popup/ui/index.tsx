import { Button } from '@/shared';
import { Typography } from '../../Typography';
import { ModalContainer, Overlay } from './styled';

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  title?: string;
  description?: string;
  submitText?: string;
}

export const Popup = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  description,
  submitText,
}: ModalProps) => {
  return (
    <>
      {isOpen && (
        <Overlay onClick={onClose}>
          <ModalContainer onClick={e => e.stopPropagation()}>
            <Typography variant="h3">{title}</Typography>
            <Typography variant="body3">{description}</Typography>
            <Button
              variant="primary"
              onClick={onSubmit}
            >
              {submitText}
            </Button>
          </ModalContainer>
        </Overlay>
      )}
    </>
  );
};
