import React, { useState, useEffect } from "react";
import {
  Card,
  Heading,
  Button,
  Row,
  Column,
  Spacer,
} from "@oliasoft-open-source/react-ui-library";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { oilRigsLoaded } from "store/entities/oil-rigs/oil-rigs";
import { sortByName } from "client/utils/sortByName";
import LoadingSpinner from "client/components/LoadingSpinner";
import styles from "./oil-rigs-view.module.less";

export const OilRigsView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const list = useSelector((state) => state.entities.oilRigs.list);
  const loading = useSelector((state) => state.entities.oilRigs.loading);

  const [sortDesc, setSortDesc] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    let timer;
    if (loading) setShowSpinner(true);
    else timer = setTimeout(() => setShowSpinner(false), 300);
    return () => clearTimeout(timer);
  }, [loading]);

  const sorted = sortByName(list, "name");
  const finalList = sortDesc ? [...sorted].reverse() : sorted;

  return (
    <Card heading={<Heading>Oil Rigs</Heading>}>
      <div className={styles.container}>
        <Row>
          <Column width={220}>
            <div className={styles.buttonWrapper}>
              <Button
                label="Load oil rigs"
                onClick={() => dispatch(oilRigsLoaded())}
                loading={loading}
                disabled={loading}
              />
              <Spacer />
              <Button
                label={sortDesc ? "Sort A-Z" : "Sort Z-A"}
                onClick={() => setSortDesc((prev) => !prev)}
              />
              <Spacer />
              <Button label="Back" onClick={() => navigate("/")} />
            </div>
          </Column>
          <Column>
            <div>
              {showSpinner ? (
                <LoadingSpinner />
              ) : finalList.length ? (
                <ul>
                  {finalList.map((rig) => (
                    <li key={rig.id}>
                      <strong>{rig.name}</strong> ({rig.manufacturer})
                    </li>
                  ))}
                </ul>
              ) : (
                <em>None loaded</em>
              )}
            </div>
          </Column>
        </Row>
      </div>
    </Card>
  );
};
