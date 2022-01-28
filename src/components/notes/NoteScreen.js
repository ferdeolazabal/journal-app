import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { activeNote, startDeleteNote } from '../../redux/actions/notes';
import { NotesAppBar } from './NotesAppBar';
import Swal from 'sweetalert2'

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

    const handleDelete = () => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch( startDeleteNote( id ) );
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your file has been deleted successfully.',
                    icon: 'success',
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                })
            }
        })
    } 

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
                        
                        (<div className="notes__image">
                            <img
                                src={ values.url }
                                alt="imagen"
                            />
                        </div>)
                }
                
            </div>

            <button 
                className="btn btn-danger"
                onClick={ handleDelete }
            >
                Delete
            </button>



        </div>
    )
};
