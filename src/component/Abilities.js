import React, { useState, useEffect } from "react";
import { List, Layout } from "antd";
import axios from "axios";

const Abilities = (api) => {
  const [state, setState] = useState({
    effect_entries:[]
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
        header={<div>Effect Entries</div>}
        bordered
        dataSource={state.effect_entries}
        renderItem={(item) => item.language.name == "en" ? <List.Item>{item.effect}</List.Item> : ''}
      />
    </Layout>
  );
};

export default Abilities;
