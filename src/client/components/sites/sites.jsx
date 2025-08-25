import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Card,
  Heading,
  Column,
  Row,
  Spacer,
} from "@oliasoft-open-source/react-ui-library";
import { sitesLoaded } from "store/entities/sites/sites";
import styles from "./sites.module.less";
import { Link, useNavigate } from "react-router-dom";
import { sortByName } from "src/client/utils/sortByName";
import LoadingSpinner from "../LoadingSpinner";
import axios from "axios";

const Sites = ({ list, loading, sitesLoaded }) => {
  const navigate = useNavigate();
  const [showSpinner, setShowSpinner] = useState(false);
  const [rigsMap, setRigsMap] = useState({});
  const [sortDesc, setSortDesc] = useState(false);

  useEffect(() => {
    let timer;
    if (loading) setShowSpinner(true);
    else timer = setTimeout(() => setShowSpinner(false), 300);
    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    const fetchRigs = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/oil-rigs");
        const map = res.data.reduce((acc, rig) => {
          acc[rig.id] = rig.name;
          return acc;
        }, {});
        setRigsMap(map);
      } catch (err) {
        console.error("Failed to load rigs", err);
      }
    };
    fetchRigs();
  }, []);

  const getRigNamesShort = (rigIds) => {
    if (!rigIds || !rigIds.length) return ["—"];
    const names = rigIds.map((id) => rigsMap[id] || id);
    return [...new Set(names)];
  };

  const sitesWithShortRigs = list.map((site) => ({
    ...site,
    oilRigsShort: getRigNamesShort(site.oilRigs),
  }));

  const sorted = sortByName(sitesWithShortRigs, "name");
  const finalList = sortDesc ? [...sorted].reverse() : sorted;

  return (
    <Card heading={<Heading>List of oil sites</Heading>}>
      <Row>
        <Column width={200}>
          <div>
            <div className={styles.buttonStack}>
              <div className={styles.buttonWrapper}>
                <Button
                  label="Load sites"
                  onClick={sitesLoaded}
                  loading={loading}
                  disabled={loading}
                />
              </div>
              <div className={styles.buttonWrapper}>
                <Button
                  label={sortDesc ? "Sort A-Z" : "Sort Z-A"}
                  onClick={() => setSortDesc((p) => !p)}
                />
              </div>
              <div className={styles.buttonWrapper}>
                <Button
                  label="Go to Oil Rigs"
                  onClick={() => navigate("/oil-rigs")}
                />
              </div>
              <div className={styles.buttonWrapper}>
                <Button
                  label="Go to Chart"
                  onClick={() => navigate("/chart")}
                />
              </div>
            </div>
          </div>
        </Column>
        <Column>
          {showSpinner ? (
            <LoadingSpinner />
          ) : finalList.length ? (
            <ul className={styles.sitesList}>
              {finalList.map((site) => (
                <li key={site.id} className={styles.siteItem}>
                  <div className={`${styles.col} ${styles.siteText}`}>
                    {site.name}
                  </div>
                  <div className={`${styles.col} ${styles.siteText}`}>
                    {site.country}
                  </div>
                  <div className={`${styles.col} ${styles.siteText}`}>
                    {site.oilRigsShort[0] || "—"}
                  </div>
                  <div className={styles.buttonWrapper}>
                    <Button
                      label="Details"
                      onClick={() => navigate(`/sites/${site.id}`)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <em>None loaded</em>
          )}
        </Column>
      </Row>
    </Card>
  );
};

const mapStateToProps = ({ entities }) => {
  const { sites } = entities;
  return {
    loading: sites.loading,
    list: sites.list,
  };
};

const mapDispatchToProps = { sitesLoaded };

const ConnectedSites = connect(mapStateToProps, mapDispatchToProps)(Sites);

export { ConnectedSites as Sites };
