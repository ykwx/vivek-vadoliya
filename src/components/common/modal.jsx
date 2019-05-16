import React from 'react';

const Modal = ({showModal, modalContent, toggleModal}) => {

    console.log(toggleModal);

    return (
        <div className={showModal === true ? 'md-show modal-wrapper' : 'md-hide modal-wrapper'}>
            <div className="modal">
                {modalContent}
            </div>
            <div className="overlay" onClick={() => toggleModal(false)}></div>
        </div>
    );

};
export default Modal;
