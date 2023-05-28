import React from 'react';
import { useState } from 'react';

export default function Confirm_calendar({ form_data, booking }) {

    const gen_cal_entry = () => {

	const nice_phone = form_data.phone.replace(/[\- \(\)]/g, "").match(/.{1,4}/g).join(" ")

	if (booking.longitude === 0) {
	    return "Phone " + form_data.name + " - " + nice_phone }
	
	return form_data.name + " F2F - " + nice_phone
    }

    return (
	<>
	
	    <pre>{gen_cal_entry()}</pre>
	    <button className="medium"
	onClick={() => {navigator.clipboard.writeText(gen_cal_entry())}}>
	    Copy calendar entry to clipboard
	</button>	    <br/>

	    <button className="medium"
	onClick={() => {alert("Unless NHS update to a newer (more easily programmable) version of Outlook online, or LSSS move to a Google calendar, this button won't do anything - see 'Issues' at bottom of page.")} }>
	    Add to calendar
	</button>
	</>	    
    );
}

