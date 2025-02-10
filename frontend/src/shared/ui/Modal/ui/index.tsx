import { Button } from '@/shared';
import { Typography } from '../../Typography';
import {
  ModalContainer,
  ModalForm,
  ModalInput,
  ModalInputBox,
  Overlay,
  StyledEditorWrapper,
} from './styled';
import Editor, { ContentEditableEvent } from 'react-simple-wysiwyg';

interface InputProps {
  name: string;
  type?: string;
  icon?: JSX.Element;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface EditorProps {
  name: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: ContentEditableEvent) => void;
}

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  description?: string;
  submitText?: string;
  inputs?: InputProps[];
  editors?: EditorProps[];
}

export const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  description,
  inputs,
  editors,
  submitText,
}: ModalProps) => {
  return (
    <>
      {isOpen && (
        <Overlay onClick={onClose}>
          <ModalContainer onClick={e => e.stopPropagation()}>
            <Typography variant="h3">{title}</Typography>
            <Typography variant="body3">{description}</Typography>
            <ModalForm onSubmit={onSubmit}>
              {inputs &&
                inputs.map((input, index) => (
                  <ModalInputBox key={`input-${index}`}>
                    <ModalInput
                      name={input.name}
                      type={input.type}
                      placeholder={input.placeholder}
                      onChange={input.onChange}
                      value={input.value}
                    />
                  </ModalInputBox>
                ))}
              {editors &&
                editors.map((editor, index) => (
                  <ModalInputBox key={`editor-${index}`}>
                    <StyledEditorWrapper>
                      <Editor
                        id={editor.name}
                        name={editor.name}
                        value={editor.value || ''}
                        onChange={editor.onChange}
                        placeholder={editor.placeholder}
                      />
                    </StyledEditorWrapper>
                  </ModalInputBox>
                ))}
              <Button variant="primary">{submitText}</Button>
            </ModalForm>
          </ModalContainer>
        </Overlay>
      )}
    </>
  );
};
