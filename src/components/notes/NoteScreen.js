import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { startEditNote } from '../../redux/actions/notes';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {

    // const dispatch = useDispatch();
    const { id, title, body, url } = useSelector( state => state.notes.active );

    const [ values, handleInputChange ] = useForm({
        title: title || '',
        note: body || ''
    })

    // dispatch( startEditNote(id, values) )


    return( 
        <div className="notes-main-content">

            <NotesAppBar />

            <div className="notes__content">
            
                <input  
                    className="notes__title-input"
                    placeholder="Escribe una nota..."
                    autoComplete="off"
                    type="text"
                    name="title"
                    value={ values.title }
                    onChange={ handleInputChange }
                />
                <textarea
                    placeholder="What is on your mind?"
                    className="notes__textarea"
                    name="note"
                    value={ values.note }
                    onChange={ handleInputChange }
                />
                
                {
                    url && 
                        
                        <div className="notes__image">
                            <img
                                src={ url }
                                alt="imagen"
                            />
                        </div>
                        
                }



            </div>



        </div>
    )
};
