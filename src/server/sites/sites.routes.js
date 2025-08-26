import SitesController from "./sites.controller";

export default (server) => {
  const sitesController = new SitesController();
  server.get("/api/sites", sitesController.getSites);
  server.post("/api/sites", sitesController.addSite);
  server.get("/api/sites/id/:id", sitesController.getSiteById);
  server.get("/api/sites/name/:name", sitesController.getSiteByName);
  server.put("/api/sites/:id", sitesController.updateSite);
  server.delete("/api/sites/:id", sitesController.deleteSite);
};
