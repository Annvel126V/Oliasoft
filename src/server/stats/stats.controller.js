import { sites } from "../sites/sites.db";
import { oilRigs } from "../oil-rigs/oil-rigs.db";

export default class StatsController {
  constructor() {}

  getTotalSites = (req, res) => {
    res.json({ totalSites: sites.length });
  };

  getTotalOilRigs = (req, res) => {
    res.json({ totalOilRigs: oilRigs.length });
  };

  getNorwegianSites = (req, res) => {
    const norwegianSites = sites.filter((s) => s.country === "Norway").length;
    res.json({ norwegianSites });
  };

  getNorwegianOilRigs = (req, res) => {
    const norwegianSites = sites.filter((s) => s.country === "Norway");
    const rigs = norwegianSites.reduce(
      (acc, site) => acc + site.oilRigs.length,
      0
    );
    res.json({ norwegianOilRigs: rigs });
  };

  getSitesHistogram = (req, res) => {
    const histogram = {};
    sites.forEach((site) => {
      const firstChar = site.name[0].toUpperCase();
      histogram[firstChar] = (histogram[firstChar] || 0) + 1;
    });
    res.json({ histogram });
  };
}
