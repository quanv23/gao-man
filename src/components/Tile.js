import React, { useState } from 'react';
import { FaCirclePlus } from 'react-icons/fa6';
import { FaCircleMinus } from 'react-icons/fa6';
import { FaCircleXmark } from 'react-icons/fa6';
import { FaCircle } from 'react-icons/fa6';
import { MdModeEdit } from 'react-icons/md';
import DeleteConfirmationModal from './DeleteConfirmationModal.js';
import './styles/Tile.css';

export default function Tile(props) {
	// Deconstructing props
	const {
		id,
		name,
		title,
		wins,
		games,
		ratio,
		showDelete,
		deleteTile,
		showEditPlayer,
		toggleEditInput,
		setEditID,
		updateTile,
	} = props;

	// States to track and update wins and games
	const [updatedWins, setUpdatedWins] = useState(wins);
	const [updatedGames, setUpdatedGames] = useState(games);

	// handle functions for incrementing and decrementing wins and games to remain in the range 0-999
	const handleIncrementWins = () => {
		if (updatedWins < 999) {
			setUpdatedWins((prevUpdatedWins) => prevUpdatedWins + 1);
			updateTile(id, { wins: updatedWins + 1 });
		}
	};

	const handleDecrementWins = () => {
		if (updatedWins > 0) {
			setUpdatedWins((prevUpdatedWins) => prevUpdatedWins - 1);
			updateTile(id, { wins: updatedWins - 1 });
		}
	};

	const handleIncrementGames = () => {
		if (updatedGames < 999) {
			setUpdatedGames((prevUpdatedGames) => prevUpdatedGames + 1);
			updateTile(id, { games: updatedGames + 1 });
		}
	};

	const handleDecrementGames = () => {
		if (updatedGames > 0) {
			setUpdatedGames((prevUpdatedGames) => prevUpdatedGames - 1);
			updateTile(id, { games: updatedGames - 1 });
		}
	};

	// State to track whether to display delete confirmation modal
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState();
	const toggleShowDeleteConfirmation = () => {
		setShowDeleteConfirmation(
			(prevShowDeleteConfirmation) => !prevShowDeleteConfirmation
		);
	};

	// Function that handles when edit is toggled and sends ID upwards
	const onEdit = () => {
		toggleEditInput();
		setEditID({ id: id, name: name, title: title });
	};

	return (
		<div id='tile-container'>
			{showDeleteConfirmation && (
				<DeleteConfirmationModal
					toggleShowDeleteConfirmation={toggleShowDeleteConfirmation}
					deleteTile={deleteTile}
					id={id}
				/>
			)}
			<div id='text-container'>
				<h1>{name}</h1>
				<p id='title'>{title}</p>
				<p>({ratio})</p>
			</div>
			<div id='counter-container'>
				<div className='counter'>
					<FaCirclePlus
						className='counter-plus'
						color='#7FB685'
						size={20}
						onClick={handleIncrementWins}
					/>
					<p>{updatedWins}</p>
					<FaCircleMinus
						className='counter-minus'
						color='#EF6F6C'
						size={20}
						onClick={handleDecrementWins}
					/>
				</div>
				<div className='counter'>
					<FaCirclePlus
						className='counter-plus'
						color='#7FB685'
						size={20}
						onClick={handleIncrementGames}
					/>
					<p>{updatedGames}</p>
					<FaCircleMinus
						className='counter-minus'
						color='#EF6F6C'
						size={20}
						onClick={handleDecrementGames}
					/>
				</div>
			</div>
			{showDelete && (
				<div className='corner-img'>
					<FaCircle
						className='corner-img'
						color='white'
						size={35}
						onClick={toggleShowDeleteConfirmation}
					/>
					<FaCircleXmark
						className='corner-img counter-minus'
						color='#EF6F6C'
						size={35}
						onClick={toggleShowDeleteConfirmation}
					/>
				</div>
			)}
			{showEditPlayer && (
				<div className='corner-img'>
					<MdModeEdit
						id='edit-img'
						color='white'
						size={22.5}
						onClick={onEdit}
					/>
					<FaCircle
						id='edit-circle'
						color='#f2c57c'
						size={35}
						onClick={onEdit}
					/>
				</div>
			)}
		</div>
	);
}
