import { GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  WelcomePage,
  notificationProvider,
  Layout,
  ErrorComponent,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { PostList, PostShow, PostCreate, PostEdit } from "pages";
import { AntdInferencer } from "@refinedev/inferencer/antd";
function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <Refine
            notificationProvider={notificationProvider}
            routerProvider={routerBindings}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
            resources={[
              {
                name: "posts",
                list: PostList,
                show: PostShow,
                create: PostCreate,
                edit: PostEdit,
              },
            ]}
          >
            <Routes>
              <Route
                element={
                  <Layout>
                    <Outlet />
                  </Layout>
                }
              >
                <Route path="posts">
                  <Route index element={<AntdInferencer />} />
                  <Route path="show/:id" element={<AntdInferencer />} />
                  <Route path="edit/:id" element={<AntdInferencer />} />
                  <Route path="create" element={<AntdInferencer />} />
                </Route>
                <Route path="*" element={<ErrorComponent />} />
              </Route>
              <Route index element={<WelcomePage />} />
            </Routes>
            <RefineKbar />
            <UnsavedChangesNotifier />
          </Refine>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
