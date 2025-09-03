import React, { useEffect } from "react";
import {
  Card,
  Heading,
  Button,
  Row,
  Column,
  Spacer,
} from "@oliasoft-open-source/react-ui-library";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sitesLoaded } from "store/entities/sites/sites";
import { sortByName } from "client/utils/sortByName";
import LoadingSpinner from "client/components/LoadingSpinner";
import styles from "./ChartView.module.less";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDelayedLoader } from "src/client/hooks/useDelayedLoader";
import {
  selectSitesList,
  selectSitesLoading,
} from "src/client/store/entities/sites/sites.selectors";

export const ChartView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sites = useSelector(selectSitesList);
  const loading = useSelector(selectSitesLoading);

  useEffect(() => {
    if (!sites.length) {
      dispatch(sitesLoaded());
    }
  }, [dispatch, sites.length]);

  const showSpinner = useDelayedLoader(loading, 300);

  const chartData = sortByName(sites, "name").map((site) => ({
    name: site.name,
    rigsCount: site.oilRigs?.length || 0,
  }));

  return (
    <Card heading={<Heading>Sites Chart</Heading>}>
      <Row>
        <Column width={220}>
          <div className={styles.buttonWrapper}>
            <Button label="Back" onClick={() => navigate("/")} />
          </div>
        </Column>
        <Column>
          {showSpinner ? (
            <LoadingSpinner />
          ) : chartData.length ? (
            <div
              style={{
                backgroundColor: "#f0f0f0",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="rigsCount" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <em>No sites loaded</em>
          )}
        </Column>
      </Row>
    </Card>
  );
};
