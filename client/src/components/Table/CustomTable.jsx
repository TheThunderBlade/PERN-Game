import {
  Table, TableBody, TableCell,
  TableContainer,
  TableHead,
  TableRow, Typography,
} from '@mui/material';
import React from 'react';

const CustomTable = ({ headData, tableData }) => {
  const tableHeadSx = {
    borderLeft: '1px solid whitesmoke',
    borderTop: '1px solid whitesmoke',
    borderRight: '1px solid whitesmoke',
  };

  const tableBodySx = {
    borderLeft: '1px solid whitesmoke',
    borderRight: '1px solid whitesmoke',
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {headData.map((headItem, index) =>
              (<TableCell key={index} align="left" sx={tableHeadSx}><Typography variant={'h5'}>{headItem}</Typography></TableCell>))}
          </TableRow>
        </TableHead>
        <TableBody sx={tableBodySx}>
          {
            tableData.map((bodyItem, index) => (
              <TableRow key={index}>
                <TableCell sx={{ borderRight: '1px solid whitesmoke' }} align={'left'}>{bodyItem.info}</TableCell>
                <TableCell align={'left'}>{bodyItem.data}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;