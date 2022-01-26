import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { activeNote } from '../../redux/actions/notes';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {

    const dispatch = useDispatch();
    const { id, title, body, url, date } = useSelector( state => state.notes.active );

    const [ values, handleInputChange, reset ] = useForm( {
        title: title || '',
        body: body  || '',
        date: date || '',
        url: url
    } );

    const activeId = useRef( id );
    
    useEffect( () => {
        if( id !== activeId.current ) {
            reset( {  title, body, url } );
            activeId.current = id;
        }
    }, [ id, title, body, url, reset ] );

    useEffect( () => {
        dispatch( activeNote( id, values ) );
    }, [ values, dispatch, id ] );

    console.log( values );

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
                    name="body"
                    value={ values.body }
                    onChange={ handleInputChange }
                />
                
                {
                    values.url && 
                        
                        <div className="notes__image">
                            <img
                                src={ values.url }
                                alt="imagen"
                            />
                        </div>
                        
                }



            </div>



        </div>
    )
};
