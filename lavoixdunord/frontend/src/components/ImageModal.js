import React from 'react';

const ImageModal = ({ imageSrc, altText, showModal, onClose, thumbnailHeight = '120px' }) => {
    return (
        <>
            <div className="mx-3">
                <img 
                    src={imageSrc}
                    alt={altText}
                    className="img-thumbnail"
                    style={{ maxHeight: thumbnailHeight, cursor: 'pointer' }}
                    onClick={() => onClose(true)}
                />
                <p className="text-muted small mb-0">Cliquez sur l'image pour l'agrandir</p>
            </div>

            <div className={`modal fade ${showModal ? 'show' : ''}`} 
                style={{ display: showModal ? 'block' : 'none' }}
                tabIndex="-1"
                onClick={() => onClose(false)}>
                <div className="modal-dialog modal-sm modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body p-0">
                            <img 
                                src={imageSrc}
                                alt={altText}
                                className="img-fluid"
                            />
                            <p className="text-center text-muted small py-2 mb-0">
                                Cliquez n'importe où pour fermer
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && <div className="modal-backdrop fade show" onClick={() => onClose(false)}></div>}
        </>
    );
};

export default ImageModal;
