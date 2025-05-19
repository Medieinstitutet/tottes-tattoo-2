import React from 'react';

export default function ArtistList({ artists, onSelect }) {
	return (
		<div
			style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
			<ul
				style={{
					display: 'flex',
					gap: '1.5rem',
					listStyle: 'none',
					padding: 0,
					margin: 0,
				}}>
				{artists.map((artist) => (
					<li
						key={artist.id}
						style={{
							cursor: 'pointer',
							padding: '0.5rem 1rem',
							border: '1px solid #d4af37',
							borderRadius: '8px',
							background: '#222',
							color: '#fff',
						}}
						onClick={() => onSelect(artist)}>
						{artist.name}
					</li>
				))}
			</ul>
		</div>
	);
}
