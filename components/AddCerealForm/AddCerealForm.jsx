import Button from '@/components/shared/Button.jsx/Button';
import Input from '@/components/shared/input/input';
import {
  createField,
  getUserCerealSelectionIds,
  updateRecord,
} from '@/lib/airtable';
import { useEffect, useState } from 'react';
import styles from './AddCerealForm.module.scss';
import { AIRTABLE_TABLE_IDS } from '@/utils/constants';
import Loader from '../shared/loader/loader';
import clsx from 'clsx';
import Image from 'next/image';

export default function AddCerealForm() {
  const [cerealName, setCerealName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cerealResponse, setCerealResponse] = useState([]);

  useEffect(() => {
    const getNutrition = async () => {
      if (cerealName.length > 3) {
        try {
          const response = await fetch(
            `https://api.spoonacular.com/food/products/search?query=${cerealName} cereal`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.NEXT_PUBLIC_SPOONTACULAR_API_KEY,
              },
            }
          );
          const data = await response.json();
          setCerealResponse(data.products);
        } catch (error) {
          console.log(error.message);
        }
      }
    };
    getNutrition();
  }, [cerealName]);

  const handleSelect = async cerealSelection => {
    setIsLoading(true);
    await createField({
      name: cerealSelection,
      type: 'number',
      options: { precision: 2 },
      tableId: AIRTABLE_TABLE_IDS.USER_CEREALS,
    });
    const { userCerealSelectionIds } = await getUserCerealSelectionIds();

    // Set default values for the new cereal in every record, as 0
    const response = await Promise.all(
      userCerealSelectionIds.map(async ({ id }) => {
        await updateRecord({
          tableId: AIRTABLE_TABLE_IDS.USER_CEREALS,
          recordId: id,
          newFields: { [cerealSelection]: 0 },
        });
      })
    );
    window.location.reload();
  };

  return (
    <form
      action="#"
      className={clsx(styles.container, isLoading && styles.loading)}
    >
      {isLoading ? (
        <Loader color="black" />
      ) : (
        <>
          <Input
            value={cerealName}
            label="Add A New Cereal"
            handleChange={e => setCerealName(e.target.value)}
            inputContainerClassNames={styles.inputContainer}
            classNames={styles.input}
          />
          {cerealResponse?.length ? (
            <ul className={styles.list}>
              {cerealResponse.map(({ id, title, image }) => {
                return (
                  <li key={id} onClick={() => handleSelect(title)}>
                    {title}
                    {image && (
                      <Image src={image} className={styles.image} alt="" />
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            ''
          )}
        </>
      )}
    </form>
  );
}
