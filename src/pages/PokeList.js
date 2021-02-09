import React, { useState, useContext } from "react";
import { Skeleton, Card, Avatar, Typography, Layout } from "antd";
import { Link } from "react-router-dom";
import { PokeContext } from "../PokeContextProvider";
const { Meta } = Card;
const { Title } = Typography;
const { Content } = Layout;


const PokeList = () => {
  const { data } = useContext(PokeContext);
  console.log(data);
  const [loading, setLoading] = useState(false);
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
        <Title level={5}>Owned : 599 Pokemons</Title>
        {data != "undefined"
          ? data.pokemons.results.map((item) => (
              <Card style={{ width: "100%", marginTop: 16 }}>
                <Skeleton loading={data.pokemons.results.length == 0} avatar active>
                  <Meta
                    avatar={<Avatar src={item.image} />}
                    title={
                      <Link
                        to={{
                          pathname: "/pokeDetail/" + item.name,
                          state: { image: item.image },
                        }}
                      >
                        {item.name}
                      </Link>
                    }
                  />
                </Skeleton>
              </Card>
            ))
          : false}
      </Content>
    </Layout>
  );
};

export default PokeList;
