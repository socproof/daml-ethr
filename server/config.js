const Helper = require('./utils/helper');
const CONTACT_ADDRESS = '0xbd12278a065394531061d8f7FA90D94a56fc20C8';

module.exports = {
  CONTACT_ABI: Helper.getContractABI('Contacts'),
  CONTACT_ADDRESS,
};
