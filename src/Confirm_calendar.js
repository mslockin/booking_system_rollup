import React from 'react';
import { useState } from 'react';

export default function Confirm_calendar({ form_data, booking, checkboxes }) {

    const gen_cal_entry = () => {

	return `${phone_chk(0)}${form_data.name}${phone_chk(1)} - ${phone()} - ${form_data.postcode} ${tdt_chk()}`	
    }

    const phone_chk = (pos) => {

	if (checkboxes[0] === true && pos === 0) {

	    return "Call "

	} else if (checkboxes[0] === false && pos === 0 && booking.advisor === "alison" ) {

	    return "F2F "

	} else if (checkboxes[0] === false && pos === 1 && booking.advisor !== "alison" ) {

	    return " F2F"

	}

	return ""

    }

    const tdt_chk = () => {

	return (form_data["TDT"] === true) ? "[TDT]" : ""

    }
    
    const phone = () => {

	return form_data.phone.replace(/[\- \(\)]/g, "").match(/.{1,4}/g).join(" ")

    }

    return (
	<div className="jsx">
		    
	    <pre>{gen_cal_entry()}</pre>
	
	    <button className="medium"
	onClick={() => {navigator.clipboard.writeText(gen_cal_entry())}}>
	    Copy calendar entry to clipboard
	</button>	    <br/>

	    <button className="medium"
	onClick={() => {alert("Unless NHS update to a newer (more easily programmable) version of Outlook online, or LSSS move to a Google calendar, this button won't do anything - see 'Issues' at bottom of page.")} }>
	    Add to calendar
	</button>
	    
	</div>	    
    );
}

