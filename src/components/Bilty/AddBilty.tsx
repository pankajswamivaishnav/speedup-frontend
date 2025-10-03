// import { DatePicker } from '@mui/lab';
import { Autocomplete, Button, FormHelperText, TextField } from '@mui/material';
import { Box, Grid, InputLabel, Stack } from '@mui/material';
import { Formik } from 'formik';
import { RefObject, useEffect, useState } from 'react';
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
  const [initialValues, setInitialValues] = useState({
    transporterNumber: '',
    truckNumber: '',
    driverName: '',
    from: '',
    to: '',
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
      setInitialValues({
        ...initialValues,
        ...existingData.transporterData
      });
    }
    // eslint-disable-next-line
  }, [isEditMode, existingData]);
  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={biltiesValidationSchema}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting, setFieldValue }) => {
          setSubmitting(true);
          let response;
          if (isEditMode) {
            response = await biltyServiceInstance.createBilty(values);
          } else {
            response = await biltyServiceInstance.createBilty(values);
          }
          if (response) {
            onClose(true);
            setSubmitting(false);
            refetchBilties && refetchBilties();
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
                      autoFocus
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
                      onChange={handleChange}
                      placeholder="Truck Number"
                      autoFocus
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
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="from">
                      From <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="from"
                      value={values.from}
                      name="from"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter starting point (From)"
                      autoFocus
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
                    {touched.from && errors.from && (
                      <FormHelperText error id="from-helper">
                        {errors.from}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="to">
                      To <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="to"
                      value={values.to}
                      name="to"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter destination (To)"
                      autoFocus
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
                    {touched.to && errors.to && (
                      <FormHelperText error id="to-helper">
                        {errors.to}
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
                      autoFocus
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
                      autoFocus
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
                      autoFocus
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
                      autoFocus
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
                      autoFocus
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
                      placeholder="Transporter Number"
                      autoFocus
                      inputRef={inputRef}
                      disabled={isDisable}
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
                      autoFocus
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
                      autoFocus
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
                      autoFocus
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
                      autoFocus
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
                      autoFocus
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
                      <Button variant="outlined" color="secondary">
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
