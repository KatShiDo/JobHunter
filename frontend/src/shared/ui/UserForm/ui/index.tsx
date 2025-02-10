import { Button, LoadingIcon } from '@/shared';
import { Typography } from '../../Typography';
import {
  StyledUserForm,
  UserFormInput,
  UserFormInputBox,
  UserFormInputs,
  UserFormOverlay,
  Line,
  UserFormFooterButtons,
  UserFormContainer,
  UserFormAltAuth,
  UserFormAltAuthLinkText,
  UserFormForgotPassword,
  ErrorMessage,
  UserFormTitle,
} from './styled';
import { VkAuthButton, YandexAuthButton } from '@/features';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface UserFormProps {
  title: string;
  onSubmit?: (e: React.FormEvent) => void;
  loading?: boolean;
  inputs: {
    name: string;
    type?: string;
    icon?: JSX.Element;
    value?: string;
    placeholder?: string;
    error?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }[];
  visibleForgotPassword?: boolean;
  submitText: string;
  visibleLine?: boolean;
  visibleAlternativeAuth?: boolean;
  altText?: string;
  altLink?: string;
  altLinkText?: string;
  visibleHelpAuth?: boolean;
}

export const UserForm = ({
  title,
  onSubmit,
  inputs,
  submitText,
  visibleForgotPassword,
  visibleLine,
  visibleAlternativeAuth,
  altText,
  altLinkText,
  altLink,
  visibleHelpAuth,
  loading,
}: UserFormProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'userForms',
  });
  return (
    <UserFormOverlay>
      <UserFormContainer>
        <StyledUserForm onSubmit={onSubmit}>
          <UserFormTitle variant="h2">{title}</UserFormTitle>
          <UserFormInputs>
            {inputs.map((input, index) => (
              <UserFormInputBox key={index}>
                <UserFormInput
                  required
                  name={input.name}
                  type={input.type === '' ? 'text' : input.type}
                  placeholder={input.placeholder}
                  onChange={input.onChange}
                  value={input.value}
                />
                {input.error && (
                  <Typography variant="body3">
                    <ErrorMessage>{input.error}</ErrorMessage>
                  </Typography>
                )}
              </UserFormInputBox>
            ))}
            <Link to="/email-verification">
              <UserFormForgotPassword
                $display={visibleForgotPassword ? 'flex' : 'none'}
                variant="body2"
              >
                {t('forgotPassword')}
              </UserFormForgotPassword>
            </Link>
            <Button
              variant="primary"
              disabled={loading}
            >
              {loading ? <LoadingIcon /> : submitText ? submitText : 'Submit'}
            </Button>
            <Line $display={visibleLine ? 'flex' : 'none'} />
          </UserFormInputs>
        </StyledUserForm>
        <UserFormFooterButtons $display={visibleAlternativeAuth ? 'flex' : 'none'}>
          <VkAuthButton />
          <YandexAuthButton />
        </UserFormFooterButtons>
        <UserFormAltAuth $display={visibleHelpAuth ? 'flex' : 'none'}>
          <Typography variant="body2">{altText}</Typography>
          <Link to={altLink || ''}>
            <UserFormAltAuthLinkText variant="body2">{altLinkText}</UserFormAltAuthLinkText>
          </Link>
        </UserFormAltAuth>
      </UserFormContainer>
    </UserFormOverlay>
  );
};
