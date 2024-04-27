import { getTableData } from '@/lib/airtable';
import { AIRTABLE_TABLES } from '@/utils/constants';
import { camelToFlat } from '@/utils/string-utils';
import { useEffect, useState } from 'react';
import Loader from '../shared/loader/loader';
import styles from './Table.module.scss';

const filterNonCerealFields = cereals => {
  return Object.entries(cereals).filter(([key]) => {
    if (key === 'id' || key === 'memberId' || key === 'userName') {
      return false;
    }
    return true;
  });
};

export default function Table({ editScores = false }) {
  const [cerealSelections, setCerealSelections] = useState([]);

  useEffect(() => {
    const getAllUserCerealSelections = async () => {
      const userCereals = await getTableData({
        tableId: AIRTABLE_TABLES.USER_CEREALS,
      });
      setCerealSelections(userCereals);
    };
    getAllUserCerealSelections();
  }, []);

  const filteredCerealSelections = cerealSelections.length
    ? filterNonCerealFields(cerealSelections[0])
    : [];

  if (!cerealSelections.length) return <Loader />;
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
            {cerealSelections.map((currentSelectionFields, index) => {
              const filteredCurrentSelectionFields = filterNonCerealFields(
                currentSelectionFields
              );

              return (
                <tr key={currentSelectionFields.userName}>
                  <td className={styles.namesColumn}>
                    <p className={styles.number}>{index + 1} </p>
                    <p>{currentSelectionFields.userName}</p>
                  </td>
                  {filteredCurrentSelectionFields.map(
                    ([cerealName, cerealRating]) => {
                      return (
                        <td
                          key={`${currentSelectionFields.userName}-${cerealName}-${cerealRating}`}
                        >
                          {editScores ? (
                            <input
                              type="number"
                              defaultValue={parseInt(cerealRating)}
                              className={styles.input}
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
