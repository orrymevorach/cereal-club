import { toCamelCase } from './string-utils';

import Airtable from 'airtable';

export const airtableBase = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_PAT,
}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE);

export const transformFields = ({ record }) => {
  let transformedFieldsObj = {};
  const entries = Object.entries(record.fields);
  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i];
    const transformedKey = toCamelCase(key);
    transformedFieldsObj[transformedKey] = value;
    transformedFieldsObj.id = record.id;
  }
  return transformedFieldsObj;
};

export const removeDuplicatesByProperty = ({ array, property }) => [
  ...new Map(array.map(m => [m[property], m])).values(),
];

const checkIfIsReferenceField = ({ fieldValue }) => {
  if (Array.isArray(fieldValue) && fieldValue.length > 0) {
    const firstItem = fieldValue[0];
    const isFirstItemString = typeof firstItem === 'string';
    const isReferenceField =
      isFirstItemString && firstItem.substring(0, 3) === 'rec';
    if (isReferenceField) return true;
  }
  return false;
};

const getReferenceFieldData = async ({ fieldValue, tableId }) => {
  return await Promise.all(
    fieldValue.map(referenceId => {
      return airtableBase(tableId).find(referenceId);
    })
  );
};

export const getRecordWithReferenceData = async ({ record, tableId }) => {
  const recordFields = transformFields({
    record,
  });
  for (const fieldName in recordFields) {
    const fieldValue = recordFields[fieldName];
    // Checking if the field value is an array with multiple itens
    const isReferenceField = checkIfIsReferenceField({ fieldValue });

    if (isReferenceField) {
      // Getting level 1 nested reference field data
      const referencedRecords = await getReferenceFieldData({
        fieldValue,
        tableId,
      });

      // Start of transforming fields + getting level 2 nested reference field data
      const transformedRecords = await Promise.all(
        referencedRecords.map(async record => {
          // Transforming fields
          const transformedFields = transformFields({ record });

          // Getting nested reference field data
          for (const nestedFieldName in transformedFields) {
            const nestedFieldValue = transformedFields[nestedFieldName];
            const isNestedReferenceField = checkIfIsReferenceField({
              fieldValue: nestedFieldValue,
            });
            if (isNestedReferenceField) {
              const nestedReferencedRecords = await getReferenceFieldData({
                fieldValue: nestedFieldValue,
                tableId,
              });
              const transformedNestedFields = nestedReferencedRecords.map(
                record => transformFields({ record })
              );
              transformedFields[nestedFieldName] = transformedNestedFields;
            }
          }
          return transformedFields;
        })
      );
      recordFields[fieldName] = transformedRecords;
    }
  }
  return recordFields;
};
