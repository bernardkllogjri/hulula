import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import client from '../client'
import { useState } from 'react';
import { Alert } from 'react-bootstrap';

const SignUp = () => {
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
      const user = await client.post('/signup', {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        repeatPassword: form.repeatPassword,
      })
      const { data } = user || {}
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
        localStorage.setItem('APP_USER', JSON.stringify(user.data.data))
        navigate('/edit-profile')
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
          <section className="flat-title-page inner">
              <div className="overlay"></div>
              <div className="themesflat-container">
                  <div className="row">
                      <div className="col-md-12">
                          <div className="page-title-heading mg-bt-12">
                              <h1 className="heading text-center">Sign up</h1>
                          </div>
                          <div className="breadcrumbs style2">
                              <ul>
                                  <li><Link to="/">Home</Link></li>
                                  <li><Link to="#">Pages</Link></li>
                                  <li>Sign up</li>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>                    
          </section>
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
                                  <form action="#" onSubmit={onSubmit} id="contactform">
                                    <input id="firstName" name="firstName" tabIndex="1" aria-required="true" required type="text" placeholder="Your First Name" value={form.firstName} onChange={handleChange} />
                                    <input id="lastName" name="lastName" tabIndex="1" aria-required="true" required type="text" placeholder="Your Last Name" value={form.lastName} onChange={handleChange} />
                                    <input id="email" name="email" tabIndex="2"  aria-required="true" type="email"  placeholder="Your Email Address" required value={form.email} onChange={handleChange} />
                                    <input id="password" name="password" tabIndex="3"  aria-required="true" type="password" placeholder="Set Your Password" required value={form.password} onChange={handleChange} />
                                    <input id="repeatPassword" name="repeatPassword" tabIndex="3"  aria-required="true" type="password" placeholder="Repeat Your Password" required value={form.repeatPassword} onChange={handleChange} />
                                    <div className="row-form style-1">
                                      <label>Remember me
                                        <input type="checkbox" />
                                        <span className="btn-checkbox"></span>
                                      </label>
                                      <Link to="#" className="forgot-pass">Forgot Password ?</Link>
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
