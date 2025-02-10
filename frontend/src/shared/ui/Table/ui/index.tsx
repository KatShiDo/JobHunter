import { Typography } from '@/shared';
import { TableContainer, Table, TableText } from './styled';
import { useTable, Row, Cell, HeaderGroup, ColumnInstance } from 'react-table';
import { ExtendedColumn } from '@/shared';

type TableProps<T extends object> = {
  columns: ExtendedColumn<T>[];
  data: T[];
};

export const DataTable = <T extends object>({ columns, data }: TableProps<T>) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<T>({
    columns,
    data,
  });

  return (
    <TableContainer>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup: HeaderGroup<T>, index) => (
            <tr key={index}>
              {headerGroup.headers.map((column: ColumnInstance<T>, index) => (
                <th key={index}>
                  <Typography variant="body5">{column.render('Header')}</Typography>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row: Row<T>, index) => {
            prepareRow(row);

            return (
              <tr
                {...row.getRowProps()}
                key={index}
              >
                {row.cells.map((cell: Cell<T>, index) => (
                  <td
                    {...cell.getCellProps()}
                    key={index}
                  >
                    <Typography variant="body4">
                      <TableText
                        style={{
                          maxWidth: cell.column.maxWidth || 'none',
                          overflow: (cell.column as ExtendedColumn<T>).overflow || 'hidden',
                        }}
                      >
                        {cell.render('Cell')}
                      </TableText>
                    </Typography>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </TableContainer>
  );
};
