import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Select from 'react-select';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SelectStyle from '../helper/SelectStyle';
import clsx from 'clsx';
import Placeholder from '../../../assets/images/photo_placeholder.jpg';
const Categories = [
  {
    label: 'Commercial',
    value: 1,
  },
  {
    label: 'Apartment',
    value: 2,
  },
];
const agents = [
  {
    label: 'Mr. X',
    value: 1,
  },
  {
    label: 'Mr Y',
    value: 2,
  },
];

const initialValues = {
  first_name: '',
  last_name: '',
  username: '',
  rating: '',
  hourly_rate: '',
  address: '',
  insurance: '',
  image: '',
  expert_type_id: [],
};

// Validation/////
const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .required('First Name is required')
    .min(3, 'First must be greater than 3 character')
    .max(50, 'First must be less than 50 character'),
  last_name: Yup.string()
    .required('First Name is required')
    .min(3, 'Last must be greater than 3 character')
    .max(50, 'Last must be less than 50 character'),
  username: Yup.string()
    .required('User Name is required')
    .min(3, 'Username must be greater than 3 character')
    .max(50, 'Username must be less than 50 character'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  passwordConfirmation: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required')
    .oneOf([Yup.ref('Password'), null], 'Passwords must match'),
  emailaddress: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Please Enter numeric value only')
    .required('Phone is required')
    .test('phone', 'phone must be between 1 to 11', value => {
      if (value >= 1 && value <= 11) {
        return true;
      } else {
        return false;
      }
    }),
  image: Yup.mixed()
    .required('Image is required')
    .test(
      'fileSize',
      'Unsupported File Size ! only  2 Mb image is required',
      value => {
        console.log(value);
        return value && value.size <= 2000000;
      },
    )
    .test(
      'fileType',
      'Unsupported File Format ! only png , jpg and jpeg required',
      value => {
        console.log(value);
        return (
          value && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type)
        );
      },
    ),
  address: Yup.string().required('Address is required'),
  insurance: Yup.string().required('Insurance is required'),
  package_date: Yup.string().required('Joining Date is required'),
});
// Validation/////
const AddAgent = () => {
  const [propertyData, setPropertyData] = useState();
  useEffect(() => {
    setPropertyData();
  }, []);
  //Add  Expert start
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
  });
  //Add  Expert end

  const fileChangeHandler = e => {
    if (e.target.files.length >= 0) {
      const file = e.target.files[0];
      formik.setFieldValue('image', file);
    }
  };
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="my_dashboard_review">
            <div className="row">
              <div className="col-lg-12 col-xl-12 mb10">
                <div className="breadcrumb_content style2 mb30-991">
                  <h2 className="breadcrumb_title">Add User</h2>
                  {/* <p>We are glad to see you again!</p> */}
                </div>
              </div>
              <div className="col-lg-12">
                <div className="wrap-custom-file">
                  <input
                    type="file"
                    id="image"
                    onBlur={formik.handleBlur}
                    onChange={fileChangeHandler}
                    accept=".gif, .jpg, .png"
                    className={clsx(
                      'form-control form-control-lg form-control-solid',
                      {
                        'is-invalid':
                          formik.touched.image && formik.errors.image,
                      },
                      {
                        'is-valid':
                          formik.touched.image && !formik.errors.image,
                      },
                    )}
                  />

                  {formik.touched.image && formik.errors.image && (
                    <div className="fv-plugins-message-container mt-2">
                      <div className="fv-help-block">
                        <span role="alert" className="error text-danger">
                          {formik.errors.image}
                        </span>
                      </div>
                    </div>
                  )}
                  <label
                    for="image1"
                    style={{
                      backgroundImage: `url(${Placeholder})`,
                      backgroundSize: 'contain',
                    }}>
                    <span>
                      <i className="flaticon-download"></i> Upload Photo{' '}
                    </span>
                  </label>
                </div>
                <p>*minimum 260px x 260px</p>
              </div>
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyTitle">First Name</label>
                  <input
                    placeholder="Enter First Name"
                    type="text"
                    autoComplete="off"
                    id="first_name"
                    {...formik.getFieldProps('first_name')}
                    className={clsx(
                      'form-control form-control-lg form-control-solid',
                      {
                        'is-invalid':
                          formik.touched.first_name && formik.errors.first_name,
                      },
                      {
                        'is-valid':
                          formik.touched.first_name &&
                          !formik.errors.first_name,
                      },
                    )}
                  />
                  {formik.touched.first_name && formik.errors.first_name && (
                    <div className="fv-plugins-message-container mt-2">
                      <div className="fv-help-block">
                        <span role="alert" className="error text-danger">
                          {formik.errors.first_name}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyTitle">Last Name</label>
                  <input
                    placeholder="Enter Last Name"
                    type="text"
                    autoComplete="off"
                    id="last_name"
                    {...formik.getFieldProps('last_name')}
                    className={clsx(
                      'form-control form-control-lg form-control-solid',
                      {
                        'is-invalid':
                          formik.touched.last_name && formik.errors.last_name,
                      },
                      {
                        'is-valid':
                          formik.touched.last_name && !formik.errors.last_name,
                      },
                    )}
                  />
                  {formik.touched.last_name && formik.errors.last_name && (
                    <div className="fv-plugins-message-container mt-2">
                      <div className="fv-help-block">
                        <span role="alert" className="error text-danger">
                          {formik.errors.last_name}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyTitle">Username</label>
                  <input
                    placeholder="Enter Username"
                    type="text"
                    autoComplete="off"
                    id="username"
                    {...formik.getFieldProps('username')}
                    className={clsx(
                      'form-control form-control-lg form-control-solid',
                      {
                        'is-invalid':
                          formik.touched.username && formik.errors.username,
                      },
                      {
                        'is-valid':
                          formik.touched.username && !formik.errors.username,
                      },
                    )}
                  />
                  {formik.touched.username && formik.errors.username && (
                    <div className="fv-plugins-message-container mt-2">
                      <div className="fv-help-block">
                        <span role="alert" className="error text-danger">
                          {formik.errors.username}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyTitle">Password</label>
                  <input
                    type="password"
                    className="form-control form-control-lg form-control-solid "
                    id="password"
                    {...formik.getFieldProps('password')}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        <span role="alert" className="error text-danger">
                          {formik.errors.password}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyTitle">Retype password</label>
                  <input
                    type="password"
                    className="form-control form-control-lg form-control-solid "
                    id="confirmpassword"
                    {...formik.getFieldProps('passwordConfirmation')}
                  />
                  {formik.touched.passwordConfirmation &&
                    formik.errors.passwordConfirmation && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert" className="error text-danger">
                            {formik.errors.passwordConfirmation}
                          </span>
                        </div>
                      </div>
                    )}
                </div>
              </div>

              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyTitle">Email</label>
                  <input
                    type="email"
                    className="form-control form-control-lg form-control-solid"
                    id="emailaddress"
                    placeholder="Email Address"
                    {...formik.getFieldProps('emailaddress')}
                  />
                  {formik.touched.emailaddress && formik.errors.emailaddress && (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        <span role="alert" className="error text-danger">
                          {formik.errors.emailaddress}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyTitle">Phone Number</label>
                  <input
                    type="text"
                    className="form-control form-control-lg form-control-solid"
                    id="phone"
                    placeholder="Enter Phone number"
                    {...formik.getFieldProps('phone')}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        <span role="alert" className="error text-danger">
                          {formik.errors.phone}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyTitle">Facebook link</label>
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    placeholder="Enter Facebook link"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyTitle">Youtube link</label>
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    placeholder="Enter Youtube link"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyTitle">Googleplus link</label>
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    placeholder="Enter Googleplus link"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyTitle">Twitter link</label>
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    placeholder="Enter Twitter link"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyTitle">Linkedin link</label>
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    placeholder="Enter Linkedin link"
                  />
                </div>
              </div>
              <div className="col-lg-6"></div>
              <div className="col-lg-4 col-xl-4">
                <div className="my_profile_setting_input ui_kit_select_search form-group">
                  <label>Type</label>
                  <Select styles={SelectStyle} options={Categories} />
                </div>
              </div>
              <div className="col-lg-4 col-xl-4">
                <div className="my_profile_setting_input ui_kit_select_search form-group">
                  <label>Package</label>
                  <Select styles={SelectStyle} options={Categories} />
                </div>
              </div>
              <div className="col-lg-4 col-xl-4">
                <div className="my_profile_setting_input ui_kit_select_search form-group">
                  <label>Package expire date</label>
                  <input
                    type="date"
                    autoComplete="off"
                    placeholder="Enter Package Date"
                    {...formik.getFieldProps('package_date')}
                    className={clsx(
                      'form-control form-control-lg form-control-solid',
                      {
                        'is-invalid':
                          formik.touched.package_date &&
                          formik.errors.package_date,
                      },
                      {
                        'is-valid':
                          formik.touched.package_date &&
                          !formik.errors.package_date,
                      },
                    )}
                  />
                  {formik.touched.package_date && formik.errors.package_date && (
                    <div className="fv-plugins-message-container mt-2 mb-5">
                      <div className="fv-help-block">
                        <span role="alert" className="error">
                          {formik.errors.package_date}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-12">
                <div className="my_profile_setting_textarea">
                  <label for="propertyDescription">Address</label>
                  <textarea
                    className="form-control"
                    id="propertyDescription"
                    rows="7"></textarea>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="my_profile_setting_textarea">
                  <label for="propertyDescription">Description</label>
                  {/* <textarea
                    className="form-control"
                    id="propertyDescription"
                    rows="7"></textarea> */}
                  {/* <SlateEditor /> */}
                </div>
              </div>
            </div>
          </div>
          <div className="my_dashboard_review mt30">
            <div className="row">
              <div className="col-xl-12">
                <div className="my_profile_setting_input">
                  <button className="btn btn1 float-left">Back</button>
                  <button className="btn btn2 float-right">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    </>
  );
};

export default AddAgent;
