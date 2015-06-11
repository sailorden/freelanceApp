/**
* Accounting.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      label: {
          type: "string",
          required: true
      },
      type: {
          type: "string",
          enum: ['INCOME', 'EXPENSE'],
          required: true
      },
      value: {
          type: "float",
          required: true
      },
      // Relations
      project: {
          model: "project",
          required: true
      }
  }
};

