import {
  getRecordWithReferenceData,
  airtableBase,
} from '@/utils/airtable-utils';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { recordId, tableId } = req.body;
    try {
      const record = await airtableBase(tableId).find(recordId);
      const recordWithReferenceData = await getRecordWithReferenceData({
        record,
        tableId,
      });

      res.status(200).json({ response: recordWithReferenceData });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
