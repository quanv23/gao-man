import React from 'react';
import './styles/ButtonBanner.css';

export default function ButtonBanner(props) {
	// Deconstructing props
	const {
		toggleDelete,
		toggleAddPlayer,
		toggleEditPlayer,
		toggleEditInput,
		showDelete,
		showEditPlayer,
		showEditInput,
	} = props;

	// Ensures edit toggle is closed when delete is opened
	const handleDelete = () => {
		if (showEditPlayer) {
			toggleEditPlayer();
		}
		toggleDelete();
	};

	// Ensures delete toggle is closed when edit is opened and edit input is closed when edit is closed
	const handleEdit = () => {
		if (showDelete) {
			toggleDelete();
		}
		if (showEditInput) {
			toggleEditInput();
		}
		toggleEditPlayer();
	};

	return (
		<div id='button-container'>
			<div className='banner-btn' id='add-btn' onClick={toggleAddPlayer}>
				Add
			</div>
			<div className='banner-btn' id='delete-btn' onClick={handleDelete}>
				Delete
			</div>
			<div className='banner-btn' id='edit-btn' onClick={handleEdit}>
				Edit
			</div>
		</div>
	);
}
