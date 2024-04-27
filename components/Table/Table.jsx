import { camelToFlat } from '@/utils/string-utils';
import Loader from '../shared/loader/loader';
import styles from './Table.module.scss';

const filterNonCerealFields = cereals => {
  return Object.entries(cereals).filter(([key]) => {
    if (key === 'Member Id' || key === 'User Name' || key === 'Record Id') {
      return false;
    }
    return true;
  });
};

export default function Table({
  userCerealSelectionRecords = [],
  editScores = false,
}) {
  const filteredCerealSelections = userCerealSelectionRecords.length
    ? filterNonCerealFields(userCerealSelectionRecords[0])
    : [];

  if (!userCerealSelectionRecords.length) return <Loader />;

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.titleRow}>
              <td></td>
              {filteredCerealSelections.map(([cerealName]) => {
                return <td key={cerealName}>{camelToFlat(cerealName)}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {userCerealSelectionRecords.map((currentSelectionFields, index) => {
              const filteredCurrentSelectionFields = filterNonCerealFields(
                currentSelectionFields
              );

              return (
                <tr key={currentSelectionFields['User Name']}>
                  <td className={styles.namesColumn}>
                    <p className={styles.number}>{index + 1} </p>
                    <p>{currentSelectionFields['User Name']}</p>
                  </td>
                  {filteredCurrentSelectionFields.map(
                    ([cerealName, cerealRating]) => {
                      return (
                        <td
                          key={`${currentSelectionFields['User Name']}-${cerealName}-${cerealRating}`}
                        >
                          {editScores ? (
                            <input
                              type="number"
                              defaultValue={parseFloat(cerealRating)}
                              className={styles.input}
                              id={`rating-${currentSelectionFields['User Name']}-${cerealName}`}
                            />
                          ) : (
                            <p>{cerealRating}</p>
                          )}
                        </td>
                      );
                    }
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
