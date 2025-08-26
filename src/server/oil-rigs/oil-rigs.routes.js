import OilRigsController from "./oil-rigs.controller";

export default (server) => {
  const oilRigsController = new OilRigsController();
  server.get("/api/oil-rigs", oilRigsController.getOilRigs);
  server.post("/api/oil-rigs", oilRigsController.addOilRig);
  server.get("/api/oil-rigs/id/:id", oilRigsController.getOilRigById);
  server.get("/api/oil-rigs/name/:name", oilRigsController.getOilRigByName);
  server.put("/api/oil-rigs/:id", oilRigsController.updateOilRig);
  server.delete("/api/oil-rigs/:id", oilRigsController.deleteOilRig);
};
