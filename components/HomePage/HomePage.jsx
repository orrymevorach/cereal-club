import AddCerealForm from '@/components/AddCerealForm/AddCerealForm';
import Button from '@/components/shared/Button.jsx/Button';
import Table from '@/components/Table/Table';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './HomePage.module.scss';
import { useState } from 'react';
import Takeover from '../shared/takeover/takeover';
import { airtableBase } from '@/utils/airtable-utils';
import { AIRTABLE_TABLES, AIRTABLE_TABLE_IDS } from '@/utils/constants';

export default function HomePage({ userCerealSelectionRecords }) {
  const [showAddCerealTakeover, setShowAddCerealTakeover] = useState(false);
  const [editScores, setEditScores] = useState(false);

  const handleSubmit = async () => {
    const res = await Promise.all(
      userCerealSelectionRecords.map(async selection => {
        const cerealNames = Object.keys(selection);
        const ratings = cerealNames.reduce((acc, curr) => {
          const rating = document.getElementById(
            `rating-${selection['User Name']}-${curr}`
          );
          if (
            curr !== 'Member Id' &&
            curr !== 'User Name' &&
            curr !== 'Record Id'
          ) {
            acc[curr] = parseFloat(rating?.value);
          }
          return acc;
        }, {});

        await airtableBase(AIRTABLE_TABLES.USER_CEREALS).update([
          {
            id: selection['Record Id'],
            fields: ratings,
          },
        ]);
        window.location.reload();
      })
    );
  };
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
        {!editScores ? (
          <Button
            isLight
            classNames={styles.button}
            handleClick={() => setEditScores(true)}
          >
            <FontAwesomeIcon icon={faEdit} />
            Edit Scores
          </Button>
        ) : (
          <Button isLight classNames={styles.button} handleClick={handleSubmit}>
            Submit
          </Button>
        )}
      </div>
      <Table
        userCerealSelectionRecords={userCerealSelectionRecords}
        editScores={editScores}
      />
    </div>
  );
}
