import './App.css';
import { Routes, Route } from 'react-router-dom';
import routes from './pages/index'
import { Modal } from 'react-bootstrap';
import logoSecondary from './assets/images/logo/logo_secondary.png'
import { useState } from 'react';

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
          <h2 className='text-center' style={{ color: '#7A798A' }}>Welcome to</h2>
          <h2 className='text-center' style={{ color: '#CC0000' }}>Hulula</h2>
          <p className='text-center' style={{ color: '#CC0000' }}>
            Il sito offre materiale e foto destinato ad un pubblico adulto. Il sito utilizza cookies per migliorare l'esperienza di navigazione degli utenti. Cliccando il tasto ENTRA viene accettato il regolamentodel sito, la cookies policy e si dichiara di essere maggiorenne.
          </p>
          <div className='d-flex justify-content-center'>
            <button className="btn btn-primary btn-modal" onClick={() => {
              setShowModal(false)
              localStorage.setItem('HIDE_CONSENT', true)
            }}>18+ Enter</button>
            <button className="btn btn-secondary btn-modal ml-10">18- Exit</button>
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
