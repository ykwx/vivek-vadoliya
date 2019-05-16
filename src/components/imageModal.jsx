import React from 'react';

const ImageModal = ({showModal, modalContent, toggleModal}) => {

    console.log(modalContent);
    

    return (
        <div className={showModal === true ? 'md-show modal-wrapper' : 'md-hide modal-wrapper'}>
            <div className="modal">
                {modalContent}

            </div>
            <div className="overlay" onClick={() => toggleModal(false)}></div>
        </div>
    );

};
export default ImageModal;
