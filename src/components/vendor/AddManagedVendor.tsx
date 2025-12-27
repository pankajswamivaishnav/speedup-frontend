import { Button, FormHelperText, TextField } from '@mui/material';
import { Box, Grid, InputLabel, Stack } from '@mui/material';
import UploadImage from 'components/shared/UploadImage';
import { Formik } from 'formik';
import { RefObject, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import VendorServiceInstance from 'services/vendor.services';
import { managedVendorValidationSchema } from 'pages/validation/validation';
import useAuth from 'hooks/useAuth';

function useInputRef() {
  return useOutletContext<RefObject<HTMLInputElement>>();
}

const AddManagedVendor = ({
  onClose,
  isEditMode,
  existingData,
  isDisable,
  refetchManagedVendorAllData
}: {
  onClose: (refetchData?: boolean) => void;
  isEditMode: Boolean;
  existingData: any;
  isDisable?: boolean;
  refetchManagedVendorAllData?: () => void;
}) => {
  const inputRef = useInputRef();
  const { user } = useAuth();
  const [image, setImage] = useState<{ public_id: string; url: string } | null>(
    existingData?.managedVendorData?.avatar || null
  );
  const [isUploading, setIsUploading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    first_name: '',
    last_name: '',
    mobileNumber: '',
    email: 'vendor@yopmail.com',
    secondaryMobileNumber: '',
    business: '',
    address: 'INDIA',
    avatar: { public_id: '', url: '' },
    creator: {
      userId: user._id,
      role: user.role === 'transporter' ? 'Transporter' : user.role === 'driver' ? 'Driver' : 'Vendors'
    }
  });

  // Pre-fill form when editing
  useEffect(() => {
    if (isEditMode && existingData && existingData.managedVendorData) {
      setInitialValues({
        first_name: existingData.managedVendorData.first_name || '',
        last_name: existingData.managedVendorData.last_name || '',
        mobileNumber: existingData.managedVendorData.mobileNumber || '',
        email: existingData.managedVendorData.email || 'vendor@yopmail.com',
        secondaryMobileNumber: existingData.managedVendorData.secondaryMobileNumber || '',
        business: existingData.managedVendorData.business || '',
        address: existingData.managedVendorData.address || 'INDIA',
        avatar: existingData.managedVendorData.avatar || { public_id: '', url: '' },
        creator: existingData.managedVendorData.creator || {
          userId: user._id,
          role: user.role === 'transporter' ? 'Transporter' : user.role === 'driver' ? 'Driver' : 'Vendors'
        }
      });
      if (existingData.managedVendorData.avatar) {
        setImage(existingData.managedVendorData.avatar);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode, existingData]);

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={managedVendorValidationSchema}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          setSubmitting(true);
          if (image) {
            values.avatar.public_id = image?.public_id;
            values.avatar.url = image.url;
          }
          let response;
          if (isEditMode) {
            response = await VendorServiceInstance.updateManagedVendor(existingData.managedVendorData._id, values);
          } else {
            response = await VendorServiceInstance.createManagedVendor(values);
          }
          if (response) {
            onClose(true);
            refetchManagedVendorAllData && refetchManagedVendorAllData();
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, submitCount }) => (
          <form onSubmit={handleSubmit}>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="managed-vendor-first-name">
                      First Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="managed-vendor-first-name"
                      value={values.first_name}
                      name="first_name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="First Name"
                      autoFocus
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
                    {(touched.first_name || submitCount > 0) && errors.first_name && (
                      <FormHelperText error id="managed-vendor-first-name-helper">
                        {errors.first_name}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="managed-vendor-last-name">
                      Last Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="managed-vendor-last-name"
                      value={values.last_name}
                      name="last_name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Last Name"
                      autoFocus
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
                    {(touched.last_name || submitCount > 0) && errors.last_name && (
                      <FormHelperText error id="managed-vendor-last-name-helper">
                        {errors.last_name}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="managed-vendor-mobile-number">
                      Mobile Number <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      type="number"
                      fullWidth
                      value={values.mobileNumber}
                      name="mobileNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="managed-vendor-mobile-number"
                      placeholder="Mobile Number"
                      disabled={isDisable}
                      inputProps={{ maxLength: 10 }}
                    />
                    {(touched.mobileNumber || submitCount > 0) && errors.mobileNumber && (
                      <FormHelperText error id="managed-vendor-mobile-number-helper">
                        {errors.mobileNumber}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="managed-vendor-email">Email</InputLabel>
                    <TextField
                      fullWidth
                      id="managed-vendor-email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Email"
                      disabled={isDisable}
                    />
                    {(touched.email || submitCount > 0) && errors.email && (
                      <FormHelperText error id="managed-vendor-email-helper">
                        {errors.email}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="managed-vendor-secondary-mobile">Secondary Mobile Number</InputLabel>
                    <TextField
                      type="number"
                      fullWidth
                      value={values.secondaryMobileNumber}
                      name="secondaryMobileNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="managed-vendor-secondary-mobile"
                      placeholder="Secondary Mobile Number"
                      disabled={isDisable}
                      inputProps={{ maxLength: 10 }}
                    />
                    {(touched.secondaryMobileNumber || submitCount > 0) && errors.secondaryMobileNumber && (
                      <FormHelperText error id="managed-vendor-secondary-mobile-helper">
                        {errors.secondaryMobileNumber}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="managed-vendor-business">
                      Business <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="managed-vendor-business"
                      value={values.business}
                      name="business"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Business"
                      disabled={isDisable}
                    />
                    {(touched.business || submitCount > 0) && errors.business && (
                      <FormHelperText error id="managed-vendor-business-helper">
                        {errors.business}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="managed-vendor-address">
                      Address <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="managed-vendor-address"
                      value={values.address}
                      name="address"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Address"
                      disabled={isDisable}
                      multiline
                      rows={3}
                    />
                    {(touched.address || submitCount > 0) && errors.address && (
                      <FormHelperText error id="managed-vendor-address-helper">
                        {errors.address}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} display={isDisable ? 'none' : 'block'}>
                  <UploadImage image={initialValues.avatar} setImage={setImage} setIsUploading={setIsUploading} />
                </Grid>
                {isDisable ? (
                  ''
                ) : (
                  <Grid item xs={12}>
                    <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                      <Button variant="outlined" type="button" color="secondary" onClick={() => onClose()}>
                        Cancel
                      </Button>
                      <Button type="submit" variant="outlined" disabled={isUploading || isSubmitting}>
                        {isUploading ? 'Uploading...' : isSubmitting ? 'Saving...' : isEditMode ? 'Update' : 'Save'}
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

export default AddManagedVendor;

