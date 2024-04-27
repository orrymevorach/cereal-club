import AddCerealForm from '@/components/AddCerealForm/AddCerealForm';
import Button from '@/components/shared/Button/Button';
import Table from '@/components/Table/Table';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './HomePage.module.scss';
import { useState } from 'react';
import Takeover from '../shared/takeover/takeover';

export default function HomePage() {
  const [showAddCerealTakeover, setShowAddCerealTakeover] = useState(false);
  const [editScores, setEditScores] = useState(false);
  return (
    <div>
      {showAddCerealTakeover && (
        <Takeover handleClose={() => setShowAddCerealTakeover(false)}>
          <AddCerealForm />
        </Takeover>
      )}
      <div className={styles.logo}></div>
      <div className={styles.buttonsContainer}>
        <Button
          isLight
          classNames={styles.button}
          handleClick={() => setShowAddCerealTakeover(true)}
        >
          <FontAwesomeIcon icon={faPlus} />
          Add New Cereal
        </Button>
        <Button
          isLight
          classNames={styles.button}
          handleClick={() => setEditScores(true)}
        >
          <FontAwesomeIcon icon={faEdit} />
          Edit Scores
        </Button>
      </div>
      <Table editScores={editScores} />
    </div>
  );
}
