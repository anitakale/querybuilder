/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import React, { useEffect } from "react";
import { FrontstageManager } from "@itwin/appui-react";
import { Viewer, ViewerViewportControlOptions } from "@itwin/web-viewer-react";
import { authClient } from "./common/AuthorizationClient";
import { default3DSandboxUi } from "./common/DefaultViewerProps";
import { mapLayerOptions } from "./common/MapLayerOptions";
import { VolumeQueryApi } from "./VolumeQueryApi";
import { VolumeQueryWidgetProvider } from "./VolumeQueryWidget";

const uiProviders = [new VolumeQueryWidgetProvider()];
const viewportOptions: ViewerViewportControlOptions = {
  viewState: async (iModelConnection) => VolumeQueryApi.getIsoView(iModelConnection),
};

const iTwinId = process.env.IMJS_ITWIN_ID;
const iModelId = process.env.IMJS_IMODEL_ID;

const VolumeQueryApp = () => {
  /** Sign-in */
  useEffect(() => {
    void authClient.signIn();
  }, []);

  /** The sample's render method */
  return <Viewer
    iTwinId={iTwinId}
    iModelId={iModelId}
    authClient={authClient}
    enablePerformanceMonitors={true}
    viewportOptions={viewportOptions}
    mapLayerOptions={mapLayerOptions}
    defaultUiConfig={default3DSandboxUi}
    uiProviders={uiProviders}
    theme="dark"
  />;
};

// Define panel size
FrontstageManager.onFrontstageReadyEvent.addListener((event) => {
  const { bottomPanel } = event.frontstageDef;
  bottomPanel && (bottomPanel.size = 315);
});

export default VolumeQueryApp;
