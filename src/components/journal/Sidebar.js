import React from 'react'
import { useDispatch } from 'react-redux';
import { startLogout } from '../../redux/actions/auth';
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch( startLogout() );
    }


    return (
        <aside className="journal__sidebar">
            
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="fas fa-book-open"></i>
                    <span> Fernando!</span>
                </h3>

                <button 
                    className="btn"
                    onClick={ handleLogout }
                >
                    <i className="fas fa-sign-out-alt"></i>
                    <span> Sign Out</span>
                </button>

            </div>


            <div className="journal__new-entry">
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">New Entry</p>

            </div>

            {/* <div className="journal__new-entry">
                <i className="fas fa-edit fa-5x"></i>
                <p className="mt-5">Edit Entry</p>
            </div> */}

            {/* <div className="journal__new-entry">
                <i className="fas fa-trash fa-5x"></i>
                <p className="mt-5">Delete Entry</p>
            </div> */}
                
            <JournalEntries />


        </aside>
    )
}
