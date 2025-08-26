import StatsController from "./stats.controller";

export default (server) => {
  const statsController = new StatsController();

  server.get("/api/stats/sites/count", statsController.getTotalSites);
  server.get("/api/stats/oil-rigs/count", statsController.getTotalOilRigs);
  server.get("/api/stats/sites/norwegian", statsController.getNorwegianSites);
  server.get(
    "/api/stats/oil-rigs/norwegian",
    statsController.getNorwegianOilRigs
  );
  server.get("/api/stats/sites/histogram", statsController.getSitesHistogram);
};
