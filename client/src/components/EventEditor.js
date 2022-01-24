import React from "react";
import { useMutation } from '@apollo/client';
import { UPDATE_EVENT } from '../utils/mutations';
import { EVENT_DETAILS } from '../utils/queries';

export default function EventEditor(props) {

    const { eventData, eventId } = props;

    const [ updateEvent ] = useMutation(UPDATE_EVENT, {
		refetchQueries: [
			EVENT_DETAILS,
			'eventDetails'
		]
	});

    const [editedEvent, setEditedEvent] = React.useState(eventData);

    const handleEdit = async () => {
		await updateEvent({
			variables: {
				eventId: eventId,
				title: editedEvent.title,
				description: editedEvent.description,
				start_date: editedEvent.start_date,
				end_date: editedEvent.end_date,
				start_time: editedEvent.start_time,
				end_time: editedEvent.end_time,
				category: editedEvent.category,
				in_person: editedEvent.in_person,
				location: editedEvent.location,
				image: editedEvent.image
			}
		});
	}

    const handleChange = async (event) => {
		const { name, value } = event.target;
        setEditedEvent({
            ...editedEvent,
            [name]: value
        })
	}

    return (
        <form className="event-edit-form" onSubmit={handleEdit}>
			<div className='event-edit-inputs'>
				<div>
					<label forhtml="title">Title</label>
					<input type="text" value={editedEvent.title} onChange={handleChange} id="title" name="title"></input>
				</div>
				<div>
					<label forhtml="description">Description</label>
					<input type="text" value={editedEvent.description} onChange={handleChange} id="description" name="description" ></input>
				</div>
				<div>
					<label forhtml="start_date">Start Date</label>
					<input type="date" value={editedEvent.start_date} onChange={handleChange}  id="start_date" name="start_date" />
				</div>
				<div>
					<label forhtml="end_date">End Date</label>
					<input type="date" value={editedEvent.end_date} onChange={handleChange} id="end_date" name="end_date" />
				</div>
				<div>
					<label forhtml="start_time">Start Time</label>
					<input type="time" value={editedEvent.start_time} onChange={handleChange} id="start_time" name="start_time" />
				</div>
				<div>
					<label forhtml="end_time">End Time</label>
					<input type="time" value={editedEvent.end_time} onChange={handleChange} id="end_time" name="end_time" />
				</div>
				<div>
					<label forhtml="category">Category</label>
					<input type="text" value={editedEvent.category} onChange={handleChange} id="category" name="category" />
				</div>
				<div>
					<label forhtml="in_person">In Person Event</label>
					<input type="checkbox" value={editedEvent.in_person} onChange={handleChange} id="in_person" name="in_person"/>
				</div>
				<div>
					<label forhtml="location">Event Location / URL</label>
					<input type="text" value={editedEvent.location} onChange={handleChange} id="location" name="location"/>
				</div>
				<button className="event-edit-button" type="submit">Update Event</button>
			</div>
		</form>
    )
}