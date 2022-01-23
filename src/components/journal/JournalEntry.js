import React from 'react'

export const JournalEntry = () => {

    return (
        <div className="journal__entry pointer">
            
            <div 
                className="journal__entry-picture"
                style={{
                    BackgroundSize: 'cover',
                    backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZaJCD8Xb1woOkBHQmFamBch0f_T8K-QmUordyleng00glKVFlbWbRcs0rfM0zH515Jyk&usqp=CAU)`,
                }}
            ></div>

            <div className="journal__entry-body">
                <p className="journal__entry-title">A New Day!</p>
                <p className="journal__entry-content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                
            </div>

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>27</h4>
            </div>
            
        </div>
    )
}
