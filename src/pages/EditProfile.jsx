import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import avt from '../assets/images/avatar/avata_profile.jpg'
import client from '../client'
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  nationality: yup.string().required('Nationality is required'),
  age: yup.number().required('Age is required').min(18).max(99),
  height: yup.number().required('Height is required'),
  description: yup.string().required('Description is required')
}).required();

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

const EditProfile = () => {
  const [form, setForm] = useState({})
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    setTimeout(() => {
      const user = JSON.parse(localStorage.getItem('APP_USER'))
      if(user?.user?.id) {
        setForm({
          ...form,
          userId: user?.user?.id
        })
      } else {
        navigate('/login')
      }
    }, 1000)
  }, [])

  const deleteKey = (key) => (e) => {
    setForm({
      ...form,
      [key]: undefined
    })
  }

  const onFileChange = async (e) => {
    const image = await toBase64(e.target.files[0])
    setForm({
      ...form,
      [e.target.name]: image
    })
  }

  const onMultiFileChange = async (e) => {
    Array.from(e.target.files).forEach(async file => {
      const image = await toBase64(file)
      await client.post('/gallery', { userId: form.userId, image })
      setForm({
        ...form,
        [e.target.name]: [...(form[e.target.name] || []), image]
      })
    })
  }

  const onSubmit = async (formData) => {
    setForm({ ...formData, isLoading: true })
    try {
      const result = await client.put('/profile', {
        userId: form.userId,
        nationality: formData.nationality,
        age: formData.age,
        height: formData.height,
        image: formData.image,
        description: formData.description
      })
      setForm({
        ...formData,
        isLoading: false,
        error: undefined,
        errors: undefined
      })
      navigate('/')
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
          <section className="flat-title-page inner">
              <div className="overlay"></div>
              <div className="themesflat-container">
                  <div className="row">
                      <div className="col-md-12">
                          <div className="page-title-heading mg-bt-12">
                              <h1 className="heading text-center">Edit Profile</h1>
                          </div>
                          <div className="breadcrumbs style2">
                              <ul>
                                  <li><Link to="/">Home</Link></li>
                                  <li><Link to="#">Pages</Link></li>
                                  <li>Edit Profile</li>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>                    
          </section>
          <div className="tf-create-item tf-section">
              <div className="themesflat-container">
                  <div className="row">
                        <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                          <div className="sc-card-profile text-center">
                              <div className="card-media">
                                  <img id="profileimg" src={form.image || avt} alt="Hulula" />                         
                              </div>
                              <div style={{ fontSize: '14px', marginTop: '10px', fontWeight: 'bold' }}>Please upload an image that's 1mb or less</div>
                              <div id="upload-profile">
                                  <Link to="#" className="btn-upload">Upload New Photo </Link>
                                  <input id="tf-upload-img" type="file" name="image" required="" onChange={onFileChange} />
                              </div>
                              <Link to="#" className="btn-upload style2" onClick={deleteKey('image')}>Delete</Link>
                          </div>
                        </div>
                        <div className="col-xl-9 col-lg-8 col-md-12 col-12">
                            <div className="form-upload-profile">
                              <h4 className="title-create-item" styles={{ fontWeight: 'bold' }}>Choose your Cover image</h4>
                              <div style={{ fontSize: '14px', marginTop: '10px', fontWeight: 'bold' }}>Please upload an image that's 1mb or less</div>
                              <div className="option-profile clearfix">
                                  <form action="#">
                                      <label className="uploadFile">
                                          <input type="file" className="inputfile form-control" name="gallery" onChange={onMultiFileChange} />
                                      </label>
                                  </form>
                                  {form?.gallery?.map(item => (
                                    <div className="image">
                                        <img src={item} alt="Hulula" />
                                    </div>
                                  ))}
                              </div>
                              <div style={{ fontSize: '14px', marginBottom: '10px' }}>Please upload images that are 1mb or less</div>
                              <form onSubmit={handleSubmit(onSubmit)} className="form-profile">
                                  <div className="form-infor-profile">
                                      <div className="info-account">
                                          <h4 className="title-create-item">Account info</h4>                                    
                                              <fieldset>
                                                  <h4 className="title-infor-account">Nationality</h4>
                                                  <input type="text" placeholder="Latin" {...register("nationality")} />
                                                  {errors?.nationality && <p className='text-danger' style={{ fontSize: '12px', marginBottom: '5px' }}>{errors?.nationality?.message}</p>}
                                              </fieldset>
                                              <fieldset>
                                                  <h4 className="title-infor-account">Age</h4>
                                                  <input type="text" placeholder="Age" {...register("age")} />
                                                  {errors?.age && <p className='text-danger' style={{ fontSize: '12px', marginBottom: '5px' }}>{errors?.age?.message}</p>}
                                              </fieldset>
                                              <fieldset>
                                                  <h4 className="title-infor-account">Height</h4>
                                                  <input type="text" placeholder="180" {...register("height")} />
                                                  {errors?.height && <p className='text-danger' style={{ fontSize: '12px', marginBottom: '5px' }}>{errors?.height?.message}</p>}
                                              </fieldset>
                                              <fieldset>
                                                  <h4 className="title-infor-account">Bio</h4>
                                                  <textarea type="text" placeholder="description" {...register("description")} />
                                                  {errors?.description && <p className='text-danger' style={{ fontSize: '12px', marginBottom: '5px' }}>{errors?.description?.message}</p>}
                                              </fieldset>
                                      </div>
                                  </div>
                                  <button className="tf-button-submit mg-t-15" type="submit">
                                      Update Profile
                                  </button>           
                              </form>
                          </div>
                        </div>
                  </div>
              </div>
          </div>
          <Footer />
      </div>
  );
}

export default EditProfile;
