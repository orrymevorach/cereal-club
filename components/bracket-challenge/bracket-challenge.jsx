import BracketColumn from 'components/bracket-challenge/bracket-column/bracket-column';
import styles from './bracket-challenge.module.scss';
import { useMatchups } from 'context/matchup-context/matchup-context';
import { split } from 'utils/utils';
import Loader from 'components/shared/loader/loader';
import Button from 'components/shared/button/button';
import { updateUserBracket } from '@/lib/airtable';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function BracketChallenge() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { revelstokeMatchups } = useMatchups();
  const router = useRouter();

  const {
    roundOneMatchups = [],
    quarterFinalMatchups = [],
    semiFinalMatchups = [],
    finalsMatchup = [],
    winner,
  } = revelstokeMatchups;

  if (!revelstokeMatchups.roundOneMatchups.length) {
    return <Loader isDotted />;
  }

  const [firstHalfRoundOne, secondHalfRoundOne] = split(roundOneMatchups);
  const [firstHalfQuarterFinal, secondHalfQuarterFinal] =
    split(quarterFinalMatchups);
  const [firstHalfSemiFinal, secondHalfSemiFinal] = split(semiFinalMatchups);
  const [firstHalfFinal, secondHalfFinal] = split(
    finalsMatchup.length ? finalsMatchup[0].snowboarders : []
  );

  // This can be cleaned up. Final only has one matchup, and we need to show them on different sides
  const updatedFirstHalfFinal = [
    {
      matchupId: 'R_R4_M1',
      snowboarders: firstHalfFinal,
    },
  ];

  const updatedSecondHalfFinal = [
    {
      matchupId: 'R_R4_M1',
      snowboarders: secondHalfFinal,
    },
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const matchupsAsArray = Object.entries(revelstokeMatchups);
    const rounds = matchupsAsArray.reduce((acc, curr) => {
      const [_, roundMatchups] = curr;
      for (let matchup of roundMatchups) {
        acc[matchup.matchupId] = matchup.winner?.id;
      }
      return acc;
    }, {});
    await updateUserBracket({ rounds, id: router.query.bracketId });
    setIsSubmitting(false);
  };
  return (
    <div className={styles.bracketChallengeContainer}>
      <Button
        classNames={styles.submitButton}
        handleClick={() => handleSubmit()}
        isLoading={isSubmitting}
      >
        Submit
      </Button>
      <div className={styles.row}>
        <div className={styles.row}>
          <BracketColumn matchups={firstHalfRoundOne} round={1} />
          <BracketColumn matchups={firstHalfQuarterFinal} round={2} />
          <BracketColumn matchups={firstHalfSemiFinal} round={3} />
          <BracketColumn matchups={updatedFirstHalfFinal} round={4} />
        </div>
        {winner.length ? (
          <div className={styles.winnerContainer}>
            <h3>🏆</h3>
            <BracketColumn
              matchups={winner}
              round={5}
              bracketClassNames={styles.winnersBracket}
            />
          </div>
        ) : (
          ''
        )}

        <div className={styles.row}>
          <BracketColumn matchups={updatedSecondHalfFinal} round={4} />
          <BracketColumn matchups={secondHalfSemiFinal} round={3} />
          <BracketColumn matchups={secondHalfQuarterFinal} round={2} />
          <BracketColumn matchups={secondHalfRoundOne} round={1} />
        </div>
      </div>
    </div>
  );
}
