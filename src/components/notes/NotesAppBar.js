import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startUpdateNote } from '../../redux/actions/notes';

export const NotesAppBar = () => {
  
    const dispatch = useDispatch();
    const { active } = useSelector( state => state.notes );

    const handleSave = () => {
        // console.log( active );
        dispatch(startUpdateNote( active ))

    }


    return (
    <div className="notes__appbar">
        
        <span 
            className="notes-app-bar__folder-title">
            27 de enero 2022
        </span>

        <div>
            <button className="btn">
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
