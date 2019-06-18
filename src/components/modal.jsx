import React from 'react';

const Modal = ({showModal, modalContent, toggleModal}) => {

    return (
        <div className={showModal === true ? 'md-show modal-wrapper' : 'md-hide modal-wrapper'}>
            <div className="modal">
                <i className="material-icons close-trigger" onClick={() => toggleModal(false)}>close</i>
                {modalContent}
            </div>
            <div className="overlay" onClick={() => toggleModal(false)}></div>
        </div>
    );

};
export default Modal;
