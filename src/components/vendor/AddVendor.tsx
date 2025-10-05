import { Button, FormHelperText, TextField } from '@mui/material';
import { Box, Grid, InputLabel, Stack } from '@mui/material';
import UploadImage from 'components/shared/UploadImage';
import { Formik } from 'formik';
import useAuth from 'hooks/useAuth';
import { vendorValidationSchema } from 'pages/validation/validation';
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
  isDisable,
  refetchVendors
}: {
  onClose: (refetchData?: boolean) => void;
  isEditMode: Boolean;
  existingData: any;
  isDisable?: boolean;
  refetchVendors?: () => void;
}) => {
  const inputRef = useInputRef();
  const [image, setImage] = useState<{ public_id: string; url: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useAuth();
  const [initialValues, setInitialValues] = useState({
    first_name: '',
    last_name: '',
    mobileNumber: '',
    email: '',
    vendorSecondaryPhoneNumber: '',
    business: '',
    address: '',
    isDeleted: '',
    pinCode: '',
    city: '',
    state: '',
    country: 'INDIA',
    password: '',
    role: 'vendor',
    transportId: user._id,
    avatar: { public_id: '', url: '' }
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
        validationSchema={vendorValidationSchema}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          setSubmitting(true);
          let response;
          if (image) {
            values.avatar.public_id = image?.public_id;
            values.avatar.url = image.url;
          }
          if (isEditMode) {
            response = await VendorServiceInstance.createVendor(values);
          } else {
            response = await VendorServiceInstance.createVendor(values);
          }
          if (response) {
            onClose(true);
            setSubmitting(false);
            refetchVendors && refetchVendors();
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, setFieldValue, touched, values }) => (
          <form onSubmit={handleSubmit}>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="vendor-first-name">
                      Vendor First Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="vendor-first-name"
                      value={values.first_name}
                      name="first_name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Vendor First Name"
                      autoFocus
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
                    {touched.first_name && errors.first_name && (
                      <FormHelperText error id="vendor-first-name-helper">
                        {errors.first_name}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="vendor-last-name">
                      Vendor Last Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="vendor-last-name"
                      value={values.last_name}
                      name="last_name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Vendor Last Name"
                      autoFocus
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
                    {touched.last_name && errors.last_name && (
                      <FormHelperText error id="vendor-name-helper">
                        {errors.last_name}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="vendor-email">Email</InputLabel>
                    <TextField
                      fullWidth
                      id="vendor-email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Vendor email"
                      autoFocus
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
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
                      value={values.mobileNumber}
                      name="mobileNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Vendor Phone Number"
                      autoFocus
                      inputRef={inputRef}
                      disabled={isDisable}
                      inputProps={{ maxLength: 10 }}
                    />
                    {touched.mobileNumber && errors.mobileNumber && (
                      <FormHelperText error id="vendor-phone-number-helper">
                        {errors.mobileNumber}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="vendor-second-phone-number">Vendor Second Phone Number</InputLabel>
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
                      inputProps={{ maxLength: 10 }}
                    />
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
                      value={values.address}
                      name="address"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Vendor Address"
                      autoFocus
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
                    {touched.address && errors.address && (
                      <FormHelperText error id="vendor-address-helper">
                        {errors.address}
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
                      value={values.business}
                      name="business"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="vendor-business"
                      placeholder="Mobile Number"
                      disabled={isDisable}
                    />
                    {touched.business && errors.business && (
                      <FormHelperText error id="vendor-business-helper">
                        {errors.business}
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
                      inputProps={{ maxLength: 6 }}
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

                <Grid item xs={12} sm={6} display={isDisable ? 'none' : 'block'}>
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
                <Grid item xs={12} sm={6} display={isDisable ? 'none' : 'block'}>
                  <UploadImage setImage={setImage} setIsUploading={setIsUploading} />
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
                        <UploadImage setImage={setImage} setIsUploading={setIsUploading} />
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
