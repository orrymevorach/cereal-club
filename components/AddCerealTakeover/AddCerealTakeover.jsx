import AddCerealForm from '../AddCerealForm/AddCerealForm';
import Takeover from '../shared/Takeover-v1/Takeover-v1';
import styles from './AddCerealTakeover.module.scss';

export default function AddCerealTakeover({ setShowAddCerealTakeover }) {
  return (
    <Takeover
      handleClose={() => setShowAddCerealTakeover(false)}
      modalClassNames={styles.takeover}
    >
      <AddCerealForm />
    </Takeover>
  );
}
