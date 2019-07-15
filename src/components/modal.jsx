import React from 'react';

const Modal = ({showModal, toggleModal}) => {

    return (
        <div className={showModal === true ? 'md-show modal-wrapper' : 'md-hide modal-wrapper'}>
            <div className="modal">
                <i className="material-icons close-trigger" onClick={() => toggleModal(false)}>close</i>
                <div className="text-wrap">
                    <p>
                        Vivek Vadoliya is a British Indian documentary and portrait photographer & director. Currently he is based between London and Berlin.
                    </p>
                    <p><a href="mailto:studio@vivekvadoliya.com">studio@vivekvadoliya.com</a></p>
                    <p><a href="https://instagram.com/vivekvad" target="_blank">@vivekvad</a></p>
                </div>

        </div>
        </div>
    );

};
export default Modal;
