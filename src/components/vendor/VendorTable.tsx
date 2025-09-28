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
import AddVendor from './AddVendor';
import VendorServiceInstance from 'services/vendor.services';
// ===========================|| DATA WIDGET - PROJECT TABLE CARD ||=========================== //

const VendorTable = ({
  data,
  limit,
  setLimit,
  page,
  setPage,
  count,
  refetchVendorAllData
}: {
  data: any;
  limit: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  count: number;
  refetchVendorAllData?: () => void;
}) => {
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
    setLimit(parseInt(event?.target.value!, 10));
    setPage(0);
  };

  // -------------- Show transporter details page pop up --------------
  const [vendorDetailsPopup, setVendorDetailsPopup] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      maxWidth: 'md'
    },
    title: 'Vendor Details',
    data: { existingData: {}, isEditMode: false }
  });

  const [deleteConfirmModal, setDeleteConfirmModal] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      maxWidth: 'md'
    },
    title: 'Delete Bilty Confirmation',
    data: { existingData: {}, isEditMode: false }
  });

  //-------------------handlers-------------------
  const handleVendorDetailTogglePopup = async (vendorData?: any) => {
    if (vendorDetailsPopup.action.open === true) {
      // refetchTransporterData();
    }
    setVendorDetailsPopup((prev: any) => {
      return {
        ...prev,
        data: { isEditMode: false, existingData: { vendorData } },
        action: { ...prev.action, open: !prev.action.open },
        title: <FormattedMessage id="Vendor Details" />
      };
    });
  };

  const handleDeleteVendorToggle = async (id: string) => {
    setDeleteConfirmModal((prev) => ({
      ...prev,
      data: { isEditMode: false, existingData: { id } },
      action: { ...prev.action, open: !prev.action.open },
      title: <FormattedMessage id="Delete Vendor Confirmation" defaultMessage="Delete vendor Confirmation" />
    }));
  };

  // Delete transporter
  const handleDeleteVendor = async (id: string) => {
    try {
      const deleteVendor = await VendorServiceInstance.deleteVendor(id);
      if (deleteVendor && refetchVendorAllData) {
        refetchVendorAllData();
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
                <TableCell>Vendor Name</TableCell>
                <TableCell>Vendor Address</TableCell>
                <TableCell>Vendor Number</TableCell>
                <TableCell align="right">Vendor Bussiness</TableCell>
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
                          {row?.email}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.mobileNumber}</TableCell>
                  <TableCell align="right" sx={{ pr: 3 }}>
                    {row.business}
                  </TableCell>
                  <TableCell align="right" onClick={() => handleVendorDetailTogglePopup(row)}>
                    <Tooltip title="full-details">
                      <IconButton>
                        <EyeOutlined className="text-blue-500" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="delete" onClick={() => handleDeleteVendorToggle(row._id)}>
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
      {!!vendorDetailsPopup && vendorDetailsPopup.action.open && (
        <UniversalDialog
          action={{ ...vendorDetailsPopup.action }}
          onClose={handleVendorDetailTogglePopup}
          title={vendorDetailsPopup.title}
          hasPrimaryButton={false}
        >
          <AddVendor
            onClose={() => handleVendorDetailTogglePopup()}
            isEditMode={true}
            existingData={vendorDetailsPopup.data.existingData}
            isDisable={true}
          />
        </UniversalDialog>
      )}
      {/* Delete model confirmation */}
      <UniversalDialog
        action={{ ...deleteConfirmModal.action }}
        onClose={() => handleDeleteVendorToggle('')}
        title={deleteConfirmModal.title}
        hasPrimaryButton={false}
      >
        <>
          <h3 className="text-xl">Are you sure you want to delete this vendor.</h3>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
              <Button variant="outlined" color="secondary" onClick={() => handleDeleteVendorToggle('')}>
                Cancel
              </Button>
              <Button type="submit" variant="outlined" onClick={() => handleDeleteVendor(deleteConfirmModal.data.existingData.id)}>
                Delete
              </Button>
            </Stack>
          </Grid>
        </>
      </UniversalDialog>
    </>
  );
};

export default VendorTable;
