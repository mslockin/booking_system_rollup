import React from 'react';
import { useState } from 'react';

import Oauth from './Oauth.js'
import Editor from './Editor.js'
import Form from './Form.js'
import Booking from './Booking.js'
import Confirm from './Confirm.js'

import { default_clinics } from './clinics_from_csv.json';

export default function App() {

    const [clinics_obj, set_clinics_obj] = useState(default_clinics);

    const [page_flow, set_page_flow] = useState(10);

    const [form_data, set_form_data] = useState({ "name": "",
    						  "postcode": "", postcode_valid: 0,
    						  "phone": "", phone_valid: 0 });
    
    // const [page_flow, set_page_flow] = useState(20);
    
    // const [form_data, set_form_data] = useState({ "name": "J",
    // 						  "postcode": "SE13 6LH", postcode_valid: 1,
    // 						  "phone": "07777777777", phone_valid: 1 });
    
    const [booking, set_booking] = useState();

    switch (page_flow) {

    case 0:

	return(
		<Oauth
	    set_page_flow={set_page_flow}
		/>	    
	)

    case 5:

	return(
		<Editor
	    clinics_obj={clinics_obj}
	    set_clinics_obj={set_clinics_obj}
	    set_page_flow={set_page_flow}
		/>	    
	)

    case 10:

	return (
		<Form
	    form_data={form_data}
	    set_form_data={set_form_data}	
	    set_page_flow={set_page_flow}
		/>
	)

    case 20:

	return(
		<Booking
	    clinics_obj={clinics_obj}
	    form_data={form_data}
	    booking={booking}
	    set_booking={set_booking}
	    set_page_flow={set_page_flow}
		/>
	)

    case 30:

	return(
		<Confirm
	    form_data={form_data}
	    booking={booking}
	    set_page_flow={set_page_flow}
		/>
	)

    };
    
}

