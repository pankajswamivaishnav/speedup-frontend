import * as Yup from 'yup';

export const transporterValidationSchema = Yup.object({
  transportName: Yup.string().required('Transport name is required'),
  transporter_first_name: Yup.string().required('First name is required'),
  transporter_last_name: Yup.string().required('Last name is required'),
  email: Yup.string().email('Must be a valid email').required('Email is required'),
  mobileNumber: Yup.string()
    .matches(/^\d{10}$/, 'Mobile number must be 10 digits')
    .required('Mobile number is required'),
  registrationNumber: Yup.string().required('Registration number is required'),
  transportAddress: Yup.string().required('Address is required'),
  panCardNumber: Yup.string().required('PAN number is required'),
  pinCode: Yup.string().required('Pin code is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  country: Yup.string().required('Country is required'),
  password: Yup.string().required('Password is required')
});

export const driverValidationSchema = Yup.object({
  first_name: Yup.string().required('Driver first name is required'),
  last_name: Yup.string().required('Driver last name is required'),
  mobileNumber: Yup.number().required('Driver mobile number is required'),
  truckNumber: Yup.string().required('Truck number is required'),
  address: Yup.string().required('Adress is required'),
  licenseNumber: Yup.string().required('License number is required'),
  transportId: Yup.string().required('Choose transport')
});

export const driverCardValidationSchema = Yup.object({
  first_name: Yup.string().required('Driver first name is required'),
  last_name: Yup.string().required('Driver last name is required'),
  mobileNumber: Yup.number().required('Driver mobile number is required'),
  truckNumber: Yup.string().required('Truck number is required')
});

export const vendorValidationSchema = Yup.object({
  first_name: Yup.string().required('Vendor first name is required'),
  last_name: Yup.string().required('Vendor last name is required'),
  mobileNumber: Yup.number().required('Vendor mobile number is required'),
  address: Yup.string().required('Address is required'),
  business: Yup.string().required('Business name is required'),
  pinCode: Yup.string().required('Pin code is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required')
});

export const vendorValidationCardSchema = Yup.object({
  first_name: Yup.string().required('Vendor first name is required'),
  last_name: Yup.string().required('Vendor last name is required'),
  mobileNumber: Yup.number().required('Vendor mobile number is required'),
  address: Yup.string().required('Address is required'),
  business: Yup.string().required('Business name is required'),
  city: Yup.string().required('City is required')
});
