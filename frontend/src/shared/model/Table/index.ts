import { Column } from 'react-table';

export type ExtendedColumn<T extends object> = Column<T> & {
  overflow?: string;
};
