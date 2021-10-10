import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

export const profileValidationSchema = yup.object().shape({
  firstName: yup.string().required('First Name is Required'),
  lastName: yup.string().required('Last Name is Required'),
  phoneNumber: yup
    .string()
    .matches(/(\d){9}\b/, 'Invalid Phone Number')
    .required('Phone Number is Required'),
  address: yup.string().required('Address is Required'),
});

export const farmerValidationSchema = yup.object().shape({
  firstName: yup.string().required('First Name is Required'),
  lastName: yup.string().required('Last Name is Required'),
  phoneNumber: yup
    .string()
    .matches(/(\d){9}\b/, 'Invalid Phone Number')
    .required('Phone Number is Required'),
  dob: yup.string().required('DOB is Required'),
  address: yup.string().required('Address is Required'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

export const plotValidationSchema = yup.object().shape({
  plotSize: yup
    .string()
    .matches(/(\d)\b/, 'Invalid Plot Size')
    .required('Plot Size is Required'),
  cropType: yup.string().required('Crop Type is required'),
  cropName: yup.string().required('Crop Name is Required'),
  plantedDate: yup.date().required('Planted Date is required'),
  harvestDate: yup
    .date()
    .min(yup.ref('plantedDate'), "Harvest date can't be before Planted date")
    .required('Harvest Date is required'),
  plotAddress: yup.string().required('Plot Address is required'),
});

export const incidentValidationSchema = yup.object().shape({
  affectedArea: yup.string().required('Affected Area is Required'),
  description: yup.string().required('Description is required'),
  date: yup.date().required('Date is required'),
});
