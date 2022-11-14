import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import avt from '../assets/images/avatar/avata_profile.jpg'
import client from '../client'
import { useEffect } from 'react';

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

const EditProfile = () => {
  const [form, setForm] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      const user = JSON.parse(localStorage.getItem('APP_USER'))
      if(user?.user?.id) {
        setForm({
          ...form,
          userId: user?.user?.id
        })
      } else {
        // navigate('/login')
      }
    }, 1000)
  }, [])

  const deleteKey = (key) => (e) => {
    setForm({
      ...form,
      [key]: undefined
    })
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
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

  const onSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setForm({ ...form, isLoading: true })
    try {
      const result = await client.put('/profile', {
        userId: form.userId,
        nationality: form.nationality,
        age: form.age,
        height: form.height,
        image: form.image,
        description: form.description
      })
      setForm({
        ...form,
        isLoading: false,
        error: undefined,
        errors: undefined
      })
      navigate('/')
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
                              <div style={{ fontSize: '10px', fontStyle: 'italic', marginTop: '10px' }}>Please upload an image that's 1mb or less</div>
                              <div id="upload-profile">
                                  <Link to="#" className="btn-upload">Upload New Photo </Link>
                                  <input id="tf-upload-img" type="file" name="image" required="" onChange={onFileChange} />
                              </div>
                              <Link to="#" className="btn-upload style2" onClick={deleteKey('image')}>Delete</Link>
                          </div>
                        </div>
                        <div className="col-xl-9 col-lg-8 col-md-12 col-12">
                            <div className="form-upload-profile">
                              <h4 className="title-create-item">Choice your Cover image</h4>
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
                              <div style={{ fontSize: '10px', fontStyle: 'italic', marginBottom: '10px' }}>Please upload image that are 1mb or less</div>
                              <form onSubmit={onSubmit} className="form-profile">
                                  <div className="form-infor-profile">
                                      <div className="info-account">
                                          <h4 className="title-create-item">Account info</h4>                                    
                                              <fieldset>
                                                  <h4 className="title-infor-account">Nationality</h4>
                                                  <input type="text" name="nationality" value={form.nationality} placeholder="Latin" onChange={handleChange} required />
                                              </fieldset>
                                              <fieldset>
                                                  <h4 className="title-infor-account">Age</h4>
                                                  <input type="text" name="age" value={form.age} placeholder="27" onChange={handleChange} required />
                                              </fieldset>
                                              <fieldset>
                                                  <h4 className="title-infor-account">Height</h4>
                                                  <input type="text" name="height" value={form.height} placeholder="170" onChange={handleChange} required />
                                              </fieldset>
                                              <fieldset>
                                                  <h4 className="title-infor-account">Bio</h4>
                                                  <textarea tabIndex="4" rows="5" name="description" value={form.description} onChange={handleChange} required></textarea>
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
