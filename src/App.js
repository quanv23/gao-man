import React, { useCallback, useMemo, useState, useEffect } from 'react';
import Header from './components/Header.js';
import Tile from './components/Tile.js';
import ButtonBanner from './components/ButtonBanner.js';
import AddPlayer from './components/AddPlayer.js';
import EditPlayer from './components/EditPlayer.js';

// Firebase imports
import { db } from './config/firebase.js';
import {
	collection,
	getDocs,
	deleteDoc,
	doc,
	addDoc,
	updateDoc,
} from 'firebase/firestore';

export default function App() {
	/* ============================================================================================
Deleting Tiles 
================================================================================================ */

	// State to track whether in delete state or not
	const [showDelete, setShowDelete] = useState(false);
	const toggleDelete = () => {
		setShowDelete((prevShowDelete) => !prevShowDelete);
	};

	// Deletes tile by using id to identify the doc and delete it then get tile list again
	const deleteTile = async (id) => {
		try {
			const tileDoc = doc(db, 'tiles', id);
			await deleteDoc(tileDoc);
			getTileList();
		} catch (error) {
			console.log('Error deleting tile', error);
		}
	};

	/* ============================================================================================
Editing Existing Tiles
================================================================================================ */

	// Toggled state for showing pencil icon for editting states
	const [showEditPlayer, setShowEditPlayer] = useState(false);
	const toggleEditPlayer = () => {
		setShowEditPlayer((prevShowEditPlayer) => !prevShowEditPlayer);
	};

	// Toggled state for showing edit input form
	const [showEditInput, setShowEditInput] = useState(false);
	const toggleEditInput = () => {
		setShowEditInput((prevShowEditInput) => !prevShowEditInput);
	};

	// State that tracks ID of tile being edited
	const [editID, setEditID] = useState({ id: '', name: '', title: '' });

	// Updates tiles name and title for edit input form, doesn't update wins and games
	const updateTile = async (id, obj) => {
		try {
			const tileDoc = doc(db, 'tiles', id);
			await updateDoc(tileDoc, obj);
			getTileList();
		} catch (error) {
			console.log('Error updating tile', error);
		}
	};

	/* ============================================================================================
Creating New Tiles
================================================================================================ */

	// States that toggle whether to display add player or not
	const [showAddPlayer, setShowAddPlayer] = useState(false);
	const toggleAddPlayer = () => {
		setShowAddPlayer((prevShowAddPlayer) => !prevShowAddPlayer);
	};

	// States that contain the information for adding a new player
	const [newName, setNewName] = useState('');
	const [newTitle, setNewTitle] = useState('');

	// onAddPlayer adds new player when Add Player button is clicked in addplayer
	const onAddPlayer = async () => {
		try {
			await addDoc(tilesCollectionRef, {
				name: newName,
				title: newTitle,
				wins: 0,
				games: 0,
			});
			getTileList();
		} catch (error) {
			console.log('Error adding tile', error);
		}
	};

	/* ============================================================================================
Creating Initial Tiles 
================================================================================================ */

	// tileList keeps track of active tiles
	// tilesCollectionRef is a reference to tiles collection in firestore
	const [tileList, setTileList] = useState([]);
	const tilesCollectionRef = useMemo(() => collection(db, 'tiles'), []);

	// getTileList fetches data from firestore and adds an id to it
	const getTileList = useCallback(async () => {
		try {
			const data = await getDocs(tilesCollectionRef);
			const filteredData = data.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));

			// Filters list by highest win rate at the top
			filteredData.sort((a, b) => b.wins / b.games - a.wins / a.games);

			console.log('Read tile list');
			setTileList(filteredData);
		} catch (error) {
			console.log('Error getting tile list', error);
		}
	}, [tilesCollectionRef]);

	// Runs at startup to fetch data from firestore
	useEffect(() => {
		getTileList();
	}, [getTileList]);

	const tileElements = tileList.map((tile) => {
		let unRoundedRatio;
		tile.games === 0
			? (unRoundedRatio = 0)
			: (unRoundedRatio = tile.wins / tile.games);
		const ratio = unRoundedRatio.toFixed(2);
		return (
			<Tile
				key={tile.id}
				id={tile.id}
				name={tile.name}
				title={tile.title}
				wins={tile.wins}
				games={tile.games}
				ratio={ratio}
				showDelete={showDelete}
				deleteTile={deleteTile}
				showEditPlayer={showEditPlayer}
				showEditInput={showEditInput}
				toggleEditInput={toggleEditInput}
				setEditID={setEditID}
				updateTile={updateTile}
			/>
		);
	});

	return (
		<div>
			<Header />
			<main id='main-content'>
				{showEditInput && (
					<EditPlayer
						editID={editID}
						toggleEditInput={toggleEditInput}
						updateTile={updateTile}
					/>
				)}
				{showAddPlayer && (
					<AddPlayer
						setNewName={setNewName}
						setNewTitle={setNewTitle}
						onAddPlayer={onAddPlayer}
						toggleAddPlayer={toggleAddPlayer}
					/>
				)}
				{tileElements}
			</main>
			<ButtonBanner
				toggleDelete={toggleDelete}
				toggleAddPlayer={toggleAddPlayer}
				toggleEditPlayer={toggleEditPlayer}
				toggleEditInput={toggleEditInput}
				showDelete={showDelete}
				showEditPlayer={showEditPlayer}
				showEditInput={showEditInput}
			/>
		</div>
	);
}
