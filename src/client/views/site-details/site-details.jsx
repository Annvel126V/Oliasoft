import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Page, Heading, Button, Spacer } from "@oliasoft-open-source/react-ui-library";

export const SiteDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <Page left={0}>
            <Heading top>Site Details</Heading>
            <p>id: {id}</p>
            <Spacer />
            <Button label="Back" onClick={() => navigate("/")} />
        </Page>
    )
}