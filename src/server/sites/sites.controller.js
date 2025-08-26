import { error } from "ajv/dist/vocabularies/applicator/dependencies";
import { sites } from "./sites.db";

// this is our global "db"
let sitesList = sites.slice();

export default class EmployeesCSite {
  constructor() {}

  getSites = (req, res) => {
    res.json(sitesList);
  };

  addSite = (req, res) => {
    // TODO: Add to employee
    const site = req.body;
    sitesList.push(site);
    res.status(201).json(site);
  };

  getSiteById = (req, res) => {
    const { id } = req.params;
    const site = sitesList.find((s) => s.id === id);
    if (site) res.json(site);
    else res.status(404).send({ error: "Site not found" });
  };

  getSiteByName = (req, res) => {
    const { name } = req.params;
    const site = sitesList.find(
      (s) => s.name.toLowerCase() === name.toLowerCase()
    );
    if (site) res.json(site);
    else res.status(404).send({ error: "Site not found" });
  };

  updateSite = (req, res) => {
    const { id } = req.params;
    const index = sitesList.findIndex((s) => s.id === id);
    if (index !== -1) {
      sitesList[index] = { ...sitesList[index], ...req.body };
      res.json(sitesList[index]);
    } else {
      res.status(404).send({ error: "Site not found" });
    }
  };

  deleteSite = (req, res) => {
    const { id } = req.params;
    const index = sitesList.findIndex((s) => s.id === id);
    if (index !== -1) {
      const deleted = sitesList.splice(index, 1);
      res.json(deleted[0]);
    } else {
      res.status(404).send({ error: "Site not found" });
    }
  };
}
