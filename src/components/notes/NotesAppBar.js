import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startEditNote } from '../../redux/actions/notes';

export const NotesAppBar = () => {
  
    const dispatch = useDispatch();
    const { id, title, body } = useSelector( state => state.notes.active );

    const saveNotes = () => {
        dispatch( startEditNote(id, {title, body}) )

    }
  
  
    return (
    <div className="notes__appbar">
        
        <span 
            className="notes-app-bar__folder-title">
            27 de enero 2022
        </span>

        <div>
            <button className="btn">
                <i className="material-icons">
                    Picture
                </i>
            </button>

            <button 
                className="btn"
                onClick={ saveNotes }
            >
                <i className="material-icons">
                    Save
                </i>
            </button>
        </div>

    </div>

  );
};
