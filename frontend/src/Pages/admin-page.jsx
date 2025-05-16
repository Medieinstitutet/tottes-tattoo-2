import React, { useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import '../styles/admin-page.css';

export default function AdminPage() {
	const [artists, setArtists] = useState([]);

	useEffect(() => {
		fetch('http://localhost:3000/api/v1/artists')
			.then((res) => res.json())
			.then((data) => setArtists(data));
	}, []);

	return (
		<>
			<NavBar />
			<h1 className='admin-title'>Adminpanel</h1>
			<div className='admin-section'>
				<h2>Tatuerare</h2>
				<ul className='admin-list'>
					{artists.map((artist) => (
						<li key={artist._id || artist.id}>
							{artist.name} – {artist.specialty}
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
