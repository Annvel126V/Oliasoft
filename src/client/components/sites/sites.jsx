import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import {
  Button,
  Card,
  Heading,
  Column,
  Row,
} from "@oliasoft-open-source/react-ui-library";
import { sitesLoaded } from "store/entities/sites/sites";
import styles from "./sites.module.less";
import { useNavigate } from "react-router-dom";
import { sortByName } from "src/client/utils/sortByName";
import LoadingSpinner from "../LoadingSpinner";
import axios from "axios";
import { useDelayedLoader } from "src/client/hooks/useDelayedLoader";

const Sites = ({ list, loading, sitesLoaded }) => {
  const navigate = useNavigate();
  const [rigsMap, setRigsMap] = useState({});
  const [sortDesc, setSortDesc] = useState(false);
  const [rigsLoading, setRigsLoading] = useState(true);

  const showSpinner = useDelayedLoader(loading, 300);

  useEffect(() => {
    const fetchRigs = async () => {
      try {
        setRigsLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/oil-rigs`
        );
        const map = res.data.reduce((acc, rig) => {
          acc[rig.id] = rig.name;
          return acc;
        }, {});
        setRigsMap(map);
      } catch (err) {
        console.error("Failed to load rigs", err);
      } finally {
        setRigsLoading(false);
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
              <div>
                <Button
                  label="Load sites"
                  onClick={sitesLoaded}
                  loading={loading}
                  disabled={loading}
                />
              </div>
              <div>
                <Button
                  label={sortDesc ? "Sort A-Z" : "Sort Z-A"}
                  onClick={() => setSortDesc((p) => !p)}
                />
              </div>
              <div>
                <Button
                  label="Go to Oil Rigs"
                  onClick={() => navigate("/oil-rigs")}
                />
              </div>
              <div>
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
            <div className={styles.table}>
              <div className={`${styles.row} ${styles.header}`}>
                <div className={styles.cell}>Name</div>
                <div className={styles.cell}>Country</div>
                <div className={styles.cell}>Oil rigs</div>
                <div className={`${styles.cell} ${styles.actions}`}>
                  Actions
                </div>
              </div>

              <ul className={styles.list} role="list">
                {finalList.map((site) => (
                  <li key={site.id} className={styles.row} role="listitem">
                    <div className={styles.cell} title={site.name}>
                      {site.name}
                    </div>
                    <div className={styles.cell} title={site.country}>
                      {site.country}
                    </div>
                    <div className={`${styles.cell} ${styles.rigsCell}`}>
                      {rigsLoading ? (
                        <span className={styles.muted}>Loading rigs…</span>
                      ) : site.oilRigsShort.length ? (
                        <div className={styles.rigsChips}>
                          {site.oilRigsShort.map((r) => (
                            <span key={r} className={styles.chip} title={r}>
                              {r}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className={styles.muted}>—</span>
                      )}
                    </div>
                    <div className={`${styles.cell} ${styles.actions}`}>
                      <Button
                        label="Details"
                        onClick={() => navigate(`/sites/${site.id}`)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <em className={styles.muted}>None loaded</em>
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
