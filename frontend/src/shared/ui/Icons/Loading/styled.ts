import styled from '@emotion/styled';

export const StyledLoading = styled.div`
  @keyframes rotate360 {
    to {
      transform: rotate(360deg);
    }
  }
  svg {
    animation: 2s rotate360 infinite linear;
  }
`;
