import './App.css';
import { Routes, Route } from 'react-router-dom';
import routes from './pages/index'
import { Modal } from 'react-bootstrap';
import logoSecondary from './assets/images/logo/logo_secondary.png'
import { useEffect, useState } from 'react';
import { t } from './utils'

function App() {
  const [showModal, setShowModal] = useState(!localStorage.getItem('HIDE_CONSENT'))
  
  return (
    <>
      <Modal
        className='modal-consent'
        show={showModal}
        onHide={(e) => { console.log(e) }}
      > 
        <Modal.Header>
          <img src={logoSecondary} width="100" />
        </Modal.Header>
        <div className="modal-body">
          <h2 className='text-center' style={{ color: '#7A798A' }}>{t('homepage.welcomeTo')}</h2>
          <h2 className='text-center' style={{ color: '#CC0000' }}>Hulula</h2>
          <p className='text-center' style={{ color: '#CC0000' }}>
            {t('homepage.welcome.desc')}
          </p>
          <div className='d-flex justify-content-center'>
            <button className="btn btn-primary btn-modal" onClick={() => { setShowModal(false); localStorage.setItem('HIDE_CONSENT', true) }}>{t('homepage.welcome.enter')}</button>
            <button className="btn btn-secondary btn-modal ml-10">{t('homepage.welcome.exit')}</button>
          </div>
        </div>
      </Modal>
      <Routes>
        {
          routes.map((data, index) => (
            <Route onUpdate={() => window.scrollTo(0, 0)} exact={true} path={data.path} element={data.component} key={index} />
          ))
        }
      </Routes>
    </>
  );
}

export default App;
