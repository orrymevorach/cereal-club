import Button from '@/components/shared/Button/Button';
import Input from '@/components/shared/input/input';
import {
  createField,
  getUserCerealSelectionIds,
  updateRecord,
} from '@/lib/airtable';
import { useState } from 'react';
import styles from './AddCerealForm.module.scss';
import { AIRTABLE_TABLE_IDS } from '@/utils/constants';

export default function AddCerealForm() {
  const [cerealName, setCerealName] = useState('');

  const handleSubmitForm = async e => {
    e.preventDefault();
    await createField({
      name: cerealName,
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
          newFields: { [cerealName]: 0 },
        });
      })
    );
  };

  return (
    <form action="#" onSubmit={handleSubmitForm} className={styles.container}>
      <Input
        value={cerealName}
        label="Add A New Cereal"
        handleChange={e => setCerealName(e.target.value)}
        classNames={styles.input}
      />
      <Button isLight>Submit</Button>
    </form>
  );
}
