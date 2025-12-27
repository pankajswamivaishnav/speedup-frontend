// material-ui
import { DeleteOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';
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
import DriverServiceInstance from 'services/driver.services';
import { TUniversalDialogProps } from 'types/types.UniversalDialog';
import AddManagedDriver from './AddManagedDriver';
import useAuth from 'hooks/useAuth';

// ===========================|| DATA WIDGET - MANAGED DRIVER TABLE CARD ||=========================== //

const ManagedDriverTable = ({
  data,
  limit,
  setLimit,
  page,
  setPage,
  count,
  refetchManagedDriverAllData
}: {
  data: any;
  limit: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  count: number;
  refetchManagedDriverAllData?: () => void;
}) => {
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
    setLimit(parseInt(event?.target.value!, 10));
    setPage(0);
  };

  // -------------- Constants --------------
  const { user } = useAuth();

  // -------------- Show managed driver details page pop up --------------
  const [managedDriverDetailsPopup, setManagedDriverDetailsPopup] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      maxWidth: 'md'
    },
    title: 'Managed Driver Details',
    data: { existingData: {}, isEditMode: false }
  });

  // -------------- Edit managed driver pop up --------------
  const [editManagedDriverPopup, setEditManagedDriverPopup] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      fullScreen: true
    },
    title: 'Edit Managed Driver',
    data: { existingData: {}, isEditMode: false }
  });

  const [deleteConfirmModal, setDeleteConfirmModal] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      maxWidth: 'md'
    },
    title: 'Delete Managed Driver Confirmation',
    data: { existingData: {}, isEditMode: false }
  });

  //-------------------handlers-------------------
  const handleManagedDriverDetailTogglePopup = async (managedDriverData?: any) => {
    if (managedDriverDetailsPopup.action.open === true) {
      // refetchManagedDriverData();
    }
    setManagedDriverDetailsPopup((prev: any) => {
      return {
        ...prev,
        data: { isEditMode: false, existingData: { managedDriverData } },
        action: { ...prev.action, open: !prev.action.open },
        title: <FormattedMessage id="Managed Driver Details" />
      };
    });
  };

  const handleEditManagedDriverTogglePopup = async (managedDriverData?: any) => {
    if (editManagedDriverPopup.action.open === true) {
      // refetchManagedDriverData();
    }
    setEditManagedDriverPopup((prev: any) => {
      return {
        ...prev,
        data: { isEditMode: true, existingData: { managedDriverData } },
        action: { ...prev.action, open: !prev.action.open },
        title: <FormattedMessage id="Edit Managed Driver" />
      };
    });
  };

  const handleDeleteManagedDriverToggle = async (id: any) => {
    setDeleteConfirmModal((prev) => ({
      ...prev,
      data: { isEditMode: false, existingData: { id } },
      action: { ...prev.action, open: !prev.action.open },
      title: <FormattedMessage id="Delete Managed Driver Confirmation" defaultMessage="Delete Managed Driver Confirmation" />
    }));
  };

  // Delete managed driver
  const handleDeleteManagedDriver = async (id: string) => {
    try {
      const deleteManagedDriver = await DriverServiceInstance.deleteManagedDriver(id);
      if (deleteManagedDriver && refetchManagedDriverAllData) {
        refetchManagedDriverAllData();
        handleDeleteManagedDriverToggle('');
      }
    } catch (error) {
      console.log('Error occured while delete managed driver', error);
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
                  <TableCell>Mobile Number</TableCell>
                  <TableCell>Truck Number</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Action</TableCell>
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
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell>{row.mobileNumber}</TableCell>
                    <TableCell>{row.truckNumber || '-'}</TableCell>
                    <TableCell sx={{ pr: 3 }}>{row.address || 'INDIA'}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Tooltip title="full-details">
                          <IconButton onClick={() => handleManagedDriverDetailTogglePopup(row)}>
                            <EyeOutlined className="text-blue-500" />
                          </IconButton>
                        </Tooltip>
                        {user?.isPremium === true && (
                          <Tooltip title="edit">
                            <IconButton onClick={() => handleEditManagedDriverTogglePopup(row)}>
                              <EditOutlined className="text-green-500" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {user?.isPremium === true && (
                          <Tooltip title="delete">
                            <IconButton onClick={() => handleDeleteManagedDriverToggle(row._id)}>
                              <DeleteOutlined className="text-red-600" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Stack>
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
      ) : (
        <p className="flex justify-center w-full m-5">No managed driver available</p>
      )}
      {/* -----------Universal dialog for open managed driver details page---------------- */}
      {!!managedDriverDetailsPopup && managedDriverDetailsPopup.action.open && (
        <UniversalDialog
          action={{ ...managedDriverDetailsPopup.action }}
          onClose={handleManagedDriverDetailTogglePopup}
          title={managedDriverDetailsPopup.title}
          hasPrimaryButton={false}
        >
          <AddManagedDriver
            onClose={() => handleManagedDriverDetailTogglePopup()}
            isEditMode={true}
            existingData={managedDriverDetailsPopup.data.existingData}
            isDisable={true}
          />
        </UniversalDialog>
      )}

      {/* Edit modal */}
      {!!editManagedDriverPopup && editManagedDriverPopup.action.open && (
        <UniversalDialog
          action={{ ...editManagedDriverPopup.action }}
          onClose={handleEditManagedDriverTogglePopup}
          title={editManagedDriverPopup.title}
          hasPrimaryButton={false}
        >
          <AddManagedDriver
            onClose={() => {
              handleEditManagedDriverTogglePopup();
              refetchManagedDriverAllData && refetchManagedDriverAllData();
            }}
            isEditMode={editManagedDriverPopup?.data?.isEditMode}
            existingData={editManagedDriverPopup?.data.existingData}
            refetchManagedDriverAllData={refetchManagedDriverAllData}
          />
        </UniversalDialog>
      )}

      {/* Delete modal */}
      <UniversalDialog
        action={{ ...deleteConfirmModal.action }}
        onClose={() => handleDeleteManagedDriverToggle('')}
        title={deleteConfirmModal.title}
        hasPrimaryButton={false}
      >
        <>
          <h3 className="text-xl">Are you sure you want to delete this managed driver?</h3>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
              <Button variant="outlined" color="secondary" onClick={() => handleDeleteManagedDriverToggle('')}>
                Cancel
              </Button>
              <Button type="submit" variant="outlined" onClick={() => handleDeleteManagedDriver(deleteConfirmModal.data.existingData.id)}>
                Delete
              </Button>
            </Stack>
          </Grid>
        </>
      </UniversalDialog>
    </>
  );
};

export default ManagedDriverTable;
