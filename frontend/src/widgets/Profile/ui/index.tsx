import { ProfileContent, StyledProfile } from './styled';
import { ProfileAvatar, ProfileButtons, ProfileForm } from '@/features';

export const Profile = () => {
  return (
    <>
      <StyledProfile>
        <ProfileAvatar />
        <ProfileContent>
          <ProfileForm />
          <ProfileButtons />
        </ProfileContent>
      </StyledProfile>
    </>
  );
};
