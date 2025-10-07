// material-ui
import { DeleteOutlined, DownloadOutlined, EyeOutlined } from '@ant-design/icons';
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
  Button,
  Box
} from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import UniversalDialog from 'components/popup/UniversalDialog';
import { useState, useRef, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { TUniversalDialogProps } from 'types/types.UniversalDialog';
import biltyServiceInstance from 'services/bilty.services';
import BiltyDocument from './BiltyDocument';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// ===========================|| DATA WIDGET - PROJECT TABLE CARD ||=========================== //

const sampleBiltyData: any = {
  company: {
    name: 'Shree Krishna Transport',
    branchCode: '3435',
    gstNo: 'PSV1310',
    panNo: 'CQHPV51671',
    address: 'New Bypass Road, Devnagar, Ganheda Road, Pushkar, Pushkar, Rajasthan - 305022',
    email: 'pankajvaishnav128@gmail.com',
    website: 'pankaj-swami-vaishnav.onrender.com',
    phone: '707327213'
  },
  lrDate: '31-08-2025',
  lrNo: '1',
  truckVehicleNo: 'RJ-01GB-1737',
  transportMode: 'By Road',
  from: 'Pushkar',
  to: 'Tamilnadu',
  deliveryType: 'Door',
  paymentStatus: 'Paid',
  consignor: {
    name: 'Deepak Swami Vaishnav',
    gstNo: 'CQHPV516712',
    mobile: '9352673924',
    address: 'Maali Mohalla Banseli, Ajmer, Rajasthan, India - 35012'
  },
  consignee: {
    name: 'Sugan Singh',
    gstNo: '78444458545',
    mobile: '0145277308',
    address: 'jaipur, A.Thirumuruganpoondi, Tamil Nadu, India - 85442'
  },
  insuranceDetails: 'Insurance details is not available or not insured.',
  items: [
    {
      srNo: 1,
      productMaterial: 'Vegetables',
      packagingType: 'Box',
      hsnCode: '-',
      articles: '0.00 KG',
      actualWeight: '0.00 KG',
      chargeRate: '₹ 100,000.00/KG',
      freightRate: '',
      packingUnpackingCharge: ''
    }
  ],
  charges: {
    serviceCharge: 0,
    loadingUnloadingCharge: 0,
    codDodCharge: 0,
    otherCharges: 0,
    subtotal: 0,
    sgstRate: 0.0,
    sgstAmount: 0,
    cgstRate: 0.0,
    cgstAmount: 0,
    totalFreight: 0,
    advancePaid: 0,
    remainingPayableAmount: 0,
    gstPayableBy: 'Consignee',
    total: 0,
    remainingAmountToBePaidBy: 'Consignor'
  },
  weightGuarantee: '100.00 MTS',
  serviceArea: 'All India',
  otherRemarks: '',
  receiverComments: '3,300,064',
  bankDetails: {
    bankName: '',
    accountNo: '',
    ifsc: ''
  }
};

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
  const documentRef = useRef<HTMLDivElement>(null);
  const [biltyForDownload, setBiltyForDownload] = useState<any>(null);

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
        title: <FormattedMessage id="Bilty Detail" />
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

  // -------------- Download bilty pdf function --------------
  const handleDownloadBilty = async (biltyData?: any) => {
    if (!documentRef.current) return;

    // Capture the content as canvas
    const canvas = await html2canvas(documentRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    pdf.save(`bilty_${biltyData.truckVehicleNo || 'document'}.pdf`);
  };

  // -------------- Download bilty pdf useEffect --------------
  useEffect(() => {
    // This function runs whenever biltyForDownload changes
    const generatePdf = async () => {
      if (biltyForDownload && documentRef.current) {
        const canvas = await html2canvas(documentRef.current, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = 210;
        const pageHeight = 297;
        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        // Use a dynamic name from the actual bilty data
        pdf.save(`bilty_${biltyForDownload.truckVehicleNo || 'document'}.pdf`);

        // IMPORTANT: Reset the state to hide the component after download
        setBiltyForDownload(null);
      }
    };

    generatePdf();
  }, [biltyForDownload]);

  return (
    <>
      {/* Bilty for download but it is hidden from the screen*/}
      {biltyForDownload && (
        <Box sx={{ position: 'absolute', zIndex: -1, left: '-9999px', top: 0 }}>
          <div ref={documentRef}>
            <BiltyDocument data={biltyForDownload} />
          </div>
        </Box>
      )}
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
                <TableCell align="center" colSpan={3}>
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
                  <TableCell
                    align="right"
                    onClick={() => {
                      setBiltyForDownload(sampleBiltyData);
                    }}
                  >
                    <Tooltip title="download bilty">
                      <IconButton>
                        <DownloadOutlined className="text-blue-500" />
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
          <>
            <div ref={documentRef}>
              <BiltyDocument data={sampleBiltyData} />
            </div>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => handleDownloadBilty(sampleBiltyData)}>
              Download PDF
            </Button>
          </>
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
