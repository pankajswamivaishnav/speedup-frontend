// material-ui
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import moment from 'moment';
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
import AddBilty from './AddBilty';
import biltyServiceInstance from 'services/bilty.services';

// ===========================|| DATA WIDGET - PROJECT TABLE CARD ||=========================== //

const BiltyTable = ({
  data,
  limit,
  setLimit,
  page,
  setPage,
  count,
  refetchBiltyAllData
}: {
  data: any;
  limit: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  count: number;
  refetchBiltyAllData?: () => void;
}) => {
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
    setLimit(parseInt(event?.target.value!, 10));
    setPage(0);
  };
  // -------------- Show bilty details page pop up --------------
  const [biltiesDetailsPopup, setBiltyDetailsPopup] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      maxWidth: 'md'
    },
    title: 'Bilty Detail',
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
  const handleBiltyDetailTogglePopup = async (transporterData?: any) => {
    if (biltiesDetailsPopup.action.open === true) {
      // refetchTransporterData();
    }
    setBiltyDetailsPopup((prev: any) => {
      return {
        ...prev,
        data: { isEditMode: false, existingData: { transporterData } },
        action: { ...prev.action, open: !prev.action.open },
        title: <FormattedMessage id="Driver Detail" />
      };
    });
  };

  const handleDeleteBiltyToggle = async (id: string) => {
    setDeleteConfirmModal((prev) => ({
      ...prev,
      data: { isEditMode: false, existingData: { id } },
      action: { ...prev.action, open: !prev.action.open },
      title: <FormattedMessage id="Delete Bilty Confirmation" defaultMessage="Delete Bilty Confirmation" />
    }));
  };

  // Delete Bilty
  const handleDeleteBilty = async (id: string) => {
    try {
      const deleteBilty = await biltyServiceInstance.deleteBilty(id);
      if (deleteBilty && refetchBiltyAllData) {
        refetchBiltyAllData();
      }
    } catch (error) {
      console.log('Error occured while delete bilty', error);
    }
  };

  return (
    <>
      <MainCard content={false} sx={{ width: '90vw', overflowX: 'hidden' }}>
        <TableContainer sx={{ width: '100%', maxHeight: 550, overflowX: 'auto' }}>
          <Table sx={{ width: '100%', tableLayout: 'auto' }}>
            <TableHead>
              <TableRow>
                <TableCell>Bilty Number</TableCell>
                <TableCell align="center">Truck Number</TableCell>
                <TableCell align="center">Transporter Number</TableCell>
                <TableCell align="center">Driver Name</TableCell>
                <TableCell align="center">Date</TableCell>
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
                          {row.biltyNumber}
                        </Typography>
                        <Typography align="left" variant="caption" color="secondary">
                          Driver &nbsp; {row.driverPhoneNumber}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell align="center">{row.truckNumber.toUpperCase()}</TableCell>
                  <TableCell align="center">{row.transporterNumber}</TableCell>
                  <TableCell align="center" sx={{ pr: 3 }}>
                    {row.driverName}
                  </TableCell>
                  <TableCell align="center">{moment(row.date).format('YYYY-MM-DD, hh:mm A')}</TableCell>
                  <TableCell align="right" onClick={() => handleBiltyDetailTogglePopup(row)}>
                    <Tooltip title="full-details">
                      <IconButton>
                        <EyeOutlined className="text-blue-500" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="delete" onClick={() => handleDeleteBiltyToggle(row._id)}>
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
      {!!biltiesDetailsPopup && biltiesDetailsPopup.action.open && (
        <UniversalDialog
          action={{ ...biltiesDetailsPopup.action }}
          onClose={handleBiltyDetailTogglePopup}
          title={biltiesDetailsPopup.title}
          hasPrimaryButton={false}
        >
          <AddBilty
            onClose={() => handleBiltyDetailTogglePopup()}
            isEditMode={true}
            existingData={biltiesDetailsPopup.data.existingData}
            isDisable={true}
          />
        </UniversalDialog>
      )}

      {/* Delete modal */}
      <UniversalDialog
        action={{ ...deleteConfirmModal.action }}
        onClose={() => handleDeleteBiltyToggle('')}
        title={deleteConfirmModal.title}
        hasPrimaryButton={false}
      >
        <>
          <h3 className="text-xl">Are you sure you want to delete this bilty.</h3>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
              <Button variant="outlined" color="secondary" onClick={() => handleDeleteBiltyToggle('')}>
                Cancel
              </Button>
              <Button type="submit" variant="outlined" onClick={() => handleDeleteBilty(deleteConfirmModal.data.existingData.id)}>
                Delete
              </Button>
            </Stack>
          </Grid>
        </>
      </UniversalDialog>
    </>
  );
};

export default BiltyTable;
