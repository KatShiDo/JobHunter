import { useTranslation } from 'react-i18next';
import {
  ContactContainer,
  ContactInput,
  ContactText,
  StyledContact,
  StyledContactForm,
} from '@/features/Contact/ui/styled.ts';
import { Button, LoadingIcon, Popup, Typography } from '@/shared';
import { useState } from 'react';
import { ContactProps } from '../model/types.ts';
import { SendContactForm } from '../api/post.ts';

export const ContactForm = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'contact' });

  const [formData, setFormData] = useState<ContactProps>({
    subject: '',
    message: '',
  });
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string>('');
  const [isDisabled, setDisabled] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDisabled(true);
    try {
      const status = await SendContactForm(formData);
      if (status === 200) {
        setPopupMessage(t('popup.success'));
        setPopupOpen(true);
        setDisabled(false);
        setFormData({ subject: '', message: '' });
      } else {
        setPopupMessage(t('popup.error'));
        setPopupOpen(true);
        setDisabled(false);
      }
    } catch {
      setPopupMessage(t('popup.error'));
      setPopupOpen(true);
      setDisabled(false);
    }
  };

  return (
    <StyledContact>
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}
        onSubmit={() => setPopupOpen(false)}
        description={popupMessage}
        submitText={t('popup.button')}
      />
      <ContactContainer>
        <Typography variant={'h2'}>
          <ContactText>{t('title')}</ContactText>
        </Typography>
        <Typography variant={'body4'}>
          <ContactText>{t('description')}</ContactText>
        </Typography>
        <StyledContactForm onSubmit={handleSubmit}>
          <ContactInput
            type="text"
            name="subject"
            placeholder={t('subject')}
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <ContactInput
            as="textarea"
            name="message"
            placeholder={t('message')}
            value={formData.message}
            onChange={handleChange}
            required
          />
          <Button
            variant={'primary'}
            disabled={isDisabled}
          >
            {isDisabled ? <LoadingIcon /> : t('button')}
          </Button>
        </StyledContactForm>
      </ContactContainer>
    </StyledContact>
  );
};
