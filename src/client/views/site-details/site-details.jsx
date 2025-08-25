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

export const SiteDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [site, setSite] = useState(null);
  const [oilRigs, setOilRigs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const MIN_LOADER_TIME = 300;
    const startTime = Date.now();

    const fetchData = async () => {
      try {
        const siteRes = await axios.get(`http://localhost:3000/api/sites`);
        const siteData = siteRes.data.find((s) => s.id === id);
        setSite(siteData);

        if (siteData) {
          const rigsRes = await axios.get("http://localhost:3000/api/oil-rigs");
          const rigsMap = rigsRes.data.reduce((acc, rig) => {
            acc[rig.id] = rig.name;
            return acc;
          }, {});
          setOilRigs(siteData.oilRigs.map((rigId) => rigsMap[rigId] || rigId));
        }
      } catch (error) {
        console.error(error);
      } finally {
        const elapsed = Date.now() - startTime;
        const remaining = MIN_LOADER_TIME - elapsed;
        setTimeout(() => setIsLoading(false), remaining > 0 ? remaining : 0);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) return <LoadingSpinner />;
  if (!site) return <em>Site not found</em>;

  return (
    <div className={styles.container}>
      <div className={styles.headingWrapper}>
        <Heading>{site?.name}</Heading>
      </div>

      <p className={styles.country}>{`Country: ${site?.country}`}</p>

      <h4 className={styles.title}>Oil Rigs</h4>

      <div className={styles.listWrapper}>
        <ul>
          {sortByName(oilRigs).map((rigName, index) => (
            <li key={index}>{rigName}</li>
          ))}
        </ul>
      </div>

      <Spacer />

      <div className={styles.buttonWrapper}>
        <Button label="Back" onClick={() => navigate("/")} />
      </div>
    </div>
  );
};
