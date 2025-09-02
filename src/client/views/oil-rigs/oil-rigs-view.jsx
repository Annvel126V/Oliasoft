import React, { useState } from "react";
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
import { useDelayedLoader } from "src/client/hooks/useDelayedLoader";
import {
  selectOilRigsList,
  selectOilRigsLoading,
} from "src/client/store/entities/oil-rigs/oil-rigs.selectors";

export const OilRigsView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const list = useSelector(selectOilRigsList);
  const loading = useSelector(selectOilRigsLoading);

  const [sortDesc, setSortDesc] = useState(false);

  const showSpinner = useDelayedLoader(loading, 300);

  const sorted = sortByName(list, "name");
  const finalList = sortDesc ? [...sorted].reverse() : sorted;

  return (
    <Card heading={<Heading>Oil Rigs</Heading>}>
      <div className={styles.container}>
        <Row>
          <Column width={220}>
            <div className={styles.buttonStack}>
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
                <ul className={styles.list}>
                  {finalList.map((rig) => (
                    <li key={rig.id} className={styles.item}>
                      <strong>{rig.name}</strong> ({rig.manufacturer})
                    </li>
                  ))}
                </ul>
              ) : (
                <em className={styles.muted}>None loaded</em>
              )}
            </div>
          </Column>
        </Row>
      </div>
    </Card>
  );
};
