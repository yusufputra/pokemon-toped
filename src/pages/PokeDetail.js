import React, { useState } from "react";
import { Skeleton, Card, Avatar, Collapse, Typography, Layout } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { ToDos } from "../component/ToDos";
import axios from "axios";

const { Meta } = Card;
const { Panel } = Collapse;
const { Title } = Typography;
const { Content } = Layout;
const GET_POKEMON = gql`
  # Write your query or mutation here
  query pokemons($name: String!) {
    pokemon(name: $name) {
      abilities {
        ability {
          url
          name
        }
        slot
      }
      name
      moves {
        move {
          url
          name
        }
      }
      types {
        type {
          url
          name
        }
      }
    }
  }
`;
const PokeDetail = () => {
  const history = useHistory();
  const { name } = useParams();
  const location = useLocation();
  const data = ToDos(GET_POKEMON, { name: name });
  const write = async (data) => {
    console.log(data);
    if (localStorage.owned == undefined) {
      localStorage.setItem("owned", JSON.stringify([data]));
      history.push("/");
    } else {
      let dataa = JSON.parse(localStorage.owned);
      dataa.push(data);
      localStorage.setItem("owned", JSON.stringify(dataa));
      console.log(dataa);
      history.push("/");
    }
  };
  const fetchData = (url) => {
    axios.get(url).then((result) => {
      console.log(result);
    });
  };
  fetchData("https://pokeapi.co/api/v2/type/12/");
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
        {data != "undefined" ? (
          <Card
            style={{ width: "100%", marginTop: 16 }}
            actions={[
              <div
                onClick={() => {
                  write({
                    name: data.pokemon.name,
                    image: location.state.image,
                  });
                }}
              >
                <LoginOutlined key="getpokemon" /> Get Pokemon
              </div>,
            ]}
          >
            <Skeleton loading={data.pokemon.name == null} avatar active>
              <Meta
                avatar={<Avatar src={location.state.image} />}
                title={data.pokemon.name}
              />
            </Skeleton>
          </Card>
        ) : (
          false
        )}
        <Title level={5}>Types</Title>
        <Collapse defaultActiveKey={["0"]}>
          {data != "undefined" && data != "Loading..."
            ? data.pokemon.types.map((item, index) => (
                <Panel header={item.type.name} key={index}>
                  <p>{item.type.url}</p>
                </Panel>
              ))
            : false}
        </Collapse>
        <Title level={5}>Abilities</Title>
        <Collapse defaultActiveKey={["0"]}>
          {data != "undefined" && data != "Loading..."
            ? data.pokemon.abilities.map((item, index) => (
                <Panel
                  header={item.ability.name + ` (${item.slot} Slot)`}
                  key={index}
                >
                  <p>{item.ability.url}</p>
                </Panel>
              ))
            : false}
        </Collapse>
        <Title level={5}>Moves</Title>
        <Collapse defaultActiveKey={["0"]}>
          {data != "undefined" && data != "Loading..."
            ? data.pokemon.abilities.map((item, index) => (
                <Panel
                  header={item.ability.name + ` (${item.slot} Slot)`}
                  key={index}
                >
                  <p>{item.ability.url}</p>
                </Panel>
              ))
            : false}
        </Collapse>
      </Content>
    </Layout>
  );
};

export default PokeDetail;
