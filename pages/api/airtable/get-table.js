import {
  airtableBase,
  getRecordWithReferenceData,
} from '@/utils/airtable-utils';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { tableId } = req.body;
    try {
      await airtableBase(tableId)
        .select()
        .eachPage(async function page(records, fetchNextPage) {
          const allRecords = await Promise.all(
            records.map(async record => {
              // Transforming keys to snake case
              const recordWithReferenceFields =
                await getRecordWithReferenceData({ record, tableId });
              return recordWithReferenceFields;
            }, [])
          );
          res.status(200).json({ response: allRecords });
        });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
