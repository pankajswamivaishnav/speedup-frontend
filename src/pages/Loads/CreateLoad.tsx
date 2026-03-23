import { useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, FormHelperText, Grid, InputLabel, MenuItem, Stack, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import MainCard from 'components/MainCard';
import SEO from 'components/SEO';
import useAuth from 'hooks/useAuth';
import loadServiceInstance from 'services/load.service.';

const loadValidationSchema = Yup.object({
  materialName: Yup.string().required('Material name is required'),
  quantity: Yup.number().typeError('Quantity must be a number').required('Quantity is required'),
  pickupCity: Yup.string().required('Pickup city is required'),
  pickupState: Yup.string().required('Pickup state is required'),
  dropCity: Yup.string().required('Drop city is required'),
  dropState: Yup.string().required('Drop state is required'),
  vehicleType: Yup.string().required('Vehicle type is required'),
  priceExpected: Yup.number().typeError('Price must be a number').required('Price expected is required'),
  availableFrom: Yup.string().required('Available from is required')
});

const vehicleTypes = ['Truck', 'Mini Truck', 'Trailer', 'Container', 'LCV'];

const CreateLoad = ({
  onClose,
  isEditMode,
  existingData,
  isDisable,
  refetchAllLoadsData
}: {
  onClose?: (refetchData?: boolean) => void;
  isEditMode?: boolean;
  existingData?: { loadData?: any };
  isDisable?: boolean;
  refetchAllLoadsData?: () => void;
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [pickupSuggestions, setPickupSuggestions] = useState<any[]>([]);
  const [dropSuggestions, setDropSuggestions] = useState<any[]>([]);
  const pickupDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchPlaces = async (value: string, type: 'pickup' | 'drop') => {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(value)}&format=json&addressdetails=1`, {
      headers: {
        'User-Agent': 'PankajApp/1.0'
      }
    });

    const data = await res.json();
    const nextSuggestions = Array.isArray(data) ? data : [];
    if (type === 'pickup') {
      setPickupSuggestions(nextSuggestions);
    } else {
      setDropSuggestions(nextSuggestions);
    }
  };

  const [initialValues, setInitialValues] = useState({
    materialName: '',
    quantity: '',
    pickupCity: '',
    pickupCityLat: '',
    pickupCityLong: '',
    pickupCountry: '',
    pickupDistrict: '',
    pickupPostalCode: '',
    pickupState: '',
    dropCity: '',
    dropCityLat: '',
    dropCityLong: '',
    dropDistrict: '',
    dropPostalCode: '',
    dropCountry: '',
    dropState: '',
    vehicleType: '',
    priceExpected: '',
    availableFrom: ''
  });

  // Pre-fill form when editing
  useEffect(() => {
    if (isEditMode && existingData) {
      setInitialValues({
        materialName: existingData.loadData.materialName || '',
        quantity: existingData.loadData.quantity || '',
        pickupCity: existingData.loadData.pickupLocation?.city || '',
        pickupDistrict: existingData?.loadData?.pickupLocation?.district || '',
        pickupState: existingData.loadData.pickupLocation?.state || '',
        pickupPostalCode: existingData.loadData.pickupLocation?.postalCode || '',
        pickupCityLat: existingData.loadData.pickupLocation?.lat || '',
        pickupCityLong: existingData.loadData.pickupLocation?.long || '',
        pickupCountry: existingData.loadData.pickupLocation?.country || '',
        dropCity: existingData.loadData.dropLocation?.city || '',
        dropDistrict: existingData.loadData.dropLocation?.district || '',
        dropCityLat: existingData.loadData.dropLocation?.lat || '',
        dropCityLong: existingData.loadData.dropLocation?.long || '',
        dropPostalCode: existingData.loadData.dropLocation?.postalCode || '',
        dropCountry: existingData.loadData.dropLocation?.country || '',
        dropState: existingData.loadData.dropLocation?.state || '',
        vehicleType: existingData.loadData.vehicleType || '',
        priceExpected: existingData.loadData.priceExpected || '',
        availableFrom: existingData.loadData.availableFrom
          ? existingData.loadData.availableFrom.slice(0, 16) // for datetime-local
          : ''
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode, existingData]);

  useEffect(() => {
    return () => {
      if (pickupDebounceRef.current) {
        clearTimeout(pickupDebounceRef.current);
      }
      if (dropDebounceRef.current) {
        clearTimeout(dropDebounceRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (user?.role && user.role !== 'vendor') {
      navigate('/loads');
    }
  }, [navigate, user?.role]);

  return (
    <>
      <SEO
        title="Create Load | Speedupora TMS"
        description="Create a new load with source, destination, vehicle and expected price details."
        canonicalUrl="https://www.speedupora.com/loads/create"
        noIndex
      />

      <Box sx={{ display: 'flex' }} className="ps-6">
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <MainCard>
              <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                validationSchema={loadValidationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  const payload = {
                    materialName: values.materialName,
                    quantity: Number(values.quantity),
                    pickupLocation: {
                      city: values.pickupCity,
                      state: values.pickupState,
                      district: values?.pickupDistrict,
                      postalCode: values?.pickupPostalCode,
                      country: values?.pickupCountry,
                      lat: values?.pickupCityLat,
                      long: values?.pickupCityLong
                    },
                    dropLocation: {
                      city: values.dropCity,
                      state: values.dropState,
                      district: values?.dropDistrict,
                      postalCode: values?.dropPostalCode,
                      country: values?.pickupCountry,
                      lat: values?.dropCityLat,
                      long: values?.dropCityLong
                    },
                    vehicleType: values.vehicleType,
                    priceExpected: Number(values.priceExpected),
                    status: 'ACTIVE',
                    availableFrom: new Date(values.availableFrom).toISOString()
                  };

                  try {
                    const loadId = existingData?.loadData?._id;
                    const response =
                      isEditMode && loadId
                        ? await loadServiceInstance.updateLoad(loadId, payload)
                        : await loadServiceInstance.createLoad(payload);
                    if (response) {
                      refetchAllLoadsData?.();
                      if (onClose) {
                        onClose(true);
                      } else {
                        navigate('/loads');
                      }
                    }
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, setFieldValue, touched, values }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="materialName">Material Name *</InputLabel>
                          <TextField
                            id="materialName"
                            name="materialName"
                            value={values.materialName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter material name"
                          />
                          {touched.materialName && errors.materialName && <FormHelperText error>{errors.materialName}</FormHelperText>}
                        </Stack>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="quantity">Quantity *</InputLabel>
                          <TextField
                            id="quantity"
                            name="quantity"
                            type="number"
                            value={values.quantity}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter quantity"
                          />
                          {touched.quantity && errors.quantity && <FormHelperText error>{errors.quantity}</FormHelperText>}
                        </Stack>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25} sx={{ position: 'relative' }}>
                          <InputLabel htmlFor="pickupCity">Pickup City *</InputLabel>

                          <TextField
                            id="pickupCity"
                            name="pickupCity"
                            value={values.pickupCity}
                            disabled={isDisable}
                            onChange={(e) => {
                              handleChange(e);
                              const value = e.target.value;
                              if (pickupDebounceRef.current) {
                                clearTimeout(pickupDebounceRef.current);
                              }
                              pickupDebounceRef.current = setTimeout(() => {
                                if (value.length > 2) {
                                  fetchPlaces(value, 'pickup');
                                } else {
                                  setPickupSuggestions([]);
                                }
                              }, 300);
                            }}
                            onBlur={handleBlur}
                            placeholder="Search pickup city"
                            autoComplete="off"
                          />

                          {pickupSuggestions.length > 0 && (
                            <ul
                              style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                right: 0,
                                background: '#fff',
                                border: '1px solid #ccc',
                                maxHeight: '200px',
                                overflowY: 'auto',
                                zIndex: 9999,
                                borderRadius: '4px',
                                marginTop: '4px',
                                listStyle: 'none',
                                padding: 0
                              }}
                            >
                              {pickupSuggestions.map((place: any, index: number) => (
                                <li
                                  key={place.place_id ?? index}
                                  onMouseDown={(e) => {
                                    e.preventDefault();
                                    const addr = place.address || {};

                                    const city =
                                      addr.city ||
                                      addr.town ||
                                      addr.village ||
                                      addr.municipality ||
                                      addr.county ||
                                      (typeof place.display_name === 'string' ? place.display_name.split(',')[0]?.trim() : '');
                                    const stateName = addr.state || addr.region || '';
                                    setFieldValue('pickupCity', city);
                                    setFieldValue('pickupDistrict', addr?.state_district);
                                    setFieldValue('pickupPostalCode', addr?.postcode);
                                    setFieldValue('pickupState', stateName);
                                    setFieldValue('pickupCountry', addr?.country);
                                    setFieldValue('pickupCityLat', place?.lat);
                                    setFieldValue('pickupCityLong', place?.lon);
                                    setPickupSuggestions([]);
                                  }}
                                  style={{
                                    padding: '10px',
                                    cursor: 'pointer'
                                  }}
                                  onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f5')}
                                  onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}
                                >
                                  {place.display_name}
                                </li>
                              ))}
                            </ul>
                          )}

                          {touched.pickupCity && errors.pickupCity && <FormHelperText error>{errors.pickupCity}</FormHelperText>}
                        </Stack>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="pickupDistrict">Pickup District </InputLabel>
                          <TextField
                            id="pickupDistrict"
                            name="pickupDistrict"
                            value={values.pickupDistrict}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter pickup district"
                          />
                          {touched.pickupDistrict && errors.pickupDistrict && (
                            <FormHelperText error>{errors.pickupDistrict}</FormHelperText>
                          )}
                        </Stack>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="pickupPostalCode">Pickup Postal Code </InputLabel>
                          <TextField
                            id="pickupPostalCode"
                            name="pickupPostalCode"
                            value={values.pickupPostalCode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter pickup district"
                          />
                          {touched.pickupPostalCode && errors.pickupPostalCode && (
                            <FormHelperText error>{errors.pickupPostalCode}</FormHelperText>
                          )}
                        </Stack>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="pickupCountry">Pickup Country </InputLabel>
                          <TextField
                            id="pickupCountry"
                            name="pickupCountry"
                            value={values.pickupCountry}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter pickup district"
                          />
                          {touched.pickupCountry && errors.pickupCountry && <FormHelperText error>{errors.pickupCountry}</FormHelperText>}
                        </Stack>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25} sx={{ position: 'relative' }}>
                          <InputLabel htmlFor="dropCity">Drop City *</InputLabel>

                          <TextField
                            id="dropCity"
                            name="dropCity"
                            value={values.dropCity}
                            disabled={isDisable}
                            onChange={(e) => {
                              handleChange(e);
                              const value = e.target.value;
                              if (dropDebounceRef.current) {
                                clearTimeout(dropDebounceRef.current);
                              }
                              dropDebounceRef.current = setTimeout(() => {
                                if (value.length > 2) {
                                  fetchPlaces(value, 'drop');
                                } else {
                                  setDropSuggestions([]);
                                }
                              }, 300);
                            }}
                            onBlur={handleBlur}
                            placeholder="Search drop city"
                            autoComplete="off"
                          />

                          {dropSuggestions.length > 0 && (
                            <ul
                              style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                right: 0,
                                background: '#fff',
                                border: '1px solid #ccc',
                                maxHeight: '200px',
                                overflowY: 'auto',
                                zIndex: 9999,
                                borderRadius: '4px',
                                marginTop: '4px',
                                listStyle: 'none',
                                padding: 0
                              }}
                            >
                              {dropSuggestions.map((place: any, index: number) => (
                                <li
                                  key={place.place_id ?? index}
                                  onMouseDown={(e) => {
                                    e.preventDefault();
                                    const addr = place.address || {};
                                    const city =
                                      addr.city ||
                                      addr.town ||
                                      addr.village ||
                                      addr.municipality ||
                                      addr.county ||
                                      (typeof place.display_name === 'string' ? place.display_name.split(',')[0]?.trim() : '');
                                    const stateName = addr.state || addr.region || '';
                                    setFieldValue('dropCity', city);
                                    setFieldValue('dropDistrict', addr?.state_district);
                                    setFieldValue('dropCountry', addr?.country);
                                    setFieldValue('dropPostalCode', addr?.postcode);
                                    setFieldValue('dropState', stateName);
                                    setFieldValue('dropCityLat', place?.lat);
                                    setFieldValue('dropCityLong', place?.lon);
                                    setDropSuggestions([]);
                                  }}
                                  style={{
                                    padding: '10px',
                                    cursor: 'pointer'
                                  }}
                                  onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f5')}
                                  onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}
                                >
                                  {place.display_name}
                                </li>
                              ))}
                            </ul>
                          )}

                          {touched.dropCity && errors.dropCity && <FormHelperText error>{errors.dropCity}</FormHelperText>}
                        </Stack>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="pickupState">Pickup State *</InputLabel>
                          <TextField
                            id="pickupState"
                            name="pickupState"
                            value={values.pickupState}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter pickup state"
                          />
                          {touched.pickupState && errors.pickupState && <FormHelperText error>{errors.pickupState}</FormHelperText>}
                        </Stack>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="dropDistrict">Drop District</InputLabel>
                          <TextField
                            id="dropDistrict"
                            name="dropDistrict"
                            value={values.dropDistrict}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter drop district"
                          />
                          {touched.dropDistrict && errors.dropDistrict && <FormHelperText error>{errors.dropDistrict}</FormHelperText>}
                        </Stack>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="dropPostalCode">Drop Postal Code</InputLabel>
                          <TextField
                            id="dropPostalCode"
                            name="dropPostalCode"
                            value={values.dropPostalCode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter drop district"
                          />
                          {touched.dropPostalCode && errors.dropPostalCode && (
                            <FormHelperText error>{errors.dropPostalCode}</FormHelperText>
                          )}
                        </Stack>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="dropState">Drop State *</InputLabel>
                          <TextField
                            id="dropState"
                            name="dropState"
                            value={values.dropState}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter drop state"
                          />
                          {touched.dropState && errors.dropState && <FormHelperText error>{errors.dropState}</FormHelperText>}
                        </Stack>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="dropCountry">Drop Country</InputLabel>
                          <TextField
                            id="dropCountry"
                            name="dropCountry"
                            value={values.dropCountry}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter drop country"
                          />
                          {touched.dropCountry && errors.dropCountry && <FormHelperText error>{errors.dropCountry}</FormHelperText>}
                        </Stack>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="vehicleType">Vehicle Type *</InputLabel>
                          <TextField
                            select
                            id="vehicleType"
                            name="vehicleType"
                            value={values.vehicleType}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Select vehicle type"
                          >
                            {vehicleTypes.map((vehicle) => (
                              <MenuItem value={vehicle} key={vehicle}>
                                {vehicle}
                              </MenuItem>
                            ))}
                          </TextField>
                          {touched.vehicleType && errors.vehicleType && <FormHelperText error>{errors.vehicleType}</FormHelperText>}
                        </Stack>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="priceExpected">Price Expected *</InputLabel>
                          <TextField
                            id="priceExpected"
                            name="priceExpected"
                            type="number"
                            value={values.priceExpected}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter expected price"
                          />
                          {touched.priceExpected && errors.priceExpected && <FormHelperText error>{errors.priceExpected}</FormHelperText>}
                        </Stack>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="availableFrom">Available From *</InputLabel>
                          <TextField
                            id="availableFrom"
                            name="availableFrom"
                            type="datetime-local"
                            value={values.availableFrom}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            InputLabelProps={{ shrink: true }}
                          />
                          {touched.availableFrom && errors.availableFrom && <FormHelperText error>{errors.availableFrom}</FormHelperText>}
                        </Stack>
                      </Grid>

                      <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                          <Button variant="outlined" color="secondary" type="button" onClick={() => navigate('/loads')}>
                            Cancel
                          </Button>
                          <Button type="submit" variant="outlined" disabled={isSubmitting || isDisable}>
                            {isEditMode ? 'Update Load' : 'Create Load'}
                          </Button>
                        </Stack>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </MainCard>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CreateLoad;
