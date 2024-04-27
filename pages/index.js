import HomePage from '@/components/HomePage/HomePage';
import Meta from '@/components/shared/head/head';
import { AIRTABLE_TABLES } from '@/utils/constants';
import Airtable from 'airtable';
import { useEffect } from 'react';

export default function Home({ userCerealSelectionRecords }) {
  useEffect(() => {
    const getNutrition = async () => {
      try {
        const nutrition = await fetch(
          'https://trackapi.nutritionix.com/v2/search/instant?query=hamburger',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-app-id': `d2fa8d42`,
              'x-app-key': `${process.env.NEXT_PUBLIC_NUTRITIONIX_API_KEY}`,
            },
          }
        );

        console.log('nutrition', nutrition);
      } catch (error) {
        console.log(error.message);
      }
    };
    getNutrition();
  });
  return (
    <>
      <Meta />
      <HomePage userCerealSelectionRecords={userCerealSelectionRecords} />
    </>
  );
}

export async function getStaticProps() {
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
