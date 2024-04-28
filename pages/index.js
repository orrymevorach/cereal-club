import HomePage from '@/components/HomePage/HomePage';
import Meta from '@/components/shared/head/head';
import { AIRTABLE_TABLES } from '@/utils/constants';
import Airtable from 'airtable';

export default function Home({ userCerealSelectionRecords }) {
  return (
    <>
      <Meta />
      <HomePage userCerealSelectionRecords={userCerealSelectionRecords} />
    </>
  );
}

export async function getServerSideProps() {
  const airtableBase = new Airtable({
    apiKey: process.env.NEXT_PUBLIC_AIRTABLE_PAT,
  }).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE);

  const userCerealSelectionRecords = await airtableBase
    .table(AIRTABLE_TABLES.USER_CEREALS)
    .select()
    .all();

  const fields = userCerealSelectionRecords.map(record => record.fields);

  return {
    props: {
      userCerealSelectionRecords: fields,
    },
  };
}
