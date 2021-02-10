import React, { useState } from "react";
import {
  Skeleton,
  Card,
  Avatar,
  Collapse,
  Typography,
  Layout,
  Modal,
  Input,
  message,
} from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { ToDos } from "../component/ToDos";
import axios from "axios";
import Type from "../component/Type";
import Abilities from "../component/Abilities";
import Moves from "../component/Moves";

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
  const confirm = (data) => {
    let nick = "";
    let avail = true;
    Modal.confirm({
      title: "Give Nickname",
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          Nickname :{" "}
          <Input
            onChange={(e) => {
              nick = e.target.value;
              JSON.parse(localStorage.owned).map((item) => {
                if (item.nickname == e.target.value) {
                  avail = false;
                }
              });
            }}
          />
        </div>
      ),
      okText: "Save",
      cancelText: "Release",
      onOk: () => {
        avail
          ? write({ name: data.name, image: data.image, nickname: nick })
          : message.error("Nickname already used");
      },
    });
  };
  const write = async (data) => {
    if (localStorage.owned == undefined) {
      message.success("Pokemon saved");
      localStorage.setItem("owned", JSON.stringify([data]));
      history.push("/");
    } else {
      message.success("Pokemon saved");
      let dataa = JSON.parse(localStorage.owned);
      dataa.push(data);
      localStorage.setItem("owned", JSON.stringify(dataa));
      history.push("/");
    }
  };
  const fetchData = (url) => {
    axios.get(url).then((result) => {
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
                  let prob = Math.random() * 100;
                  if (prob > 50) {
                    message.success("Got the pokemon");
                    confirm({
                      name: data.pokemon.name,
                      image: location.state.image,
                    });
                  } else {
                    message.error("Failed to catch Pokemon");
                  }
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
                  <Type api={item.type.url} />
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
                  <Abilities api={item.ability.url} />
                </Panel>
              ))
            : false}
        </Collapse>
        <Title level={5}>Moves</Title>
        <Collapse defaultActiveKey={["0"]}>
          {data != "undefined" && data != "Loading..."
            ? data.pokemon.moves.map((item, index) => (
                <Panel header={item.move.name} key={index}>
                  <Moves api={item.move.url} />
                </Panel>
              ))
            : false}
        </Collapse>
      </Content>
    </Layout>
  );
};

export default PokeDetail;
