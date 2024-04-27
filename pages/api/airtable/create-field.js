// Create Field API Ref: https://airtable.com/developers/web/api/create-field
// Fields Types API Ref: https://airtable.com/developers/web/api/field-model#decimalorintegernumber

export default async function handler(req, res) {
  const {
    body: { name, type, options, tableId },
  } = req;

  const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE;

  const data = {
    name: name,
    type,
    options,
    description: name,
  };

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/meta/bases/${baseId}/tables/${tableId}/fields`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
}
