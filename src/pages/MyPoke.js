import React, { useState } from "react";
import { Skeleton, Card, Avatar, Layout } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
const { Meta } = Card;
const { Content } = Layout;
const MyPoke = () => {
  const [pokemon, setPokemon] = useState(JSON.parse(localStorage.owned));
  const deletePoke = (pokes) => {
    let poke = JSON.parse(localStorage.owned).filter(
      (item) => item.name != pokes
    );
    localStorage.setItem("owned", JSON.stringify(poke));
    setPokemon(poke);
  };

  return (
    <Layout>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: "min-content",
          marginBottom: 64,
        }}
      >
        {pokemon != undefined
          ? pokemon.map((item) => (
              <Card
                style={{ width: "100%", marginTop: 16 }}
                actions={[
                  <div
                    onClick={() => {
                      deletePoke(item.name);
                    }}
                  >
                    <LogoutOutlined key="Delete" /> Release Pokemon
                  </div>,
                ]}
              >
                <Skeleton
                  loading={localStorage.owned == undefined}
                  avatar
                  active
                >
                  <Meta
                    avatar={<Avatar src={item.image} />}
                    title={item.name}
                  />
                </Skeleton>
              </Card>
            ))
          : "tidak ada pokemon"}
      </Content>
    </Layout>
  );
};

export default MyPoke;
