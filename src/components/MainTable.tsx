// // material-ui
// import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
// import { useQuery } from '@tanstack/react-query';

// // project imports
// import MainCard from 'components/MainCard';
// import TransporterServiceInstance from 'services/transporter.services';

// // ===========================|| DATA WIDGET - PROJECT TABLE CARD ||=========================== //

// const MainTable = () => {

//   return (
//     <MainCard content={false} sx={{ width: '90vw', overflowX: 'hidden' }}>
//       <TableContainer sx={{ width: '100%', maxHeight: 550, overflowX: 'auto' }}>
//         <Table sx={{ width: '100%', tableLayout: 'auto' }}>
//           <TableHead>
//             <TableRow>
//               <TableCell>Transport Name</TableCell>
//               <TableCell>Transporter Name</TableCell>
//               <TableCell>Registration Number</TableCell>
//               <TableCell align="right">Mobile Number</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {transporter.map((row: any, index: any) => (
//               <TableRow hover key={index}>
//                 <TableCell>
//                   <Grid container spacing={2} alignItems="center" sx={{ flexWrap: 'nowrap' }}>
//                     <Grid item xs zeroMinWidth>
//                       <Typography align="left" variant="subtitle1">
//                         {row.transportName}
//                       </Typography>
//                       <Typography align="left" variant="caption" color="secondary">
//                         {row.email}
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                 </TableCell>
//                 <TableCell>{` ${row.transporter_first_name} ${row.transporter_last_name}`}</TableCell>
//                 <TableCell>{row.registrationNumber}</TableCell>
//                 <TableCell align="right" sx={{ pr: 3 }}>
//                   {row.officeNumber}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </MainCard>
//   );
// };

// export default MainTable;
