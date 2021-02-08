import React, { useState } from "react";
import { Skeleton, Card, Avatar } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;

const PokeList = () => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Card style={{ width: "100%", marginTop: 16 }}>
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={<Link to="/pokeDetail">Brontosaurus</Link>}
            description="499 Owned"
          />
        </Skeleton>
      </Card>
    </>
  );
};

export default PokeList;
