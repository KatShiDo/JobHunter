import styled from '@emotion/styled';

export const TableContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  border-radius: 15px;
  border: 0.6px solid ${({ theme }) => theme.secondary.dark};
  overflow: scroll;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    border-left: 0.6px solid ${({ theme }) => theme.secondary.dark};
    border-bottom: 0.6px solid ${({ theme }) => theme.secondary.dark};
    padding: 10px 12px;
  }

  th:first-of-type {
    border-left: 0px;
  }

  td {
    border-left: 0.6px solid ${({ theme }) => theme.secondary.dark};
    border-bottom: 0.6px solid ${({ theme }) => theme.secondary.dark};
    padding: 10px 12px;
  }

  td:first-of-type {
    border-left: none;
  }
`;

export const TableText = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
  max-width: 100%;
  word-wrap: break-word;
`;
