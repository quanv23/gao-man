import React from 'react';
import './styles/AddPlayer.css';
import './styles/ButtonBanner.css';

export default function AddPlayer(props) {
	// Deconstructing props
	const { setNewName, setNewTitle, onAddPlayer, toggleAddPlayer } = props;

	const resetForm = () => {
		setNewName('');
		setNewTitle('');
	};

	const handleAddPlayerBtn = () => {
		onAddPlayer();
		toggleAddPlayer();
		resetForm();
	};

	return (
		<div id='add-player-background'>
			<div id='add-player-container'>
				<div id='input-container'>
					<input
						type='text'
						className='new-player-input'
						placeholder='Name'
						onChange={(event) => setNewName(event.target.value)}
					/>
					<input
						type='text'
						className='new-player-input'
						placeholder='Title'
						onChange={(event) => setNewTitle(event.target.value)}
					/>
				</div>
				<button
					id='add-player-btn'
					className='banner-btn'
					onClick={handleAddPlayerBtn}
				>
					Add Player
				</button>
			</div>
		</div>
	);
}
