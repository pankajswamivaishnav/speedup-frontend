import { Button, FormHelperText, TextField } from '@mui/material';
import { Box, Grid, InputLabel, Stack } from '@mui/material';
import UploadImage from 'components/shared/UploadImage';
import { Formik } from 'formik';
import { RefObject, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import TransporterServiceInstance from 'services/transporter.services';
import { transporterValidationSchema } from 'pages/validation/validation';

function useInputRef() {
  return useOutletContext<RefObject<HTMLInputElement>>();
}

const AddTransporter = ({
  onClose,
  isEditMode,
  existingData,
  isDisable
}: {
  onClose: (refetchData?: boolean) => void;
  isEditMode: Boolean;
  existingData: any;
  isDisable?: boolean;
}) => {
  const inputRef = useInputRef();
  const [image, setImage] = useState<{ public_id: string; url: string } | null>(null);
  const [initialValues, setInitialValues] = useState({
    transportName: '',
    transporter_first_name: '',
    transporter_last_name: '',
    mobileNumber: '',
    officeNumber: '',
    registrationNumber: '',
    gstNumber: '',
    transportAddress: '',
    faithLine: '',
    panCardNumber: '',
    pinCode: '',
    city: '',
    state: '',
    country: 'INDIA',
    email: '',
    password: '',
    role: 'transporter',
    avatar: { public_id: '', url: '' }
  });

  // Pre-fill form when editing
  useEffect(() => {
    if (isEditMode && existingData) {
      setInitialValues({
        ...initialValues,
        ...existingData.transporterData
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode, existingData]);
  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={transporterValidationSchema}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          setSubmitting(true);
          if (image) {
            values.avatar.public_id = image?.public_id;
            values.avatar.url = image.url;
          }
          let response;
          if (isEditMode) {
            response = await await TransporterServiceInstance.createTransporter(values);
          } else {
            response = await TransporterServiceInstance.createTransporter(values);
          }
          if (response) {
            onClose(true);
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, setFieldValue, touched, values, submitCount }) => (
          <form onSubmit={handleSubmit}>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="transporter-name">
                      Transport Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="transporter-name"
                      value={values.transportName}
                      name="transportName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Transport Name"
                      autoFocus
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
                    {(touched.transportName || submitCount > 0) && errors.transportName && (
                      <FormHelperText error id="transporter-name-helper">
                        {errors.transportName}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="transporter-name">
                      Email <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="transporter-email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Transport email"
                      autoFocus
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
                    {(touched.email || submitCount > 0) && errors.email && (
                      <FormHelperText error id="transporter-email-helper">
                        {errors.email}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="transporter-first-name">
                      First Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="transporter-first-name"
                      value={values.transporter_first_name}
                      name="transporter_first_name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="First Name"
                      autoFocus
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
                    {(touched.transporter_first_name || submitCount > 0) && errors.transporter_first_name && (
                      <FormHelperText error id="transporter-first-name-helper">
                        {errors.transporter_first_name}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="transporter-last-name">
                      Last Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="transporter-first-name"
                      value={values.transporter_last_name}
                      name="transporter_last_name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Last Name"
                      autoFocus
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
                    {(touched.transporter_last_name || submitCount > 0) && errors.transporter_last_name && (
                      <FormHelperText error id="transporter-last-name-helper">
                        {errors.transporter_last_name}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="transporter-mobile-number">
                      Mobile Number <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      type="text"
                      fullWidth
                      value={values.mobileNumber}
                      name="mobileNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="transporter-mobile-number"
                      placeholder="Mobile Number"
                      disabled={isDisable}
                      inputProps={{ maxLength: 10 }}
                    />
                    {(touched.mobileNumber || submitCount > 0) && errors.mobileNumber && (
                      <FormHelperText error id="transporter-mobile-number-helper">
                        {errors.mobileNumber}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="transporter-office-number">Office Number</InputLabel>
                    <TextField
                      type="text"
                      fullWidth
                      value={values.officeNumber}
                      name="officeNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="transporter-mobile-number"
                      placeholder="Mobile Number"
                      disabled={isDisable}
                      inputProps={{ maxLength: 10 }}
                    />
                    {(touched.officeNumber || submitCount > 0) && errors.officeNumber && (
                      <FormHelperText error id="transporter-office-number-helper">
                        {errors.officeNumber}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="transporter-registration-number">
                      Transport Registration Number <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="transporter-regsitration-number"
                      value={values.registrationNumber}
                      name="registrationNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter Registration Number"
                      disabled={isDisable}
                    />
                    {(touched.registrationNumber || submitCount > 0) && errors.registrationNumber && (
                      <FormHelperText error id="transporter-registration-number-helper">
                        {errors.registrationNumber}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="transporter-gst-number">GST Number</InputLabel>
                    <TextField
                      fullWidth
                      id="transporter-gst-number"
                      value={values.gstNumber}
                      name="gstNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter GST Number"
                      disabled={isDisable}
                      inputProps={{ maxLength: 15 }}
                    />
                    {(touched.gstNumber || submitCount > 0) && errors.gstNumber && (
                      <FormHelperText error id="transporter-gst-number">
                        {errors.gstNumber}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="transporter-address">
                      Transport Address <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="transporter-address"
                      value={values.transportAddress}
                      name="transportAddress"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Address"
                      disabled={isDisable}
                      inputProps={{ maxLength: 10 }}
                    />
                    {(touched.transportAddress || submitCount > 0) && errors.transportAddress && (
                      <FormHelperText error id="transporter-address-helper">
                        {errors.transportAddress}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="transporter-faithline">Faith Line</InputLabel>
                    <TextField
                      fullWidth
                      id="transporter-faithline"
                      value={values.faithLine}
                      name="faithLine"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Last Name"
                      disabled={isDisable}
                    />
                    {(touched.faithLine || submitCount > 0) && errors.faithLine && (
                      <FormHelperText error id="transporter-faithline-helper">
                        {errors.faithLine}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-pan-number">
                      PAN Number <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      type="text"
                      fullWidth
                      value={values.panCardNumber}
                      name="panCardNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="panCardNumber"
                      placeholder="Pan Card Number"
                      disabled={isDisable}
                    />
                    {(touched.panCardNumber || submitCount > 0) && errors.panCardNumber && (
                      <FormHelperText error id="personal-pan-number-helper">
                        {errors.panCardNumber}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-pin-code">
                      Pin Code <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      type="text"
                      fullWidth
                      value={values.pinCode}
                      name="pinCode"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="pinCode"
                      placeholder="Enter Pin Code"
                      disabled={isDisable}
                    />
                    {(touched.pinCode || submitCount > 0) && errors.pinCode && (
                      <FormHelperText error id="personal-pin-code-helper">
                        {errors.pinCode}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="transporter-city">
                      City <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      type="text"
                      fullWidth
                      value={values.city}
                      name="city"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="city"
                      placeholder="Enter city"
                      disabled={isDisable}
                    />
                    {(touched.city || submitCount > 0) && errors.city && (
                      <FormHelperText error id="transporter-city-helper">
                        {errors.city}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="transporter-city">
                      State <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      type="text"
                      fullWidth
                      value={values.state}
                      name="state"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="state"
                      placeholder="Enter state"
                      disabled={isDisable}
                    />
                    {(touched.state || submitCount > 0) && errors.state && (
                      <FormHelperText error id="transporter-city-helper">
                        {errors.state}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="transporter-country">
                      Country <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      type="text"
                      fullWidth
                      value={values.country}
                      name="country"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="country"
                      placeholder="Enter Country"
                      disabled={isDisable}
                    />
                    {(touched.country || submitCount > 0) && errors.country && (
                      <FormHelperText error id="transporter-country-helper">
                        {errors.country}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="transporter-password">
                      Password <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      type="text"
                      fullWidth
                      value={values.password}
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="password"
                      placeholder="Enter Password"
                      disabled={isDisable}
                    />
                    {(touched.password || submitCount > 0) && errors.password && (
                      <FormHelperText error id="transporter-password-helper">
                        {errors.password}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <UploadImage setImage={setImage} />
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

export default AddTransporter;
