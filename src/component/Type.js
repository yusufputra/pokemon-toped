import React, { useState, useEffect } from "react";
import { List, Layout } from "antd";
import axios from "axios";

const Type = (api) => {
  const [state, setState] = useState({
    damage_relations: { double_damage_from: [], double_damage_to : [] },
  });
  useEffect(() => {
    axios.get(api.api).then((response) => {
      console.log(response);
      setState(response.data);
      console.log(state);
    });
  }, []);
  return (
    <Layout>
      <List
        header={<div>Double Demage From</div>}
        bordered
        dataSource={state.damage_relations.double_damage_from}
        renderItem={(item) => <List.Item>{item.name}</List.Item>}
      />
      <List
        header={<div>Double Demage To</div>}
        bordered
        dataSource={state.damage_relations.double_damage_to}
        renderItem={(item) => <List.Item>{item.name}</List.Item>}
      />
    </Layout>
  );
};

export default Type;
