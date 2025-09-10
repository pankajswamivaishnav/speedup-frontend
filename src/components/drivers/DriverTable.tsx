// material-ui
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Tooltip,
  IconButton
} from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import UniversalDialog from 'components/popup/UniversalDialog';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import TransporterServiceInstance from 'services/transporter.services';
import { TUniversalDialogProps } from 'types/types.UniversalDialog';
import AddDriver from './AddDriver';

// ===========================|| DATA WIDGET - PROJECT TABLE CARD ||=========================== //

const DriverTable = ({
  data,
  limit,
  setLimit,
  page,
  setPage,
  count,
  refetchTransporterAllData
}: {
  data: any;
  limit: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  count: number;
  refetchTransporterAllData: () => void;
}) => {
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
    setLimit(parseInt(event?.target.value!, 10));
    setPage(0);
  };
  // -------------- Show transporter details page pop up --------------
  const [driversDetailsPopup, setDriversDetailsPopup] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      maxWidth: 'md'
    },
    title: 'Driver Detail',
    data: { existingData: {}, isEditMode: false }
  });

  //-------------------handlers-------------------
  const handleDriverDetailTogglePopup = async (transporterData?: any) => {
    if (driversDetailsPopup.action.open === true) {
      // refetchTransporterData();
    }
    setDriversDetailsPopup((prev: any) => {
      return {
        ...prev,
        data: { isEditMode: false, existingData: { transporterData } },
        action: { ...prev.action, open: !prev.action.open },
        title: <FormattedMessage id="Driver Detail" />
      };
    });
  };

  // Delete transporter
  const handleDeleteTransporter = async (id: string) => {
    try {
      const deleteTransport = await TransporterServiceInstance.deleteTransporter(id);
      if (deleteTransport) {
        refetchTransporterAllData();
      }
    } catch (error) {
      console.log('Error occured while delete transporter', error);
    }
  };
  return (
    <>
      <MainCard content={false} sx={{ width: '90vw', overflowX: 'hidden' }}>
        <TableContainer sx={{ width: '100%', maxHeight: 550, overflowX: 'auto' }}>
          <Table sx={{ width: '100%', tableLayout: 'auto' }}>
            <TableHead>
              <TableRow>
                <TableCell>Driver Name</TableCell>
                <TableCell align="center">Truck Number</TableCell>
                <TableCell align="right">License Number</TableCell>
                <TableCell align="center" colSpan={2}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row: any, index: any) => (
                <TableRow hover key={index}>
                  <TableCell>
                    <Grid container spacing={2} alignItems="center" sx={{ flexWrap: 'nowrap' }}>
                      <Grid item xs zeroMinWidth>
                        <Typography align="left" variant="subtitle1">
                          {row.driverName}
                        </Typography>
                        <Typography align="left" variant="caption" color="secondary">
                          {row.driverPhoneNumber}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell align="center">{row.truckNumber.toUpperCase()}</TableCell>
                  <TableCell align="right" sx={{ pr: 3 }}>
                    {row.licenseNumber}
                  </TableCell>
                  <TableCell align="right" onClick={() => handleDriverDetailTogglePopup(row)}>
                    <Tooltip title="full-details">
                      <IconButton>
                        <EyeOutlined className="text-blue-500" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="delete" onClick={() => handleDeleteTransporter(row._id)}>
                      <IconButton>
                        <DeleteOutlined className="text-red-600" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider />
        <TablePagination
          rowsPerPageOptions={[20, 50, 100]}
          component="div"
          count={count}
          rowsPerPage={limit}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </MainCard>
      {/* -----------Universal dialog for open transport details page---------------- */}
      {!!driversDetailsPopup && driversDetailsPopup.action.open && (
        <UniversalDialog
          action={{ ...driversDetailsPopup.action }}
          onClose={handleDriverDetailTogglePopup}
          title={driversDetailsPopup.title}
          hasPrimaryButton={false}
        >
          <AddDriver
            onClose={() => handleDriverDetailTogglePopup()}
            isEditMode={true}
            existingData={driversDetailsPopup.data.existingData}
            isDisable={true}
          />
        </UniversalDialog>
      )}
    </>
  );
};

export default DriverTable;
