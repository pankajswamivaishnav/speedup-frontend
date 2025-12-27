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
import TransporterServiceInstance from 'services/transporter.services';
import { TUniversalDialogProps } from 'types/types.UniversalDialog';
import AddManagedTransporter from './AddManagedTransporter';
import useAuth from 'hooks/useAuth';

// ===========================|| DATA WIDGET - MANAGED TRANSPORTER TABLE CARD ||=========================== //

const ManagedTransportTable = ({
  data,
  limit,
  setLimit,
  page,
  setPage,
  count,
  refetchManagedTransporterAllData
}: {
  data: any;
  limit: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  count: number;
  refetchManagedTransporterAllData?: () => void;
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

  // -------------- Show managed transporter details page pop up --------------
  const [managedTransporterDetailsPopup, setManagedTransporterDetailsPopup] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      maxWidth: 'md'
    },
    title: 'Managed Transporter Details',
    data: { existingData: {}, isEditMode: false }
  });

  // -------------- Edit managed transporter pop up --------------
  const [editManagedTransporterPopup, setEditManagedTransporterPopup] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      fullScreen: true
    },
    title: 'Edit Managed Transporter',
    data: { existingData: {}, isEditMode: false }
  });

  const [deleteConfirmModal, setDeleteConfirmModal] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      maxWidth: 'md'
    },
    title: 'Delete Managed Transporter Confirmation',
    data: { existingData: {}, isEditMode: false }
  });

  //-------------------handlers-------------------
  const handleManagedTransporterDetailTogglePopup = async (managedTransporterData?: any) => {
    if (managedTransporterDetailsPopup.action.open === true) {
      // refetchManagedTransporterData();
    }
    setManagedTransporterDetailsPopup((prev: any) => {
      return {
        ...prev,
        data: { isEditMode: false, existingData: { managedTransporterData } },
        action: { ...prev.action, open: !prev.action.open },
        title: <FormattedMessage id="Managed Transporter Details" />
      };
    });
  };

  const handleEditManagedTransporterTogglePopup = async (managedTransporterData?: any) => {
    if (editManagedTransporterPopup.action.open === true) {
      // refetchManagedTransporterData();
    }
    setEditManagedTransporterPopup((prev: any) => {
      return {
        ...prev,
        data: { isEditMode: true, existingData: { managedTransporterData } },
        action: { ...prev.action, open: !prev.action.open },
        title: <FormattedMessage id="Edit Managed Transporter" />
      };
    });
  };

  const handleDeleteManagedTransporterToggle = async (id: string) => {
    setDeleteConfirmModal((prev) => ({
      ...prev,
      data: { isEditMode: false, existingData: { id } },
      action: { ...prev.action, open: !prev.action.open },
      title: <FormattedMessage id="Delete Managed Transporter Confirmation" defaultMessage="Delete Managed Transporter Confirmation" />
    }));
  };

  // Delete managed transporter
  const handleDeleteManagedTransporter = async (id: string) => {
    try {
      const deleteManagedTransport = await TransporterServiceInstance.deleteManagedTransporter(id);
      if (deleteManagedTransport && refetchManagedTransporterAllData) {
        refetchManagedTransporterAllData();
        handleDeleteManagedTransporterToggle('');
      }
    } catch (error) {
      console.log('Error occured while delete managed transporter', error);
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
                  <TableCell>Transport Name</TableCell>
                  <TableCell>Transporter Name</TableCell>
                  <TableCell>Mobile Number</TableCell>
                  <TableCell>Office Number</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row: any, index: any) => (
                  <TableRow hover key={index}>
                    <TableCell>
                      <Grid container spacing={2} alignItems="center" sx={{ flexWrap: 'nowrap' }}>
                        <Grid item xs zeroMinWidth>
                          <Typography align="left" variant="subtitle1">
                            {row.transportName}
                          </Typography>
                          {row.email && (
                            <Typography align="left" variant="caption" color="secondary">
                              {row.email}
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell>{`${row.first_name} ${row.last_name}`}</TableCell>
                    <TableCell>{row.mobileNumber}</TableCell>
                    <TableCell align="right" sx={{ pr: 3 }}>
                      {row.officeNumber || '-'}
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1}>
                        <Tooltip title="full-details">
                          <IconButton onClick={() => handleManagedTransporterDetailTogglePopup(row)}>
                            <EyeOutlined className="text-blue-500" />
                          </IconButton>
                        </Tooltip>
                        {user.role === 'super_admin' && (
                          <Tooltip title="edit">
                            <IconButton onClick={() => handleEditManagedTransporterTogglePopup(row)}>
                              <EditOutlined className="text-green-500" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {user.role === 'super_admin' && (
                          <Tooltip title="delete">
                            <IconButton onClick={() => handleDeleteManagedTransporterToggle(row._id)}>
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
        <p className="flex justify-center w-full m-5">No managed transporter available</p>
      )}
      {/* -----------Universal dialog for open managed transporter details page---------------- */}
      {!!managedTransporterDetailsPopup && managedTransporterDetailsPopup.action.open && (
        <UniversalDialog
          action={{ ...managedTransporterDetailsPopup.action }}
          onClose={handleManagedTransporterDetailTogglePopup}
          title={managedTransporterDetailsPopup.title}
          hasPrimaryButton={false}
        >
          <AddManagedTransporter
            onClose={() => handleManagedTransporterDetailTogglePopup()}
            isEditMode={true}
            existingData={managedTransporterDetailsPopup.data.existingData}
            isDisable={true}
          />
        </UniversalDialog>
      )}

      {/* Edit modal */}
      {!!editManagedTransporterPopup && editManagedTransporterPopup.action.open && (
        <UniversalDialog
          action={{ ...editManagedTransporterPopup.action }}
          onClose={handleEditManagedTransporterTogglePopup}
          title={editManagedTransporterPopup.title}
          hasPrimaryButton={false}
        >
          <AddManagedTransporter
            onClose={() => {
              handleEditManagedTransporterTogglePopup();
              refetchManagedTransporterAllData && refetchManagedTransporterAllData();
            }}
            isEditMode={editManagedTransporterPopup?.data?.isEditMode}
            existingData={editManagedTransporterPopup?.data.existingData}
            refetchManagedTransporterAllData={refetchManagedTransporterAllData}
          />
        </UniversalDialog>
      )}

      {/* Delete modal */}
      <UniversalDialog
        action={{ ...deleteConfirmModal.action }}
        onClose={() => handleDeleteManagedTransporterToggle('')}
        title={deleteConfirmModal.title}
        hasPrimaryButton={false}
      >
        <>
          <h3 className="text-xl">Are you sure you want to delete this managed transporter?</h3>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
              <Button variant="outlined" color="secondary" onClick={() => handleDeleteManagedTransporterToggle('')}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="outlined"
                onClick={() => handleDeleteManagedTransporter(deleteConfirmModal.data.existingData.id)}
              >
                Delete
              </Button>
            </Stack>
          </Grid>
        </>
      </UniversalDialog>
    </>
  );
};

export default ManagedTransportTable;
