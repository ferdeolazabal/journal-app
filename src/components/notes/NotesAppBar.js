import React from 'react';

export const NotesAppBar = () => {
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

            <button className="btn">
                <i className="material-icons">
                    Save
                </i>
            </button>
        </div>

    </div>

  );
};
