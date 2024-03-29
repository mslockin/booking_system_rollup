import React from 'react';
import { useState } from 'react';

import Confirm_checkboxes from './Confirm_checkboxes.js';
import Confirm_calendar from './Confirm_calendar.js';
import Confirm_sms from './Confirm_sms.js';
import Confirm_outro from './Confirm_outro.js';

import { check_day_matches_date,
	 format_date_time,
	 title_case } from './general_funcs.js';

export default function Confirm({ form_data, booking, set_page_flow }) {

    const [appt_time, set_appt_time] = useState([ "DATE & TIME HERE", 0 ]);
    
    const [checkboxes, set_checkboxes] = useState([ booking.longitude === 0, 0 ]);
    
    const handle_time_change = (e) => {

	if (e.target.value === "") {

	    set_appt_time([ "DATE & TIME HERE", 0 ])

	} else {

	    console.log(booking.day_of_week, e.target.value)

	    set_appt_time([ e.target.value,
			    check_day_matches_date(
				booking.day_of_week,
				e.target.value) ])

	}						   
	
    }

    const gen_csv_entry = (time) => {

	const csv_entry_end = `, ${format_date_time(time).replace(",","")}, ${title_case(booking.advisor)}`

	if (checkboxes[0] === true) {

	    return "Telephone" + csv_entry_end

	} else { return booking.title.split(" ")[0] + csv_entry_end }

    }

    return (
	    <div className="Confirm">

            <div className="topbar">
	    <button className="medium" onClick={ () => {set_page_flow(10)} }>Back to initial form</button> 

	    <button className="medium" onClick={ () => {set_page_flow(20)} }>Back to clinic selection</button>
	    </div>

	    <h1>Confirmation</h1>

	    <strong>1. Final selections:</strong><br/>

	    <Confirm_checkboxes
	form_data={form_data}
	booking={booking}
	checkboxes={checkboxes}
	set_checkboxes={set_checkboxes} /> <br/>

	    <strong>2. Copy to calendar:</strong><br/>

	    <Confirm_calendar
	form_data={form_data}
	booking={booking}
	checkboxes={checkboxes} /> <br/>

	    <strong>3. Paste date & time from calendar:</strong><br/>

	<div className="jsx">

	    <textarea className="oneline" value={appt_time[0]} onChange={(e) => {
		handle_time_change(e)
	    }}/>
	    {appt_time[1] === 1 && <em>Warning: was expecting different day of month!</em>}

	    <br/><br/>

	</div>
	    
	    <strong>4. Copy text for client:</strong><br/>

	    <Confirm_sms
	form_data={form_data}
	booking={booking}
	checkboxes={checkboxes}
	appt_time={appt_time[0]}/>

	    <br/>

	    <strong>5. Copy text for spreadsheet:</strong><br/>

	<div className="jsx">

	    <pre>{gen_csv_entry(appt_time[0])}</pre>
	    <button className="medium"
	onClick={() => {navigator.clipboard.writeText(
	    gen_csv_entry(appt_time[0])
	) }}>
	    Copy entry to clipboard
	</button>

	    <br/><br/>

	    <button className="medium"
	onClick={() => {navigator.clipboard.writeText(form_data.name) }}>
	    Copy {form_data.name} to clipboard
	</button>	    

	    <button className="medium"
	onClick={() => {navigator.clipboard.writeText(form_data.postcode) }}>
	    Copy {form_data.postcode} to clipboard
	</button>	    

	</div>

	    <Confirm_outro/>

	</div>
    );
}

