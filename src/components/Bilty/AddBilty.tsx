// import { DatePicker } from '@mui/lab';
import { Autocomplete, Button, FormHelperText, TextField } from '@mui/material';
import { Box, Grid, InputLabel, Stack } from '@mui/material';
import { Formik } from 'formik';
import { RefObject, useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import moment from 'moment';
import biltyServiceInstance from 'services/bilty.services';
import { biltiesValidationSchema } from 'pages/validation/validation';

function useInputRef() {
  return useOutletContext<RefObject<HTMLInputElement>>();
}

const nominatimSuggestionListSx = {
  position: 'absolute' as const,
  top: '100%',
  left: 0,
  right: 0,
  background: '#fff',
  border: '1px solid #ccc',
  maxHeight: '200px',
  overflowY: 'auto' as const,
  zIndex: 9999,
  borderRadius: '4px',
  marginTop: '4px',
  listStyle: 'none',
  padding: 0
};

const fetchPlaces = async (value: string, setSuggestions: (rows: any[]) => void) => {
  const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(value)}&format=json&addressdetails=1`, {
    headers: {
      'User-Agent': 'SpeeduporaTMS/1.0'
    }
  });
  const data = await res.json();
  setSuggestions(Array.isArray(data) ? data : []);
};

const applyPlaceToFrom = (place: any, setFieldValue: (f: string, v: any) => void, setSuggestions: (rows: any[]) => void) => {
  const addr = place.address || {};
  const city =
    addr.city ||
    addr.town ||
    addr.village ||
    addr.municipality ||
    addr.county ||
    (typeof place.display_name === 'string' ? place.display_name.split(',')[0]?.trim() : '');
  const stateName = addr.state || addr.region || '';
  const district = addr.state_district || addr.county || '';
  setFieldValue('fromCity', city);
  setFieldValue('fromDistrict', district);
  setFieldValue('fromPinCode', addr.postcode || '');
  setFieldValue('fromState', stateName);
  setFieldValue('fromCountry', addr.country || '');
  setFieldValue('fromLat', place?.lat || '');
  setFieldValue('fromLong', place?.lon || '');
  setSuggestions([]);
};

const applyPlaceToTo = (place: any, setFieldValue: (f: string, v: any) => void, setSuggestions: (rows: any[]) => void) => {
  const addr = place.address || {};
  const city =
    addr.city ||
    addr.town ||
    addr.village ||
    addr.municipality ||
    addr.county ||
    (typeof place.display_name === 'string' ? place.display_name.split(',')[0]?.trim() : '');
  const stateName = addr.state || addr.region || '';
  const district = addr.state_district || addr.county || '';
  setFieldValue('toCity', city);
  setFieldValue('toDistrict', district);
  setFieldValue('toPinCode', addr.postcode || '');
  setFieldValue('toState', stateName);
  setFieldValue('toCountry', addr.country || '');
  setFieldValue('toLat', place?.lat || '');
  setFieldValue('toLong', place?.lon || '');
  setSuggestions([]);
};

const AddBilty = ({
  onClose,
  isEditMode,
  existingData,
  isDisable,
  data,
  refetchBilties
}: {
  onClose: (refetchData?: boolean) => void;
  isEditMode: Boolean;
  existingData: any;
  isDisable?: boolean;
  data?: any;
  refetchBilties?: () => void;
}) => {
  const inputRef = useInputRef();
  const [fromSuggestions, setFromSuggestions] = useState<any[]>([]);
  const [toSuggestions, setToSuggestions] = useState<any[]>([]);
  const fromDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [initialValues, setInitialValues] = useState({
    transporterNumber: '',
    truckNumber: '',
    driverName: '',
    fromCity: '',
    fromDistrict: '',
    fromState: '',
    fromPinCode: '',
    fromCountry: '',
    fromLat: '',
    fromLong: '',
    toCity: '',
    toDistrict: '',
    toState: '',
    toPinCode: '',
    toCountry: '',
    toLat: '',
    toLong: '',
    brokingCharge: '',
    driverPhoneNumber: '',
    senderNumber: '',
    senderName: '',
    senderAddress: '',
    receiverName: '',
    receiverAddress: '',
    receiverNumber: '',
    goodsCategory: '',
    weight: '',
    truckCharge: '',
    advancePayment: '',
    remainingPayment: '',
    paymentType: '',
    date: moment()
  });

  const payment_type = ['cash', 'upi', 'banktransfer', 'netbanking'];

  // Pre-fill form when editing
  useEffect(() => {
    if (isEditMode && existingData) {
      const d = existingData.transporterData || {};
      setInitialValues((prev) => ({
        ...prev,
        ...d,
        fromCity: d.fromCity ?? '',
        fromDistrict: d.fromDistrict ?? '',
        fromState: d.fromState ?? '',
        fromPinCode: d.fromPinCode ?? '',
        fromCountry: d.fromCountry ?? '',
        fromLat: d.fromLat ?? '',
        fromLong: d.fromLong ?? '',
        toCity: d.toCity ?? '',
        toDistrict: d.toDistrict ?? '',
        toState: d.toState ?? '',
        toPinCode: d.toPinCode ?? '',
        toCountry: d.toCountry ?? '',
        toLat: d.toLat ?? '',
        toLong: d.toLong ?? ''
      }));
    }
    // eslint-disable-next-line
  }, [isEditMode, existingData]);

  useEffect(() => {
    return () => {
      if (fromDebounceRef.current) clearTimeout(fromDebounceRef.current);
      if (toDebounceRef.current) clearTimeout(toDebounceRef.current);
    };
  }, []);
  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={biltiesValidationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const from = [values.fromCity, values.fromDistrict, values.fromState].filter(Boolean).join(', ') || (values as any).from || '';
          const to = [values.toCity, values.toDistrict, values.toState].filter(Boolean).join(', ') || (values as any).to || '';
          const payload = {
            ...values,
            from,
            to,
            date: moment.isMoment(values.date) ? values.date.toISOString() : values.date
          };
          try {
            const response = await biltyServiceInstance.createBilty(payload);
            if (response) {
              onClose(true);
              refetchBilties && refetchBilties();
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, setFieldValue, touched, values }) => (
          <form onSubmit={handleSubmit}>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="date">
                      Date <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DatePicker
                        value={moment(values.date)}
                        disabled={isDisable}
                        format="DD-MM-YYYY"
                        onChange={(newValue: any) => {
                          setFieldValue('date', newValue || moment());
                        }}
                      />
                    </LocalizationProvider>
                    {touched.date && errors.date && (
                      <FormHelperText error component="p" id="driver-name-helper">
                        {typeof errors.date === 'string' ? errors.date : 'Invalid date'}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="driver-phone-number">
                      Driver Number <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="driver-phone-number"
                      value={values.driverPhoneNumber}
                      name="driverPhoneNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Driver Number"
                      autoFocus
                      inputRef={inputRef}
                      disabled={isDisable}
                      inputProps={{ maxLength: 10 }}
                    />
                    {touched.driverPhoneNumber && errors.driverPhoneNumber && (
                      <FormHelperText error id="transporter-email-helper">
                        {errors.driverPhoneNumber}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="driver-name">
                      Driver Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="driver-name"
                      value={values.driverName}
                      name="driverName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Driver Name"
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
                    {touched.driverName && errors.driverName && (
                      <FormHelperText error id="driver-name-helper">
                        {errors.driverName}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="truck-number">
                      Truck Number <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="truck-number"
                      value={values.truckNumber}
                      name="truckNumber"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        const upperValue = e.target.value.toUpperCase();
                        setFieldValue('truckNumber', upperValue);
                      }}
                      placeholder="Truck Number"
                      inputRef={inputRef}
                      disabled={isDisable}
                      inputProps={{ maxLength: 15 }}
                    />
                    {touched.truckNumber && errors.truckNumber && (
                      <FormHelperText error id="truck-number-helper">
                        {errors.truckNumber}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25} sx={{ position: 'relative' }}>
                    <InputLabel htmlFor="fromCity">
                      From pincode / place <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="fromCity"
                      name="fromCity"
                      value={values.fromCity}
                      disabled={isDisable}
                      onChange={(e) => {
                        handleChange(e);
                        const value = e.target.value;
                        if (fromDebounceRef.current) clearTimeout(fromDebounceRef.current);
                        fromDebounceRef.current = setTimeout(() => {
                          if (value.length > 2) {
                            fetchPlaces(value, setFromSuggestions);
                          } else {
                            setFromSuggestions([]);
                          }
                        }, 300);
                      }}
                      onBlur={handleBlur}
                      placeholder="Search pincode or place (from)"
                      autoComplete="off"
                    />
                    {fromSuggestions.length > 0 && (
                      <ul style={nominatimSuggestionListSx}>
                        {fromSuggestions.map((place: any, index: number) => (
                          <li
                            key={place.place_id ?? index}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              applyPlaceToFrom(place, setFieldValue, setFromSuggestions);
                            }}
                            style={{ padding: '10px', cursor: 'pointer' }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f5')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}
                          >
                            {place.display_name}
                          </li>
                        ))}
                      </ul>
                    )}
                    {touched.fromCity && errors.fromCity && (
                      <FormHelperText error id="from-city-helper">
                        {errors.fromCity}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25} sx={{ position: 'relative' }}>
                    <InputLabel htmlFor="toCity">
                      To pincode / place <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="toCity"
                      name="toCity"
                      value={values.toCity}
                      disabled={isDisable}
                      onChange={(e) => {
                        handleChange(e);
                        const value = e.target.value;
                        if (toDebounceRef.current) clearTimeout(toDebounceRef.current);
                        toDebounceRef.current = setTimeout(() => {
                          if (value.length > 2) {
                            fetchPlaces(value, setToSuggestions);
                          } else {
                            setToSuggestions([]);
                          }
                        }, 300);
                      }}
                      onBlur={handleBlur}
                      placeholder="Search pincode or place (to)"
                      autoComplete="off"
                    />
                    {toSuggestions.length > 0 && (
                      <ul style={nominatimSuggestionListSx}>
                        {toSuggestions.map((place: any, index: number) => (
                          <li
                            key={place.place_id ?? index}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              applyPlaceToTo(place, setFieldValue, setToSuggestions);
                            }}
                            style={{ padding: '10px', cursor: 'pointer' }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f5')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}
                          >
                            {place.display_name}
                          </li>
                        ))}
                      </ul>
                    )}
                    {touched.toCity && errors.toCity && (
                      <FormHelperText error id="to-city-helper">
                        {errors.toCity}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="fromPinCode">From pincode</InputLabel>
                    <TextField
                      fullWidth
                      id="fromPinCode"
                      name="fromPinCode"
                      value={values.fromPinCode}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Pincode"
                      disabled={isDisable}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="toPinCode">To pincode</InputLabel>
                    <TextField
                      fullWidth
                      id="toPinCode"
                      name="toPinCode"
                      value={values.toPinCode}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Pincode"
                      disabled={isDisable}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="fromDistrict">From district</InputLabel>
                    <TextField
                      fullWidth
                      id="fromDistrict"
                      name="fromDistrict"
                      value={values.fromDistrict}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="District"
                      disabled={isDisable}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="toDistrict">To district</InputLabel>
                    <TextField
                      fullWidth
                      id="toDistrict"
                      name="toDistrict"
                      value={values.toDistrict}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="District"
                      disabled={isDisable}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="fromState">
                      From state <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="fromState"
                      name="fromState"
                      value={values.fromState}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="State"
                      disabled={isDisable}
                    />
                    {touched.fromState && errors.fromState && (
                      <FormHelperText error id="from-state-helper">
                        {errors.fromState}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="toState">
                      To state <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="toState"
                      name="toState"
                      value={values.toState}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="State"
                      disabled={isDisable}
                    />
                    {touched.toState && errors.toState && (
                      <FormHelperText error id="to-state-helper">
                        {errors.toState}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="sender-name">
                      Sender Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="sender-namer"
                      value={values.senderName}
                      name="senderName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Sender Name"
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
                    {touched.senderName && errors.senderName && (
                      <FormHelperText error id="sender-name-helper">
                        {errors.senderName}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="sender-number">
                      Sender Number <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="sender-number"
                      value={values.senderNumber}
                      name="senderNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Sender Number"
                      inputRef={inputRef}
                      disabled={isDisable}
                      inputProps={{ maxLength: 10 }}
                    />
                    {touched.senderNumber && errors.senderNumber && (
                      <FormHelperText error id="sender-number-helper">
                        {errors.senderNumber}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="receiver-name">
                      Receiver Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="receiver-name"
                      value={values.receiverName}
                      name="receiverName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Receiver Name"
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
                    {touched.receiverName && errors.receiverName && (
                      <FormHelperText error id="receiver-name-helper">
                        {errors.receiverName}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="receiver-number">
                      Receiver Number <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="receiver-number"
                      value={values.receiverNumber}
                      name="receiverNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Receiver Number"
                      inputRef={inputRef}
                      disabled={isDisable}
                      inputProps={{ maxLength: 10 }}
                    />
                    {touched.receiverNumber && errors.receiverNumber && (
                      <FormHelperText error id="receiver-number-helper">
                        {errors.receiverNumber}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="transporter-number">
                      Transporter Number <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="transporter-number"
                      value={values.transporterNumber}
                      name="transporterNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Transporter Number"
                      inputRef={inputRef}
                      disabled={isDisable}
                      inputProps={{ maxLength: 10 }}
                    />
                    {touched.transporterNumber && errors.transporterNumber && (
                      <FormHelperText error id="transporter-number-helper">
                        {errors.transporterNumber}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="goods-category">
                      Goods Category <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="goods-category"
                      value={values.goodsCategory}
                      name="goodsCategory"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Goods category"
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
                    {touched.goodsCategory && errors.goodsCategory && (
                      <FormHelperText error id="goods-category-helper">
                        {errors.goodsCategory}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="weight">
                      Weight (in ton) <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="weight"
                      value={values.weight}
                      name="weight"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter Weight"
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
                    {touched.weight && errors.weight && (
                      <FormHelperText error id="weight-helper">
                        {errors.weight}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="truck-charge">
                      Truck Charges <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="truck-charge"
                      value={values.truckCharge}
                      name="truckCharge"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter amount (e.g., 45000)"
                      inputRef={inputRef}
                      disabled={isDisable}
                      inputProps={{ maxLength: 8 }}
                    />
                    {touched.truckCharge && errors.truckCharge && (
                      <FormHelperText error id="weight-helper">
                        {errors.truckCharge}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="advance-payment">
                      Advance Payment <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="advance-payment"
                      value={values.advancePayment}
                      name="advancePayment"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter advance amount"
                      inputRef={inputRef}
                      disabled={isDisable}
                      inputProps={{ maxLength: 8 }}
                    />
                    {touched.advancePayment && errors.advancePayment && (
                      <FormHelperText error id="advance-payment-helper">
                        {errors.advancePayment}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="remaining-payment">
                      Remaining Amount <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="remaining-payment"
                      value={values.remainingPayment}
                      name="remainingPayment"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter remaining amount"
                      inputRef={inputRef}
                      disabled={isDisable}
                      inputProps={{ maxLength: 8 }}
                    />
                    {touched.remainingPayment && errors.remainingPayment && (
                      <FormHelperText error id="remaining-payment-helper">
                        {errors.remainingPayment}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="payment-type">
                      Payment Type <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1.25}>
                        <Autocomplete
                          options={payment_type}
                          disabled={isDisable}
                          value={values.paymentType || ''}
                          renderInput={(params) => <TextField {...params} label="Payment Type" />}
                          onChange={(event, value) => {
                            setFieldValue('paymentType', value || 'cash');
                          }}
                        ></Autocomplete>
                      </Stack>
                    </Grid>
                    {touched.paymentType && errors.paymentType && (
                      <FormHelperText error id="remaining-payment-helper">
                        {errors.paymentType}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="broking-charge">
                      Broking Charge (Commission) <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="broking-charge"
                      value={values.brokingCharge}
                      name="brokingCharge"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter Commision amount"
                      inputRef={inputRef}
                      disabled={isDisable}
                      inputProps={{ maxLength: 8 }}
                    />
                    {touched.brokingCharge && errors.brokingCharge && (
                      <FormHelperText error id="broking-charge-helper">
                        {errors.brokingCharge}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                {isDisable ? (
                  ''
                ) : (
                  <Grid item xs={12}>
                    <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                      <Button
                        variant="outlined"
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        color="secondary"
                        onClick={() => onClose()}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" variant="outlined">
                        Save
                      </Button>
                    </Stack>
                  </Grid>
                )}
              </Grid>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AddBilty;
