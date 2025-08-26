import React from "react";
import { Heading, Page } from "@oliasoft-open-source/react-ui-library";
import { Sites } from "client/components/sites/sites";
import styles from "./main.module.less";

export const Main = ({}) => {
  return (
    <Page left={0}>
      <div className={styles.heading}>
        <Heading top>Hiring Challenge</Heading>
      </div>
      <Sites />
    </Page>
  );
};
