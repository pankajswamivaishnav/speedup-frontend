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
  IconButton,
  Stack,
  Button
} from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import UniversalDialog from 'components/popup/UniversalDialog';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { TUniversalDialogProps } from 'types/types.UniversalDialog';
import AddDriver from './AddDriver';
import DriverServiceInstance from 'services/driver.services';
import useAuth from 'hooks/useAuth';

// ===========================|| DATA WIDGET - PROJECT TABLE CARD ||=========================== //

const DriverTable = ({
  data,
  limit,
  setLimit,
  page,
  setPage,
  count,
  refetchDriversAllData
}: {
  data: any;
  limit: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  count: number;
  refetchDriversAllData?: () => void;
}) => {
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
    setLimit(parseInt(event?.target.value!, 10));
    setPage(0);
  };

  // -------------- Constants ----------------
  const { user } = useAuth();

  // -------------- Show transporter details page pop up --------------
  const [driversDetailsPopup, setDriversDetailsPopup] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      maxWidth: 'md'
    },
    title: 'Driver Detail',
    data: { existingData: {}, isEditMode: false }
  });

  const [deleteConfirmModal, setDeleteConfirmModal] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      maxWidth: 'md'
    },
    title: 'Delete Driver Confirmation',
    data: { existingData: {}, isEditMode: false }
  });

  //-------------------handlers-------------------
  const handleDriverDetailTogglePopup = async (driverData?: any) => {
    if (driversDetailsPopup.action.open === true) {
      // refetchTransporterData();
    }
    setDriversDetailsPopup((prev: any) => {
      return {
        ...prev,
        data: { isEditMode: false, existingData: { driverData } },
        action: { ...prev.action, open: !prev.action.open },
        title: <FormattedMessage id="Driver Detail" />
      };
    });
  };

  const handleDeleteDriverToggle = async (id: string) => {
    setDeleteConfirmModal((prev) => ({
      ...prev,
      data: { isEditMode: false, existingData: { id } },
      action: { ...prev.action, open: !prev.action.open },
      title: <FormattedMessage id="Delete Driver Confirmation" defaultMessage="Delete Driver Confirmation" />
    }));
  };

  // Delete transporter
  const handleDeleteDriver = async (id: string) => {
    try {
      const deleteTransport = await DriverServiceInstance.deleteDriver(id);
      if (deleteTransport && refetchDriversAllData) {
        refetchDriversAllData();
      }
    } catch (error) {
      console.log('Error occured while delete driver', error);
    }
  };
  return (
    <>
      {data && data.length > 0 ? (
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
                            {`${row.first_name} ${row.last_name}`}
                          </Typography>
                          <Typography align="left" variant="caption" color="secondary">
                            {row.mobileNumber}
                          </Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell align="center">{row.truckNumber.toUpperCase()}</TableCell>
                    <TableCell align="right" sx={{ pr: 3 }}>
                      {row.licenseNumber}
                    </TableCell>
                    <TableCell align="center" onClick={() => handleDriverDetailTogglePopup(row)}>
                      <Tooltip title="full-details">
                        <IconButton>
                          <EyeOutlined className="text-blue-500" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    {user?.role === 'super_admin' && (
                      <TableCell>
                        <Tooltip title="delete" onClick={() => handleDeleteDriverToggle(row._id)}>
                          <IconButton>
                            <DeleteOutlined className="text-red-600" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    )}
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
      ) : (
        <p className="flex justify-center w-full m-5">No drivers available</p>
      )}

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

      {/* Delete modal */}
      <UniversalDialog
        action={{ ...deleteConfirmModal.action }}
        onClose={() => handleDeleteDriverToggle('')}
        title={deleteConfirmModal.title}
        hasPrimaryButton={false}
      >
        <>
          <h3 className="text-xl">Are you sure you want to delete this driver.</h3>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
              <Button variant="outlined" color="secondary" onClick={() => handleDeleteDriverToggle('')}>
                Cancel
              </Button>
              <Button type="submit" variant="outlined" onClick={() => handleDeleteDriver(deleteConfirmModal.data.existingData.id)}>
                Delete
              </Button>
            </Stack>
          </Grid>
        </>
      </UniversalDialog>
    </>
  );
};

export default DriverTable;
