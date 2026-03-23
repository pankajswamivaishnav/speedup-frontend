import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import MainCard from 'components/MainCard';
import SEO from 'components/SEO';
import SkeletonProductPlaceholder from 'components/cards/skeleton/ProductPlaceholder';
import useAuth from 'hooks/useAuth';
import loadServiceInstance from 'services/load.service.';
import { DeleteOutlined, EditFilled, EyeOutlined } from '@ant-design/icons';
import UniversalDialog from 'components/popup/UniversalDialog';
import { Stack } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { TUniversalDialogProps } from 'types/types.UniversalDialog';
import CreateLoad from './CreateLoad';
import { getDistanceAndTime } from 'helper/function';

const Loads = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [count, setCount] = useState<number>(0);
  const [loadsData, setLoadsData] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [viewLoadPopup, setViewLoadPopup] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      maxWidth: 'md'
    },
    title: 'View Load',
    data: { existingData: {}, isEditMode: false }
  });
  const [routeDetails, setRouteDetails] = useState<{ distanceKm: string; durationHours: string } | null>(null);
  const [routeLoading, setRouteLoading] = useState<boolean>(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  // ---------- Use Effects ---------
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setPage(0);
    }, 400);

    return () => clearTimeout(handler);
  }, [searchInput]);

  // useEffect(() => {
  //   const fetchDistance = async () => {
  //     if (values.pickupLat && values.dropLat) {
  //       const distance = await getDistance({ lat: values.pickupLat, lng: values.pickupLng }, { lat: values.dropLat, lng: values.dropLng });

  //       if (distance) {
  //         setFieldValue('distance', distance);
  //       }
  //     }
  //   };

  //   fetchDistance();
  // }, [values.pickupLat, values.dropLat]);

  const isVendor = useMemo(() => user?.role === 'vendor', [user?.role]);
  const isTransporter = useMemo(() => user?.role === 'transporter', [user?.role]);

  const {
    data,
    refetch: refetchAllLoadsData,
    isLoading,
    isFetching
  } = useQuery({
    queryKey: ['loads_data', user?.role, page, limit, debouncedSearch, startDate, endDate],
    queryFn: async () => {
      if (isVendor) {
        return loadServiceInstance.getMyLoads({
          page,
          limit,
          startDate: startDate ? new Date(startDate).toISOString() : '',
          endDate: endDate ? new Date(`${endDate}T23:59:59`).toISOString() : ''
        });
      }

      if (isTransporter) {
        return loadServiceInstance.getAllLoads({
          page,
          limit,
          filter: debouncedSearch
        });
      }

      return { data: [], total: 0 };
    },
    enabled: isVendor || isTransporter,
    refetchOnWindowFocus: false
  });

  const [deleteConfirmModal, setDeleteConfirmModal] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      maxWidth: 'md'
    },
    title: 'Delete Load Confirmation',
    data: { existingData: {}, isEditMode: false }
  });

  // -------------- Edit managed Load pop up --------------
  const [editLoadPopup, setEditLoadPopup] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      maxWidth: 'xl'
    },
    title: 'Edit Load',
    data: { existingData: {}, isEditMode: false }
  });

  // ------------ Handlers ---------------
  const handleDeleteLoadToggle = async (id: string) => {
    setDeleteConfirmModal((prev: any) => ({
      ...prev,
      data: { isEditMode: false, existingData: { id } },
      action: { ...prev.action, open: !prev.action.open },
      title: <FormattedMessage id="Delete Load Confirmation" defaultMessage="Delete Load Confirmation" />
    }));
  };

  // Delete Loads
  const handleDeleteLoad = async (id: string) => {
    try {
      const deleteLoad = await loadServiceInstance.deleteLoad(id);
      if (deleteLoad && refetchAllLoadsData) {
        handleDeleteLoadToggle('');
        refetchAllLoadsData();
      }
    } catch (error) {
      console.log('Error occured while delete load', error);
    }
  };

  const handleEditLoadTogglePopup = async (loadData?: any) => {
    if (editLoadPopup.action.open === true) {
      // refetchManagedTransporterData();
    }
    setEditLoadPopup((prev: any) => {
      return {
        ...prev,
        data: { isEditMode: true, existingData: { loadData } },
        action: { ...prev.action, open: !prev.action.open },
        title: <FormattedMessage id="Edit Load" />
      };
    });
  };

  const handleViewLoadTogglePopup = async (loadData?: any) => {
    const shouldOpen = !viewLoadPopup.action.open;

    setViewLoadPopup((prev: any) => ({
      ...prev,
      data: { isEditMode: false, existingData: { loadData: loadData || {} } },
      action: { ...prev.action, open: shouldOpen },
      title: <FormattedMessage id="View Load" defaultMessage="View Load" />
    }));

    if (shouldOpen && loadData) {
      const pickupLat = Number(loadData?.pickupLocation?.lat);
      const pickupLng = Number(loadData?.pickupLocation?.long);
      const dropLat = Number(loadData?.dropLocation?.lat);
      const dropLng = Number(loadData?.dropLocation?.long);

      if ([pickupLat, pickupLng, dropLat, dropLng].every((value) => !Number.isNaN(value))) {
        setRouteLoading(true);
        const route = await getDistanceAndTime({ lat: pickupLat, lng: pickupLng }, { lat: dropLat, lng: dropLng });
        setRouteDetails(route);
        setRouteLoading(false);
      } else {
        setRouteDetails(null);
      }
    } else {
      setRouteDetails(null);
      setRouteLoading(false);
    }
  };

  // -------------- Add load page pop up --------------
  const [loadFormPopup, setLoadFormPopup] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      maxWidth: 'xl'
    },
    title: 'Add Load',
    data: { existingData: {}, isEditMode: false }
  });

  // Add Load
  const handleTogglePopup = async (id?: string) => {
    if (loadFormPopup.action.open === true) {
      // refetchTransporterData();
    }
    setLoadFormPopup((prev: any) => {
      return {
        ...prev,
        data: { isEditMode: false, existingData: {} },
        action: { ...prev.action, open: !prev.action.open },
        title: <FormattedMessage id="Add Load" />
      };
    });
  };

  useEffect(() => {
    if (data) {
      setLoadsData(data.data || []);
      setCount(data.total || 0);
    }
  }, [data]);

  useEffect(() => {
    if (user?.role === 'driver') {
      navigate('/dashboard');
    }
  }, [navigate, user?.role]);

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <SEO
        title="Loads Management | Speedupora TMS"
        description="Manage and track vendor and transporter loads with filters and pagination."
        canonicalUrl="https://www.speedupora.com/loads"
        noIndex
      />

      <Box sx={{ display: 'flex' }} className="ps-6">
        <Grid container spacing={2.5}>
          <Grid item xs={12} className="flex flex-col xl:flex-row justify-between items-center gap-2 mb-5">
            <div>
              <h2 className="text-2xl font-semibold">Loads</h2>
            </div>

            <div className="flex gap-2 w-full xl:w-auto flex-wrap justify-end">
              {isTransporter && (
                <TextField
                  size="small"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search loads..."
                />
              )}

              {isVendor && (
                <>
                  <TextField
                    size="small"
                    label="Start Date"
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      setPage(0);
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    size="small"
                    label="End Date"
                    type="date"
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                      setPage(0);
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                </>
              )}

              {isVendor && (
                <Button variant="outlined" onClick={() => handleTogglePopup()}>
                  Add Load
                </Button>
              )}
            </div>
          </Grid>

          <Grid item xs={12}>
            {(isLoading || isFetching) && (
              <Grid container spacing={3}>
                {[1, 2, 3, 4, 5].map((item) => (
                  <Grid item xs={12} key={item}>
                    <SkeletonProductPlaceholder />
                  </Grid>
                ))}
              </Grid>
            )}

            {!isLoading && !isFetching && (
              <MainCard content={false} sx={{ width: '100%', overflowX: 'hidden' }}>
                {loadsData?.length > 0 ? (
                  <>
                    <TableContainer sx={{ width: '100%', maxHeight: 560, overflowX: 'auto' }}>
                      <Table
                        sx={{
                          width: '100%',
                          tableLayout: 'auto'
                        }}
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>Material Name</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Pickup</TableCell>
                            <TableCell>Drop</TableCell>
                            <TableCell>Vehicle Type</TableCell>
                            <TableCell>Price Expected</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Available From</TableCell>
                            <TableCell>Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {loadsData.map((row: any, index: number) => (
                            <TableRow hover key={row?._id || index}>
                              <TableCell>{row?.materialName || '-'}</TableCell>
                              <TableCell>{row?.quantity ?? '-'}</TableCell>
                              <TableCell>{`${row?.pickupLocation?.city || '-'}, ${row?.pickupLocation?.state || '-'}`}</TableCell>
                              <TableCell>{`${row?.dropLocation?.city || '-'}, ${row?.dropLocation?.state || '-'}`}</TableCell>
                              <TableCell>{row?.vehicleType || '-'}</TableCell>
                              <TableCell>{row?.priceExpected ?? '-'}</TableCell>
                              <TableCell>{row?.status || '-'}</TableCell>
                              <TableCell>{row?.availableFrom ? new Date(row.availableFrom).toLocaleString() : '-'}</TableCell>
                              <TableCell>
                                <Stack direction="row" spacing={1}>
                                  <Tooltip title="View Load">
                                    <IconButton onClick={() => handleViewLoadTogglePopup(row)}>
                                      <EyeOutlined className="text-blue-500" />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Edit-Load">
                                    <IconButton>
                                      <EditFilled className="text-blue-500" onClick={() => handleEditLoadTogglePopup(row)} />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Delete Load" onClick={() => handleDeleteLoadToggle(row._id)}>
                                    <IconButton>
                                      <DeleteOutlined className="text-red-600" />
                                    </IconButton>
                                  </Tooltip>
                                </Stack>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[10, 20, 50]}
                      component="div"
                      count={count}
                      rowsPerPage={limit}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </>
                ) : (
                  <p className="flex justify-center w-full m-5">No loads available</p>
                )}
              </MainCard>
            )}
          </Grid>
        </Grid>

        {/* Delete modal */}
        <UniversalDialog
          action={{ ...deleteConfirmModal.action }}
          onClose={() => handleDeleteLoadToggle('')}
          title={deleteConfirmModal.title}
          hasPrimaryButton={false}
        >
          <>
            <h3 className="text-xl">Are you sure you want to delete this load.</h3>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                <Button variant="outlined" color="secondary" onClick={() => handleDeleteLoadToggle('')}>
                  Cancel
                </Button>
                <Button type="submit" variant="outlined" onClick={() => handleDeleteLoad(deleteConfirmModal.data.existingData.id)}>
                  Delete
                </Button>
              </Stack>
            </Grid>
          </>
        </UniversalDialog>

        {/* -----------Universal dialog for open add load page----------------*/}
        {!!loadFormPopup && loadFormPopup.action.open && (
          <UniversalDialog
            action={{ ...loadFormPopup.action }}
            onClose={handleTogglePopup}
            title={loadFormPopup.title}
            hasPrimaryButton={false}
          >
            <CreateLoad
              onClose={() => handleTogglePopup()}
              isEditMode={loadFormPopup?.data?.isEditMode}
              existingData={loadFormPopup?.data.existingData}
              refetchAllLoadsData={refetchAllLoadsData}
            />
          </UniversalDialog>
        )}

        {/* Edit modal */}
        {!!editLoadPopup && editLoadPopup.action.open && (
          <UniversalDialog
            action={{ ...editLoadPopup.action }}
            onClose={handleEditLoadTogglePopup}
            title={editLoadPopup.title}
            hasPrimaryButton={false}
          >
            <CreateLoad
              onClose={() => {
                handleEditLoadTogglePopup();
                refetchAllLoadsData && refetchAllLoadsData();
              }}
              isEditMode={editLoadPopup?.data?.isEditMode}
              existingData={editLoadPopup?.data.existingData}
              refetchAllLoadsData={refetchAllLoadsData}
            />
          </UniversalDialog>
        )}

        {/* View Load modal */}
        {!!viewLoadPopup && viewLoadPopup.action.open && (
          <UniversalDialog
            action={{ ...viewLoadPopup.action }}
            onClose={handleViewLoadTogglePopup}
            title={viewLoadPopup.title}
            hasPrimaryButton={false}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <strong>Material Name:</strong> {viewLoadPopup?.data?.existingData?.loadData?.materialName || '-'}
              </Grid>
              <Grid item xs={12} sm={6}>
                <strong>Quantity:</strong> {viewLoadPopup?.data?.existingData?.loadData?.quantity ?? '-'}
              </Grid>
              <Grid item xs={12} sm={6}>
                <strong>Vehicle Type:</strong> {viewLoadPopup?.data?.existingData?.loadData?.vehicleType || '-'}
              </Grid>
              <Grid item xs={12} sm={6}>
                <strong>Price Expected:</strong> {viewLoadPopup?.data?.existingData?.loadData?.priceExpected ?? '-'}
              </Grid>
              <Grid item xs={12} sm={6}>
                <strong>Status:</strong> {viewLoadPopup?.data?.existingData?.loadData?.status || '-'}
              </Grid>
              <Grid item xs={12} sm={6}>
                <strong>Available From:</strong>{' '}
                {viewLoadPopup?.data?.existingData?.loadData?.availableFrom
                  ? new Date(viewLoadPopup.data.existingData.loadData.availableFrom).toLocaleString()
                  : '-'}
              </Grid>
              <Grid item xs={12}>
                <strong>Pickup:</strong>{' '}
                {`${viewLoadPopup?.data?.existingData?.loadData?.pickupLocation?.city || '-'}, ${
                  viewLoadPopup?.data?.existingData?.loadData?.pickupLocation?.district || '-'
                }, ${viewLoadPopup?.data?.existingData?.loadData?.pickupLocation?.state || '-'}, ${
                  viewLoadPopup?.data?.existingData?.loadData?.pickupLocation?.country || '-'
                } (${viewLoadPopup?.data?.existingData?.loadData?.pickupLocation?.postalCode || '-'})`}
              </Grid>
              <Grid item xs={12}>
                <strong>Drop:</strong>{' '}
                {`${viewLoadPopup?.data?.existingData?.loadData?.dropLocation?.city || '-'}, ${
                  viewLoadPopup?.data?.existingData?.loadData?.dropLocation?.district || '-'
                }, ${viewLoadPopup?.data?.existingData?.loadData?.dropLocation?.state || '-'}, ${
                  viewLoadPopup?.data?.existingData?.loadData?.dropLocation?.country || '-'
                } (${viewLoadPopup?.data?.existingData?.loadData?.dropLocation?.postalCode || '-'})`}
              </Grid>
              <Grid item xs={12} sm={6}>
                <strong>Distance (KM):</strong> {routeLoading ? 'Calculating...' : routeDetails?.distanceKm || '-'}
              </Grid>
              <Grid item xs={12} sm={6}>
                <strong>Time (Hours):</strong> {routeLoading ? 'Calculating...' : routeDetails?.durationHours || '-'}
              </Grid>
            </Grid>
          </UniversalDialog>
        )}
      </Box>
    </>
  );
};

export default Loads;
