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
import TransporterServiceInstance from 'services/transporter.services';
import { TUniversalDialogProps } from 'types/types.UniversalDialog';
import AddTransporter from './AddTransporter';

// ===========================|| DATA WIDGET - PROJECT TABLE CARD ||=========================== //

const TransportTable = ({
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
  refetchTransporterAllData?: () => void;
}) => {
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
    setLimit(parseInt(event?.target.value!, 10));
    setPage(0);
  };

  // -------------- Show transporter details page pop up --------------
  const [transporterDetailsPopup, setTransporterDetailsPopup] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      maxWidth: 'md'
    },
    title: 'Transporter Details',
    data: { existingData: {}, isEditMode: false }
  });

  const [deleteConfirmModal, setDeleteConfirmModal] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      maxWidth: 'md'
    },
    title: 'Delete Transporter Confirmation',
    data: { existingData: {}, isEditMode: false }
  });

  //-------------------handlers-------------------
  const handleTransporterDetailTogglePopup = async (transporterData?: any) => {
    if (transporterDetailsPopup.action.open === true) {
      // refetchTransporterData();
    }
    setTransporterDetailsPopup((prev: any) => {
      return {
        ...prev,
        data: { isEditMode: false, existingData: { transporterData } },
        action: { ...prev.action, open: !prev.action.open },
        title: <FormattedMessage id="Transporter Details" />
      };
    });
  };

  const handleDeleteTransporterToggle = async (id: string) => {
    setDeleteConfirmModal((prev) => ({
      ...prev,
      data: { isEditMode: false, existingData: { id } },
      action: { ...prev.action, open: !prev.action.open },
      title: <FormattedMessage id="Delete Transporter Confirmation" defaultMessage="Delete Transporter Confirmation" />
    }));
  };

  // Delete transporter
  const handleDeleteTransporter = async (id: string) => {
    try {
      const deleteTransport = await TransporterServiceInstance.deleteTransporter(id);
      if (deleteTransport && refetchTransporterAllData) {
        refetchTransporterAllData();
      }
    } catch (error) {
      console.log('Error occured while delete transporter', error);
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
                  <TableCell>Registration Number</TableCell>
                  <TableCell align="right">Mobile Number</TableCell>
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
                            {row.transportName}
                          </Typography>
                          <Typography align="left" variant="caption" color="secondary">
                            {row.email}
                          </Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell>{` ${row.first_name} ${row.last_name}`}</TableCell>
                    <TableCell>{row.registrationNumber}</TableCell>
                    <TableCell align="right" sx={{ pr: 3 }}>
                      {row.officeNumber}
                    </TableCell>
                    <TableCell align="right" onClick={() => handleTransporterDetailTogglePopup(row)}>
                      <Tooltip title="full-details">
                        <IconButton>
                          <EyeOutlined className="text-blue-500" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="delete" onClick={() => handleDeleteTransporterToggle(row._id)}>
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
      ) : (
        <p className="flex justify-center w-full m-5">No transporter available</p>
      )}
      {/* -----------Universal dialog for open transport details page---------------- */}
      {!!transporterDetailsPopup && transporterDetailsPopup.action.open && (
        <UniversalDialog
          action={{ ...transporterDetailsPopup.action }}
          onClose={handleTransporterDetailTogglePopup}
          title={transporterDetailsPopup.title}
          hasPrimaryButton={false}
        >
          <AddTransporter
            onClose={() => handleTransporterDetailTogglePopup()}
            isEditMode={true}
            existingData={transporterDetailsPopup.data.existingData}
            isDisable={true}
          />
        </UniversalDialog>
      )}

      {/* Delete modal */}
      <UniversalDialog
        action={{ ...deleteConfirmModal.action }}
        onClose={() => handleDeleteTransporterToggle('')}
        title={deleteConfirmModal.title}
        hasPrimaryButton={false}
      >
        <>
          <h3 className="text-xl">Are you sure you want to delete this transporter.</h3>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
              <Button variant="outlined" color="secondary" onClick={() => handleDeleteTransporterToggle('')}>
                Cancel
              </Button>
              <Button type="submit" variant="outlined" onClick={() => handleDeleteTransporter(deleteConfirmModal.data.existingData.id)}>
                Delete
              </Button>
            </Stack>
          </Grid>
        </>
      </UniversalDialog>
    </>
  );
};

export default TransportTable;
