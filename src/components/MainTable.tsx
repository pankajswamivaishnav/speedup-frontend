import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Chip, ChipProps, Grid, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';

// table data
const createData = (
  name: string,
  designation: string,
  product: string,
  date: string,
  badgeText: string,
  badgeType: ChipProps['color']
) => ({ name, designation, product, date, badgeText, badgeType });

const rows = [
  createData('John Deo', 'Graphics Designer', 'Materially', 'Jun, 26', 'Low', 'warning'),
  createData('Jenifer Vintage', 'Web Designer', 'Mashable', 'March, 31', 'Lower', 'error'),
  createData('William Jem', 'Developer', 'Flatable', 'Aug, 02', 'Medium', 'primary'),
  createData('David Jones', 'Developer', 'Guruable', 'Sep, 22', 'High', 'info'),
  createData('Stebin Ben', 'Leader', 'Berry', 'Sep, 22', 'Higher', 'success')
];

// ===========================|| DATA WIDGET - PROJECT TABLE CARD ||=========================== //

const MainTable = () => (
  <MainCard
    title="Projects"
    content={false}
    className="bg-black"
    secondary={
      <Link component={RouterLink} to="#" className="">
        View all
      </Link>
    }
  >
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ pl: 3 }}>Assigned</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell align="right" sx={{ pr: 3 }}>
              Priority
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow hover key={index}>
              <TableCell sx={{ pl: 3 }}>
                <Grid container spacing={2} alignItems="center" sx={{ flexWrap: 'nowrap' }}>
                  <Grid item xs zeroMinWidth>
                    <Typography align="left" variant="subtitle1">
                      {row.name}
                    </Typography>
                    <Typography align="left" variant="caption" color="secondary">
                      {row.designation}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>{row.product}</TableCell>
              <TableCell className="bg-black">{row.date}</TableCell>
              <TableCell align="right" sx={{ pr: 3 }}>
                <Chip color={row.badgeType} label={row.badgeText} size="small" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </MainCard>
);

export default MainTable;
