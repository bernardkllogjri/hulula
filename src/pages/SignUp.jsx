import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Alert } from 'react-bootstrap';
import client from '../client'
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import 'react-phone-number-input/style.css'
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form'
import { isValidPhoneNumber } from 'react-phone-number-input'

const schema = yup.object({
  firstName: yup.string().required('First name is required').matches(/^[A-Za-z]+$/i, 'Only alphanumeric values'),
  lastName: yup.string().required('Last name is required').matches(/^[A-Za-z]+$/i, 'Only alphanumeric values'),
  email: yup.string().required('Email is required').email(),
  username: yup.string().required('Username is required').min(4).matches(/^(?=[a-zA-Z0-9.]{4,20}$)(?!.*[.]{2})[^.].*[^.]$/, 'Username not valid'),
  phone: yup.string().required(),
  password: yup.string().required('Password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Minimum eight characters, at least one letter and one number'),
  repeatPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  TOS: yup.bool().isTrue('Terms of service must be agreed to continue')
}).required();

const SignUp = () => {
  const [form, setForm] = useState({})
  const navigate = useNavigate()
  const { register, setError, clearErrors ,handleSubmit, getValues, watch, formState: { errors }, control } = useForm({ resolver: yupResolver(schema)});
  const phone = watch('phone')

  useEffect(() => {
    if(!phone) {
      clearErrors('phone')
      return
    }
    if (!isValidPhoneNumber(phone)) {
      setError('phone', {
        type: 'pattern',
        message: 'Not a valid phone number'
      })
    } else {
      clearErrors('phone')
    }
  }, [phone])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('APP_USER'))
    if(user?.user?.id) {
      navigate('/')
    }
  }, [])

  const onSubmit = async (formData) => {
    setForm({ ...formData, isLoading: true })
    try { 
      const user = await client.post('/signup', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        username: formData.username,
        phoneNumber: formData.phone,
        password: formData.password,
        repeatPassword: formData.repeatPassword
      })
      const { data } = user || {}
      if(!data?.data) {
        setForm({
          ...formData,
          isLoading: false,
          error: data.message,
          errors: undefined
        })
      } else {
        setForm({
          ...formData,
          isLoading: false,
          error: undefined,
          errors: undefined
        })
        localStorage.setItem('APP_USER', JSON.stringify(user.data.data))
        navigate('/edit-profile')
      }
    } catch (e) {
      setForm({
        ...formData,
        isLoading: false,
        error: e.response.data.message,
        errors: e.response.data.error.details
      })
    }
  }

  return (
      <div>
          <Header />
          <section className="tf-login tf-section">
              <div className="themesflat-container">
                  <div className="row">
                      <div className="col-12">
                          <h2 className="tf-title-heading ct style-1">
                              Sign up To Hulula
                          </h2>

                          <div className="flat-form box-login-social">
                              <div className="box-title-login">
                                  <h5>Sign up with social</h5>
                              </div>
                              <ul>
                                  <li>
                                      <Link to="#" className="sc-button style-2 fl-button pri-3">
                                          <i className="icon-fl-google-2"></i>
                                          <span>Google</span>
                                      </Link>
                                  </li>
                                  <li>
                                      <Link to="#" className="sc-button style-2 fl-button pri-3">
                                          <i className="icon-fl-facebook"></i>
                                          <span>Facebook</span>
                                      </Link>
                                  </li>
                              </ul>
                          </div>

                          <div className="flat-form box-login-email">
                              <div className="box-title-login">
                                  <h5>Or Sign up with email</h5>
                              </div>
                              {((form.errors || form.error) &&
                                <Alert variant='danger' style={{ fontSize: '15px' }}>
                                  {form.error}
                                  {(form.errors.length && 
                                    <ul>
                                      {form.errors.map(error => {
                                        return <li>{error.message}</li>
                                      })}
                                    </ul>
                                  )}
                                </Alert>
                              )}
                              <div className="form-inner">
                                {form.isLoading ? <div>Loading...</div> : (
                                  <form action="#" onSubmit={handleSubmit(onSubmit)} id="contactform">
                                    <input placeholder="Your First Name" type='text' {...register("firstName")} />
                                    {errors?.firstName && <p className='text-danger' style={{ fontSize: '12px', marginBottom: '5px' }}>{errors?.firstName?.message}</p>}
                                    <input placeholder="Your Last Name" type='text' {...register("lastName")} />
                                    {errors?.lastName && <p className='text-danger' style={{ fontSize: '12px', marginBottom: '5px' }}>{errors?.lastName?.message}</p>}
                                    <input placeholder="Your Email Name" type='email' {...register("email")}/>
                                    {errors?.email && <p className='text-danger' style={{ fontSize: '12px', marginBottom: '5px' }}>{errors?.email?.message}</p>}
                                    <PhoneInputWithCountry
                                      name='phone'
                                      defaultCountry='CH'
                                      countries={['IT', 'CH']}
                                      placeholder="Enter phone number"
                                      control={control}
                                    />
                                    {errors?.phone && <p className='text-danger' style={{ fontSize: '12px', marginBottom: '5px' }}>{errors?.phone?.message}</p>}
                                    <input placeholder="Your Username" type='text' {...register("username")} />
                                    {errors?.username && <p className='text-danger' style={{ fontSize: '12px', marginBottom: '5px' }}>{errors?.username?.message}</p>}
                                    <input placeholder="Set Your Password" type='password' {...register("password")}/>
                                    {errors?.password && <p className='text-danger' style={{ fontSize: '12px', marginBottom: '5px' }}>{errors?.password?.message}</p>}
                                    <input placeholder="Repeat Your Password" type='password' {...register("repeatPassword")}/>
                                    {errors?.repeatPassword && <p className='text-danger' style={{ fontSize: '12px', marginBottom: '5px' }}>{errors?.repeatPassword?.message}</p>}
                                    <div className="row-form style-1">
                                      <label>Remember me
                                        <input type="checkbox" />
                                        <span className="btn-checkbox"></span>
                                      </label>
                                      <Link to="#" className="forgot-pass">Forgot Password ?</Link>
                                    </div>
                                    <div className="row-form style-1">
                                      <label>I accept terms and conditions
                                        <input type="checkbox" {...register("TOS")} />
                                        <span className="btn-checkbox"></span>
                                        {errors?.TOS && <p className='text-danger' style={{ fontSize: '12px', marginBottom: '5px' }}>{errors?.TOS?.message}</p>}
                                      </label>
                                    </div>
                                    <button className="submit">Sign up</button>
                                  </form>
                                )}
                              </div>

                          </div>

                      </div>
                  </div>
              </div>
          </section>
          <Footer />
      </div>
  );
}

export default SignUp;
