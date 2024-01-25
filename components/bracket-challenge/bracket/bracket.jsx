import Player from 'components/bracket-challenge/player/player';
import styles from './bracket.module.scss';
import clsx from 'clsx';

export default function Bracket({
  matchupId,
  bracketClassNames = '',
  team1,
  team2,
  actualWinner,
  currentRound,
}) {
  // The first round matchups or the user selections in rounds past round 1
  const snowboarders = [team1, team2];
  // The actual winners from the contest
  const winners = [actualWinner?.team1, actualWinner?.team2];
  return (
    <div className={clsx(styles.bracket, bracketClassNames)}>
      {snowboarders.map((snowboarder, index) => {
        return (
          <Player
            key={`matchup-${matchupId}-${index}`}
            {...snowboarder}
            matchupId={matchupId}
            winner={winners[index]}
            position={index + 1}
            currentRound={currentRound}
          />
        );
      })}
    </div>
  );
}
