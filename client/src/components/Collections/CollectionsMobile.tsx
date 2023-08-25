import { GameDetailsResponse, Games } from '#/types/types';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import React from 'react';
import styled from 'styled-components';
import CollectionCard from './CollectionCard';

const StyledSplideSlide = styled(SplideSlide)`
	@media screen and (min-width: 900px) {
		padding-block: 1rem;
	}
`;
const CollectionsMobile = ({ games }: { games: any[] }) => {
	const isMoreThanOneGame = games.length > 1;
	const isMoreThanTwoGames = games.length > 2;
	return (
		<Splide
			options={{
				arrows: isMoreThanOneGame,
				pagination: isMoreThanOneGame,
				autoplay: isMoreThanOneGame,
				rewind: true,
				gap: '1.2rem',
				easing: 'ease',
				perPage: 1,
				fixedWidth: '100%',
				mediaQuery: 'min',
				breakpoints: {
					600: {
						fixedWidth: '48%',
						arrows: isMoreThanTwoGames,
						autoplay: isMoreThanTwoGames,
						pagination: isMoreThanTwoGames,
					},
					1200: {
						destroy: true,
					},
				},
				start: 0,
			}}
		>
			{games.map((game, idx) => (
				<StyledSplideSlide key={game._id}>
					<CollectionCard
						title={game.rawgGame.name}
						img={game.rawgGame.background_image}
					/>
				</StyledSplideSlide>
			))}
		</Splide>
	);
};

export default CollectionsMobile;
