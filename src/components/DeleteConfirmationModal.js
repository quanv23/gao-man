import React from 'react';
import './styles/DeleteConfirmation.css';

export default function DeleteConfirmationModal(props) {
	// Deconstructing props
	const { toggleShowDeleteConfirmation, deleteTile, id } = props;

	return (
		<div id='background-blur' onClick={toggleShowDeleteConfirmation}>
			<div
				id='delete-confirmation-container'
				onClick={(e) => e.stopPropagation()}
			>
				<h1>Are you sure?</h1>
				<div id='delete-confirmation-btn-container'>
					<button
						className='delete-confirmation-btn'
						onClick={toggleShowDeleteConfirmation}
					>
						Cancel
					</button>
					<button
						className='delete-confirmation-btn'
						onClick={() => deleteTile(id)}
					>
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
}
