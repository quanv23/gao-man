import React, { useState } from 'react';
import './styles/AddPlayer.css';
import './styles/ButtonBanner.css';

export default function EditPlayer(props) {
	// Deconstructing props
	const { editID, toggleEditInput, updateTile } = props;

	const [updatedName, setUpdatedName] = useState(editID.name);
	const [updatedTitle, setUpdatedTitle] = useState(editID.title);

	const resetForm = () => {
		setUpdatedName('');
		setUpdatedTitle('');
	};

	const handleEditPlayerBtn = () => {
		updateTile(editID.id, { name: updatedName, title: updatedTitle });
		toggleEditInput();
		resetForm();
	};

	return (
		<div id='add-player-background'>
			<div id='add-player-container'>
				<div id='input-container'>
					<input
						type='text'
						className='new-player-input'
						value={updatedName}
						onChange={(event) => setUpdatedName(event.target.value)}
					/>
					<input
						type='text'
						className='new-player-input'
						value={updatedTitle}
						onChange={(event) => setUpdatedTitle(event.target.value)}
					/>
				</div>
				<button
					id='add-player-btn'
					className='banner-btn'
					onClick={handleEditPlayerBtn}
				>
					Edit Player
				</button>
			</div>
		</div>
	);
}
