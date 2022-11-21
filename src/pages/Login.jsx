import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import client from '../client'
import { Alert } from 'react-bootstrap';

const Login = () => {
  const [form, setForm] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('APP_USER'))
    if(user?.user?.id) {
      navigate('/')
    }
  }, [])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setForm({ ...form, isLoading: true })
    try { 
      const result = await client.post('/signin', {
        email: form.email,
        password: form.password
      })
      const { data } = result || {}
      if(!data?.data) {
        setForm({
          ...form,
          isLoading: false,
          error: data.message,
          errors: undefined
        })
      } else {
        setForm({
          ...form,
          isLoading: false,
          error: undefined,
          errors: undefined
        })
        localStorage.setItem('APP_USER', JSON.stringify(result.data.data))
        navigate('/')
      }
    } catch (e) {
      setForm({
        ...form,
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
                              Login
                          </h2>

                          <div className="flat-form box-login-social">
                              <div className="box-title-login">
                                  <h5>Login with social</h5>
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
                                  <h5>Or login with email</h5>
                              </div>
                              {((form.errors || form.error) &&
                                <Alert variant='danger' style={{ fontSize: '15px' }}>
                                  {form.error}
                                  {(form?.errors?.length && 
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
                                <form onSubmit={onSubmit} action="#" id="contactform">
                                    <input id="email" name="email" tabIndex="1" aria-required="true" type="email" placeholder="Your Email" onChange={handleChange} required />
                                    <input id="password" name="password" tabIndex="2"  aria-required="true" type="password" placeholder="Your Password" onChange={handleChange} required />
                                    <div className="row-form style-1">
                                        <label>Remember me
                                            <input type="checkbox" />
                                            <span className="btn-checkbox"></span>
                                        </label>
                                        <Link to="#" className="forgot-pass">Forgot Password ?</Link>
                                    </div>

                                    <button className="submit">Login</button>
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

export default Login;
