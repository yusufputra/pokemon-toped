import React, { useState } from "react";
import { Skeleton, Card, Avatar } from "antd";
import {
    LogoutOutlined,
} from "@ant-design/icons";
const { Meta } = Card;

const MyPoke = () => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Card
        style={{ width: "100%", marginTop: 16 }}
        actions={[
          <div><LogoutOutlined key="Delete" /> Release Pokemon</div>,
        ]}
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title="Card title"
            description="This is the description"
          />
        </Skeleton>
      </Card>
    </>
  );
};

export default MyPoke;
