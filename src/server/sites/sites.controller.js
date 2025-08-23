import {sites} from './sites.db';

// this is our global "db"
let sitesList = sites.slice();

export default class EmployeesCSite {
  constructor() {

  };

  getSites = (req, res) => {
    res.json(sitesList);
  };

  addSite = (req, res) => {
    // TODO: Add to employee
  };
};
