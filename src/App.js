import React from "react";
import { Switch, Link, Route } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import MyPoke from "./pages/MyPoke";
import PokeList from "./pages/PokeList";
import PokeDetail from "./pages/PokeDetail";
import NotFound from "./NotFound";
import { useState } from "react";
import { css } from "@emotion/css";
import "./App.css";

function App() {
  const [collapsed, setCollapsed] = useState(true);
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const { Header, Sider, Content } = Layout;

  return (
    <Layout>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="logo"/>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/">My Pokemon</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UnorderedListOutlined />}>
            <Link to="/pokeList">Pokemon List</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout
        className={css({
          height: "100vh",
          marginLeft: collapsed ? "80px" : "200px",
        })}
      >
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
        </Header>
        <Switch>
          <Route exact path={"/"} component={MyPoke} />
          <Route path={"/pokeDetail/:name"} component={PokeDetail} />
          <Route path={"/pokeList"} component={PokeList} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Layout>
  );
}

export default App;
