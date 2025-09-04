import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Heading,
  Button,
  Spacer,
} from "@oliasoft-open-source/react-ui-library";
import axios from "axios";
import { sortByName } from "src/client/utils/sortByName";
import LoadingSpinner from "src/client/components/LoadingSpinner";
import styles from "./site-details.module.less";
import { useDelayedLoader } from "src/client/hooks/useDelayedLoader";

export const SiteDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [site, setSite] = useState(null);
  const [oilRigs, setOilRigs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const showSpinner = useDelayedLoader(isLoading, 300);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const siteRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/sites`
        );
        const siteData = siteRes.data.find((s) => String(s.id) === String(id));
        setSite(siteData);

        if (siteData) {
          const rigsRes = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/oil-rigs`
          );
          const rigsMap = rigsRes.data.reduce((acc, rig) => {
            acc[rig.id] = {
              name: rig.name,
              manufacturer: rig.manufacturer,
            };
            return acc;
          }, {});
          setOilRigs(siteData.oilRigs.map((rigId) => rigsMap[rigId] || rigId));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (showSpinner) return <LoadingSpinner />;
  if (!site) return <em>Site not found</em>;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.headingWrapper}>
          <Heading>{site?.name}</Heading>
        </div>
        <p className={styles.country}>{`Country: ${site?.country}`}</p>
        <h4 className={styles.title}>Oil Rigs</h4>
        <div className={styles.listWrapper}>
          <ul>
            {sortByName(oilRigs).map((rig, i) => (
              <li key={rig.id}>
                {rig.name}, {rig.manufacturer}
              </li>
            ))}
          </ul>
        </div>
        <Spacer />
        <div className={styles.buttonWrapper}>
          <Button label="Back" onClick={() => navigate("/")} />
        </div>
      </div>
    </div>
  );
};
