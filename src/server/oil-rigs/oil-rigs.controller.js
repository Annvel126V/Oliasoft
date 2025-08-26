import { error } from "ajv/dist/vocabularies/applicator/dependencies";
import { oilRigs } from "./oil-rigs.db";

// this is our global "db"
let oilRigsList = oilRigs.slice();

export default class EmployeesController {
  constructor() {}

  getOilRigs = (req, res) => {
    res.json(oilRigsList);
  };

  addOilRig = (req, res) => {
    // TODO: Add to employee
    const rig = req.body;
    oilRigs.push(rig);
    res.status(201).json(rig);
  };

  getOilRigById = (req, res) => {
    const { id } = req.params;
    const rig = oilRigs.find((r) => r.id === id);
    if (rig) res.json(rig);
    else res.status(404).send({ error: "Oil rig not found" });
  };

  getOilRigByName = (req, res) => {
    const { name } = req.params;
    const rig = oilRigs.find(
      (r) => r.name.toLowerCase() === name.toLowerCase()
    );
    if (rig) res.json(rig);
    else res.status(404).send({ error: "Oil rig not found" });
  };

  updateOilRig = (req, res) => {
    const { id } = req.params;
    const index = oilRigs.findIndex((r) => r.id === id);
    if (index !== -1) {
      oilRigs[index] = { ...oilRigs[index], ...req.body };
      res.json(oilRigs[index]);
    } else {
      res.status(404).send({ error: "Oil rig not found" });
    }
  };

  deleteOilRig = (req, res) => {
    const { id } = req.params;
    const index = oilRigs.findIndex((r) => r.id === id);
    if (index !== -1) {
      const deleted = oilRigs.splice(index, 1);
      res.json(deleted[0]);
    } else {
      res.status(404).send({ error: "Oil rig not found" });
    }
  };
}
