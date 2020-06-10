import React from 'react'
import Modal from 'react-modal';
import QRCodeDisplay from './QRCodeDisplay'
import Banner from './Banner'
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

  function PopUpQRCode(){
    var subtitle;
    const [modalIsOpen,setIsOpen] = React.useState(false);
    function openModal() {
      setIsOpen(true);
    }
   
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f30';
    }
   
    function closeModal(){
      setIsOpen(false);
    }
   
      return (
        <div>
          <button className='btn-primary btn-reserve' onClick={openModal}>View QR code</button>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
   
            <h2 ref={_subtitle => (subtitle = _subtitle)}></h2>
            <QRCodeDisplay></QRCodeDisplay>
            <button onClick={closeModal} className='btn-primary btn-reserve'>close</button>

           
          </Modal>
        </div>
      );
  }

  export default PopUpQRCode;