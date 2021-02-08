import React, { useState } from "react";
import { Skeleton, Card, Avatar } from "antd";
import { LoginOutlined } from "@ant-design/icons";
const { Meta } = Card;
const PokeDetail = () => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Card
        style={{ width: "100%", marginTop: 16 }}
        actions={[<div><LoginOutlined key="Delete" /> Get Pokemon</div>]}
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={"Card title"}
            description="This is the description"
          />
        </Skeleton>
      </Card>
    </>
  );
};

export default PokeDetail;
