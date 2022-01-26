import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startUpdateNote, startUploadPicture } from '../../redux/actions/notes';

export const NotesAppBar = () => {
  
    const dispatch = useDispatch();
    const { active } = useSelector( state => state.notes );

    const handleSave = () => {
        dispatch(startUpdateNote( active ))
    }

    const handlePictureUpload = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            dispatch( startUploadPicture( file ) );
        };
    };

    return (
    <div className="notes__appbar">
        
        <span 
            className="notes-app-bar__folder-title">
            27 de enero 2022
        </span>

        <input 
            id="fileSelector"
            type="file"
            name="file"
            style={{ display: 'none' }}
            onChange={ handleFileChange }
        />

        <div>
            <button 
                className="btn"
                onClick={ handlePictureUpload }
            >
                Picture
            </button>

            <button 
                className="btn"
                onClick={ handleSave }
            >
                Save
            </button>
        </div>

    </div>

  );
};
