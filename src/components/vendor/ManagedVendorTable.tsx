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
import VendorServiceInstance from 'services/vendor.services';
import { TUniversalDialogProps } from 'types/types.UniversalDialog';
import AddManagedVendor from './AddManagedVendor';
import useAuth from 'hooks/useAuth';

// ===========================|| DATA WIDGET - MANAGED VENDOR TABLE CARD ||=========================== //

const ManagedVendorTable = ({
  data,
  limit,
  setLimit,
  page,
  setPage,
  count,
  refetchManagedVendorAllData
}: {
  data: any;
  limit: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  count: number;
  refetchManagedVendorAllData?: () => void;
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

  // -------------- Show managed vendor details page pop up --------------
  const [managedVendorDetailsPopup, setManagedVendorDetailsPopup] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      maxWidth: 'md'
    },
    title: 'Managed Vendor Details',
    data: { existingData: {}, isEditMode: false }
  });

  // -------------- Edit managed vendor pop up --------------
  const [editManagedVendorPopup, setEditManagedVendorPopup] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      fullScreen: true
    },
    title: 'Edit Managed Vendor',
    data: { existingData: {}, isEditMode: false }
  });

  const [deleteConfirmModal, setDeleteConfirmModal] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      maxWidth: 'md'
    },
    title: 'Delete Managed Vendor Confirmation',
    data: { existingData: {}, isEditMode: false }
  });

  //-------------------handlers-------------------
  const handleManagedVendorDetailTogglePopup = async (managedVendorData?: any) => {
    if (managedVendorDetailsPopup.action.open === true) {
      // refetchManagedVendorData();
    }
    setManagedVendorDetailsPopup((prev: any) => {
      return {
        ...prev,
        data: { isEditMode: false, existingData: { managedVendorData } },
        action: { ...prev.action, open: !prev.action.open },
        title: <FormattedMessage id="Managed Vendor Details" />
      };
    });
  };

  const handleEditManagedVendorTogglePopup = async (managedVendorData?: any) => {
    if (editManagedVendorPopup.action.open === true) {
      // refetchManagedVendorData();
    }
    setEditManagedVendorPopup((prev: any) => {
      return {
        ...prev,
        data: { isEditMode: true, existingData: { managedVendorData } },
        action: { ...prev.action, open: !prev.action.open },
        title: <FormattedMessage id="Edit Managed Vendor" />
      };
    });
  };

  const handleDeleteManagedVendorToggle = async (id: string) => {
    setDeleteConfirmModal((prev) => ({
      ...prev,
      data: { isEditMode: false, existingData: { id } },
      action: { ...prev.action, open: !prev.action.open },
      title: <FormattedMessage id="Delete Managed Vendor Confirmation" defaultMessage="Delete Managed Vendor Confirmation" />
    }));
  };

  // Delete managed vendor
  const handleDeleteManagedVendor = async (id: string) => {
    try {
      const deleteManagedVendor = await VendorServiceInstance.deleteManagedVendor(id);
      if (deleteManagedVendor && refetchManagedVendorAllData) {
        refetchManagedVendorAllData();
        handleDeleteManagedVendorToggle('');
      }
    } catch (error) {
      console.log('Error occured while delete managed vendor', error);
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
                  <TableCell>Vendor Name</TableCell>
                  <TableCell>Mobile Number</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Business</TableCell>
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
                          {row.secondaryMobileNumber && (
                            <Typography align="left" variant="caption" color="secondary">
                              Secondary: {row.secondaryMobileNumber}
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell>{row.mobileNumber}</TableCell>
                    <TableCell>{row.email || 'vendor@yopmail.com'}</TableCell>
                    <TableCell sx={{ pr: 3 }}>{row.business || '-'}</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1}>
                        <Tooltip title="full-details">
                          <IconButton onClick={() => handleManagedVendorDetailTogglePopup(row)}>
                            <EyeOutlined className="text-blue-500" />
                          </IconButton>
                        </Tooltip>
                        {user?.isPremium === true && (
                          <Tooltip title="edit">
                            <IconButton onClick={() => handleEditManagedVendorTogglePopup(row)}>
                              <EditOutlined className="text-green-500" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {user?.isPremium === true && (
                          <Tooltip title="delete">
                            <IconButton onClick={() => handleDeleteManagedVendorToggle(row._id)}>
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
        <p className="flex justify-center w-full m-5">No managed vendor available</p>
      )}
      {/* -----------Universal dialog for open managed vendor details page---------------- */}
      {!!managedVendorDetailsPopup && managedVendorDetailsPopup.action.open && (
        <UniversalDialog
          action={{ ...managedVendorDetailsPopup.action }}
          onClose={handleManagedVendorDetailTogglePopup}
          title={managedVendorDetailsPopup.title}
          hasPrimaryButton={false}
        >
          <AddManagedVendor
            onClose={() => handleManagedVendorDetailTogglePopup()}
            isEditMode={true}
            existingData={managedVendorDetailsPopup.data.existingData}
            isDisable={true}
          />
        </UniversalDialog>
      )}

      {/* Edit modal */}
      {!!editManagedVendorPopup && editManagedVendorPopup.action.open && (
        <UniversalDialog
          action={{ ...editManagedVendorPopup.action }}
          onClose={handleEditManagedVendorTogglePopup}
          title={editManagedVendorPopup.title}
          hasPrimaryButton={false}
        >
          <AddManagedVendor
            onClose={() => {
              handleEditManagedVendorTogglePopup();
              refetchManagedVendorAllData && refetchManagedVendorAllData();
            }}
            isEditMode={editManagedVendorPopup?.data?.isEditMode}
            existingData={editManagedVendorPopup?.data.existingData}
            refetchManagedVendorAllData={refetchManagedVendorAllData}
          />
        </UniversalDialog>
      )}

      {/* Delete modal */}
      <UniversalDialog
        action={{ ...deleteConfirmModal.action }}
        onClose={() => handleDeleteManagedVendorToggle('')}
        title={deleteConfirmModal.title}
        hasPrimaryButton={false}
      >
        <>
          <h3 className="text-xl">Are you sure you want to delete this managed vendor?</h3>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
              <Button variant="outlined" color="secondary" onClick={() => handleDeleteManagedVendorToggle('')}>
                Cancel
              </Button>
              <Button type="submit" variant="outlined" onClick={() => handleDeleteManagedVendor(deleteConfirmModal.data.existingData.id)}>
                Delete
              </Button>
            </Stack>
          </Grid>
        </>
      </UniversalDialog>
    </>
  );
};

export default ManagedVendorTable;
