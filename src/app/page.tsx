"use client";
import { GuildTechCore } from "@mirailabs-co/guild-tech";
import {
  Button,
  Descriptions,
  Input,
  Select, 
  Space,
  Table,
  Tabs
} from "antd";
import { useEffect, useState } from "react";
import HandleForm from "./_Form";
import TabChat from "./_TabChat";

export default function Home() {
  const accessToken = process.env.NEXT_PUBLIC_GUILD_TECH_ACCESS_TOKEN;

  const [guildTechCore, setGuildTechCore] = useState<any>(null);
  const [guildTechConnected, setGuildTechConnected] = useState<any>(null);
  const [guildTechLeaderBoards, setGuildTechLeaderBoards] = useState<any>(null);
  const [selectedLeaderBoard, setSelectedLeaderBoard] = useState<any>(null);
  const [listGuild, setListGuild] = useState<any>(null);
  const [myShares, setMyShares] = useState<any>(null);

  const [userOnlines, setUserOnlines] = useState<any>(null);

  const [handleFormVisible, setHandleFormVisible] = useState(false);

  const getGuilds = async () => {
    if (!guildTechConnected) {
      console.log("GuildTech not connected");
      return;
    }
    const guilds = await guildTechCore.getGuildScores({
      leaderBoardId: selectedLeaderBoard,
      page: 1,
      limit: 100,
      sort: "desc",
    });
    setListGuild(guilds.data);
  };

  useEffect(() => {
    if (selectedLeaderBoard) {
      getGuilds();
    }
  }, [selectedLeaderBoard]);

  const buySlot = async (guildAddress: string) => {
    const response = await guildTechCore.buySlot(guildAddress);
    await guildTechCore.getGuildOfUser();
  };

  const burnSlot = async (guildAddress: string) => {
    const response = await guildTechCore.burnSlot(guildAddress);
    await guildTechCore.getGuildOfUser();
  };

  const usersColumns = [
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "UserId",
      dataIndex: "userId",
      key: "userId",
    },
  ];

  const guildsColumns = [
    {
      title: "Rank",
      dataIndex: "guild",
      key: "rank",
      render: (guild: any, record: any, index: number) => {
        return guild?.metadata?.rank;
      },
    },
    {
      title: "Guild",
      dataIndex: "guild",
      key: "guild",
      render: (guild: any) => {
        return guild.name;
      },
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "Actions",
      dataIndex: "guild",
      key: "action",
      render: (guild: any) => {
        return <Button onClick={() => buySlot(guild.address)}>Buy Slot</Button>;
      },
    },
  ];

  const items = [
    {
      key: "1",
      label: "LeaderBoards",
      children: (
        <div>
          <Select
            style={{ width: "60%" }}
            placeholder="Select leader board"
            onChange={(value) => setSelectedLeaderBoard(value)}
          >
            {guildTechLeaderBoards?.map((leaderBoard: any) => {
              return (
                <Select.Option key={leaderBoard._id} value={leaderBoard._id}>
                  {leaderBoard.name}
                </Select.Option>
              );
            })}
          </Select>
          {listGuild && (
            <Table
              columns={guildsColumns}
              dataSource={listGuild}
              rowKey={(record) => record.guild._id}
              pagination={false}
            />
          )}
        </div>
      ),
    },
    {
      key: "2",
      label: "My Guild",
      children: guildTechCore?.userGuild && (
        <div>
          {guildTechCore.userGuild.name}
          <Descriptions
            title="Metadata"
            items={[
              {
                label: "avatar",
                children: guildTechCore.userGuild.metadata?.avatar,
              },
              {
                label: "description",
                children: guildTechCore.userGuild.metadata?.description,
              },
              {
                label: "level",
                children: guildTechCore.userGuild.metadata?.level,
              },
              {
                label: "rank",
                children: guildTechCore.userGuild.metadata?.rank,
              },
            ]}
          />
          <Table
            columns={usersColumns}
            dataSource={guildTechCore.userGuild?.users || []}
            rowKey={(record) => record._id}
            pagination={false}
          />
          <Space>
            <Space.Compact style={{ width: "100%" }}>
              <Input />
              <Button type="primary">Sell Slot</Button>
            </Space.Compact>
            <Button
              onClick={() => burnSlot(guildTechCore.userGuild.address)}
              danger
            >
              Burn Slot
            </Button>
          </Space>
        </div>
      ),
    },
    {
      key: "3",
      label: "Chats",
      children: (
        <div>
          {userOnlines?.length} user online
          <TabChat
            guildTechCore={guildTechCore}
          />
        </div>
      ),
    },
  ];

  const initGuildTechCore = async () => {
    const guildTech = await GuildTechCore.init({
      clientId: "ba96fac0-9896-4ffe-a881-49c512580b5a",
    });
    setGuildTechCore(guildTech);
  };

  useEffect(() => {
    initGuildTechCore();
  }, []);

  const connectGuildTech = async () => {
    const [core, guildTechConnection] = await guildTechCore.connect({
      accessToken,
    });
    setGuildTechConnected(guildTechConnection);
    await guildTechCore.getGuildOfUser();
    const data = await guildTechCore.getMyShares();
    setMyShares(data);

    const leaderBoards = await guildTechCore.getLeaderBoards();
    setGuildTechLeaderBoards(leaderBoards);
    setSelectedLeaderBoard(leaderBoards[0]._id);

    const userOnlines = await guildTechCore.getUserOnlineInGuild();
    setUserOnlines(userOnlines);
  };

  useEffect(() => {
    if (guildTechCore) {
      connectGuildTech();
    }
  }, [guildTechCore]);

  return (
    <main>
      <Button
        type="primary"
        onClick={() => setHandleFormVisible(true)}
        style={{ marginBottom: 20 }}
      >
        Add New Guild
      </Button>
      <Tabs defaultActiveKey="1" items={items} />
      <HandleForm
        openHandleForm={handleFormVisible}
        setOpenHandleForm={setHandleFormVisible}
        guildTechCore={guildTechCore}
      />
    </main>
  );
}
