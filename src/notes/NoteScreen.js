import React from 'react';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
    return( 
        <div className="notes-main-content">

            <NotesAppBar />

            <div className="notes__content">
            
                <input  
                    type="text"
                    placeholder="Escribe una nota..."
                    className="notes__title-input"
                    autoComplete="off"
                />
                <textarea
                    placeholder="What is on your mind?"
                    className="notes__textarea"
                />
                
                <div className="notes__image">
                    <img
                        src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                        alt="imagen"
                    />
                </div>



            </div>



        </div>
    )
};
