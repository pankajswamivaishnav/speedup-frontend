import { Button, FormHelperText, TextField } from '@mui/material';
import { Box, Grid, InputLabel, Stack } from '@mui/material';
import UploadImage from 'components/shared/UploadImage';
import { Formik } from 'formik';
import { RefObject, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import DriverServiceInstance from 'services/driver.services';

function useInputRef() {
  return useOutletContext<RefObject<HTMLInputElement>>();
}

const AddDriverCard = ({
  onClose,
  isEditMode,
  existingData,
  isDisable,
  data
}: {
  onClose: (refetchData?: boolean) => void;
  isEditMode: Boolean;
  existingData: any;
  isDisable?: boolean;
  data?: any;
}) => {
  const inputRef = useInputRef();
  const [image, setImage] = useState<{ public_id: string; url: string } | null>(null);

  const [initialValues, setInitialValues] = useState({
    first_name: '',
    last_name: '',
    mobileNumber: '',
    truckNumber: '',
    address: '',
    licenseNumber: '',
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
    // eslint-disable-next-line
  }, [isEditMode, existingData]);
  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          setSubmitting(true);
          if (image) {
            values.avatar.public_id = image?.public_id;
            values.avatar.url = image.url;
          }
          let response;
          if (isEditMode) {
            response = await DriverServiceInstance.createDriver(values);
          } else {
            response = await DriverServiceInstance.createDriver(values);
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
                    <InputLabel htmlFor="driver-first-name">
                      Driver First Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="driver-first-name"
                      value={values.first_name}
                      name="first_name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Driver First Name"
                      autoFocus
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
                    {touched.first_name && errors.first_name && (
                      <FormHelperText error id="driver-first-name-helper">
                        {errors.first_name}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="driver-last-name">
                      Driver Last Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="driver-last-name"
                      value={values.last_name}
                      name="first_name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Driver Last Name"
                      autoFocus
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
                    {touched.last_name && errors.last_name && (
                      <FormHelperText error id="driver-last-name-helper">
                        {errors.last_name}
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
                      value={values.mobileNumber}
                      name="mobileNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Driver Number"
                      autoFocus
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
                    {touched.mobileNumber && errors.mobileNumber && (
                      <FormHelperText error id="transporter-email-helper">
                        {errors.mobileNumber}
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
                    <InputLabel htmlFor="address">
                      Address <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="address"
                      value={values.address}
                      name="address"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Address"
                      autoFocus
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
                    {touched.address && errors.address && (
                      <FormHelperText error id="transporter-first-name-helper">
                        {errors.address}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="license-number">
                      License Number <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="license-number"
                      value={values.licenseNumber}
                      name="licenseNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="License Number"
                      autoFocus
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
                    {touched.licenseNumber && errors.licenseNumber && (
                      <FormHelperText error id="transporter-last-name-helper">
                        {errors.licenseNumber}
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

export default AddDriverCard;
