import { airtableBase, transformFields } from '@/utils/airtable-utils';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { tableId, recordId, newFields } = req.body;
    try {
      const response = await airtableBase(tableId).update([
        {
          id: recordId,
          fields: {
            ...newFields,
          },
        },
      ]);
      const transformedFields = transformFields({ record: response[0] });
      res.status(200).json({ response: transformedFields });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
