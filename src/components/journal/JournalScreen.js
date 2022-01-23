import React from 'react'
import { NoteScreen } from '../notes/NoteScreen'
// import { NothngSelected } from './NothngSelected'
import { Sidebar } from './Sidebar'

export const JournalScreen = () => {
    return (
        <div className="journal__main-content">
            
            <Sidebar/>


            <main>

                {/* <NothngSelected/> */}
                <NoteScreen/>

            </main>


        </div>
    )
}
