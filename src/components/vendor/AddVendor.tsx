import { Button, FormHelperText, TextField } from '@mui/material';
import { Box, Grid, InputLabel, Stack } from '@mui/material';
import { Formik } from 'formik';
import { RefObject, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import VendorServiceInstance from 'services/vendor.services';

function useInputRef() {
  return useOutletContext<RefObject<HTMLInputElement>>();
}

const AddVendor = ({
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
  const [initialValues, setInitialValues] = useState({
    vendorName: '',
    vendorPhoneNumber: '',
    vendorEmail: '',
    vendorSecondaryPhoneNumber: '',
    vendorBussiness: '',
    vendorAddress: '',
    isDeleted: '',
    pinCode: '',
    city: '',
    state: '',
    country: 'INDIA',
    password: '',
    role: 'vendor',
    avatar: { public_id: '', url: 'https://avatar.iran.liara.run/public/boy' }
  });

  // Pre-fill form when editing
  useEffect(() => {
    if (isEditMode && existingData) {
      setInitialValues({
        ...initialValues,
        ...existingData.vendorData
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode, existingData]);
  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          setSubmitting(true);
          let response;
          if (isEditMode) {
            response = await VendorServiceInstance.createVendor(values);
          } else {
            response = await VendorServiceInstance.createVendor(values);
          }
          if (response) {
            onClose(true);
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
                    <InputLabel htmlFor="vendor-name">
                      Vendor Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="vendor-name"
                      value={values.vendorName}
                      name="vendorName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Vendor Name"
                      autoFocus
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
                    {touched.vendorName && errors.vendorName && (
                      <FormHelperText error id="vendor-name-helper">
                        {errors.vendorName}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="vendor-email">
                      Email <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="vendor-email"
                      value={values.vendorEmail}
                      name="vendorEmail"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Vendor email"
                      autoFocus
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
                    {touched.vendorEmail && errors.vendorEmail && (
                      <FormHelperText error id="transporter-email-helper">
                        {errors.vendorEmail}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="vendor-phone-number">
                      Vendor Phone Number <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="vendor-phone-number"
                      value={values.vendorPhoneNumber}
                      name="vendorPhoneNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Vendor Phone Number"
                      autoFocus
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
                    {touched.vendorPhoneNumber && errors.vendorPhoneNumber && (
                      <FormHelperText error id="vendor-phone-number-helper">
                        {errors.vendorPhoneNumber}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="vendor-second-phone-number">
                      Vendor Second Phone Number <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="vendor-second-phone-number"
                      value={values.vendorSecondaryPhoneNumber}
                      name="vendorSecondaryPhoneNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Vendor Phone Number 2"
                      autoFocus
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
                    {touched.vendorSecondaryPhoneNumber && errors.vendorSecondaryPhoneNumber && (
                      <FormHelperText error id="vendor-second-phone-number-helper">
                        {errors.vendorSecondaryPhoneNumber}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="vendor-address">
                      Vendor Address <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="vendor-addresss"
                      value={values.vendorAddress}
                      name="vendorAddress"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Vendor Address"
                      autoFocus
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
                    {touched.vendorAddress && errors.vendorAddress && (
                      <FormHelperText error id="vendor-address-helper">
                        {errors.vendorAddress}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="vendor-business">
                      Vendor Business <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      type="text"
                      fullWidth
                      value={values.vendorBussiness}
                      name="vendorBussiness"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="vendor-business"
                      placeholder="Mobile Number"
                      disabled={isDisable}
                    />
                    {touched.vendorBussiness && errors.vendorBussiness && (
                      <FormHelperText error id="vendor-business-helper">
                        {errors.vendorBussiness}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="pin-code">
                      Pin Code <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      type="text"
                      fullWidth
                      value={values.pinCode}
                      name="pinCode"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="pin-code"
                      placeholder="Enter Pin Code"
                      disabled={isDisable}
                    />
                    {touched.pinCode && errors.pinCode && (
                      <FormHelperText error id="pin-code-helper">
                        {errors.pinCode}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="city">
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
                      placeholder="Enter city "
                      disabled={isDisable}
                    />
                    {touched.city && errors.city && (
                      <FormHelperText error id="city-helper">
                        {errors.city}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="state">
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
                    {touched.state && errors.state && (
                      <FormHelperText error id="state-helper">
                        {errors.state}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="country">
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
                    {touched.country && errors.country && (
                      <FormHelperText error id="country-helper">
                        {errors.country}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="password">
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
                    {touched.password && errors.password && (
                      <FormHelperText error id="password-helper">
                        {errors.password}
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

export default AddVendor;
