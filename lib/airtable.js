import { client } from 'graphql/airtable/apollo-config';
import { GET_USER_CEREAL_SELECTIONS } from 'graphql/airtable/queries';

export const getUserCerealSelectionIds = async () => {
  try {
    const { data } = await client.query({
      query: GET_USER_CEREAL_SELECTIONS,
      fetchPolicy: 'no-cache',
    });
    const userCerealSelectionIds = data.userCereals;
    return { userCerealSelectionIds };
  } catch (error) {
    console.log(error);
  }
};

export const createField = async ({ name, type, options, tableId }) => {
  const res = await fetch('/api/airtable/create-field', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, type, options, tableId }),
  }).then(res => res.json());
  return res;
};

export const getTableData = async ({ tableId, queryName }) => {
  const { response } = await fetch(`/api/airtable/get-table?${queryName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tableId,
    }),
  }).then(res => res.json());
  return response;
};

// export const getRecordById = async ({ tableId, recordId, queryName }) => {
//   try {
//     const { response } = await fetch(
//       `/api/airtable/get-record-by-id?${queryName}`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ tableId, recordId }),
//       }
//     ).then(res => res.json());
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const updateRecord = async ({ tableId, recordId, newFields }) => {
  try {
    const { response } = await fetch('/api/airtable/update-record', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tableId, recordId, newFields }),
    }).then(res => res.json());
    return response;
  } catch (error) {
    console.log(error);
  }
};
