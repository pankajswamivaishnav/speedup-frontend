import { Button, FormHelperText, TextField } from '@mui/material';
import { Box, Grid, InputLabel, Stack } from '@mui/material';
import UploadImage from 'components/shared/UploadImage';
import { Formik } from 'formik';
import { RefObject, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import TransporterServiceInstance from 'services/transporter.services';

function useInputRef() {
  return useOutletContext<RefObject<HTMLInputElement>>();
}

const AddTransportCard = ({
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
    first_name: '',
    last_name: '',
    mobileNumber: '',
    officeNumber: '',
    address: '',
    city: '',
    email: '',
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
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, setFieldValue, touched, values }) => (
          <form onSubmit={handleSubmit}>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="transport-name">
                      Transport Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="transport-name"
                      value={values.transportName}
                      name="transportName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Transport Name"
                      autoFocus
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
                    {touched.transportName && errors.transportName && (
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
                    {touched.email && errors.email && (
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
                      value={values.first_name}
                      name="first_name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="First Name"
                      autoFocus
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
                    {touched.first_name && errors.first_name && (
                      <FormHelperText error id="transporter-first-name-helper">
                        {errors.first_name}
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
                      value={values.last_name}
                      name="last_name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Last Name"
                      autoFocus
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
                    {touched.last_name && errors.last_name && (
                      <FormHelperText error id="transporter-last-name-helper">
                        {errors.last_name}
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
                    />
                    {touched.mobileNumber && errors.mobileNumber && (
                      <FormHelperText error id="transporter-mobile-number-helper">
                        {errors.mobileNumber}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="transporter-office-number">
                      Office Number <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
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
                    />
                    {touched.officeNumber && errors.officeNumber && (
                      <FormHelperText error id="transporter-office-number-helper">
                        {errors.officeNumber}
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
                      value={values.address}
                      name="address"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Address"
                      disabled={isDisable}
                    />
                    {touched.address && errors.address && (
                      <FormHelperText error id="transporter-address-helper">
                        {errors.address}
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
                    {touched.city && errors.city && (
                      <FormHelperText error id="transporter-city-helper">
                        {errors.city}
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

export default AddTransportCard;
