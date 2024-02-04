"use client";
import { GuildTechCore } from "@mirailabs-co/guild-tech";
import { Button, Descriptions, Input, Select, Space, Table, Tabs } from "antd";
import { useEffect, useState } from "react";
import HandleForm from "./_Form";

const accessToken =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJiYTk2ZmFjMC05ODk2LTRmZmUtYTg4MS00OWM1MTI1ODBiNWEiLCJqdGkiOiJiMTE2MTk2My1jMzJhLTQ5MDQtYTFjMi0zNGVkYjY2NjI3OTMiLCJleHAiOjE3MDcxMjk3NDIsInN1YiI6IjE3NTM1MTMzLThjODItNDJmMy1iYmQ1LTUyY2UxNDZiZGQwYiIsInNjb3BlcyI6WyJvcGVuaWQiLCJlbWFpbCIsIm9mZmxpbmVfYWNjZXNzIiwicHJvZmlsZSJdLCJlbWFpbCI6Im5ndXllbnR1dS5ia0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik5ndXllbiBUdXUiLCJnaXZlbl9uYW1lIjoiTmd1eWVuIiwiZmFtaWx5X25hbWUiOiJUdXUiLCJpc3MiOiJodHRwczovL2lkLWRldi12Mi5taXJhaWxhYnMuY28iLCJhenAiOiJiYTk2ZmFjMC05ODk2LTRmZmUtYTg4MS00OWM1MTI1ODBiNWEiLCJpYXQiOjE3MDcwNDMzNDJ9.SFkiCe1OM89HNRBGNXRecosGhgemcHL0t8Qye9qwRlv6SEYvI5A7qLUMxknd4rimjTDekHEKge58GbUFAa869lNK6URAEbVZTJSvPgxi1fWDPHTbVLPb0iLnKsPcwocuxyu8bMb5ron0npb3n0FNeNvYfv04nT1Yl7bzDsBG-KFTmG0sRY3aDLCH43dU2w7sbZKwryPtAuNl2-uqNuDxnAsSQYUfcDQh9fwNUHnuF-WpDnhizsQBDU85W1Y3dDUZ_9Y0Bv2y8OnAF5fz0GDuZr_41-WFL3rlfd3CKDofH1Ja0lLT_bVuwzmZsSF4ap57LpD1PclreyLYUK84oMqC2am0Tz7wcCayyahsduAwOvaIubH6nb6nEB3Sfy6B9an7fVypsmFp4Wm48vPMFz4m6nMmYpoNbqhg014y0EOUtCKbCtcMJ136E-to7zYqsPeeXrnT1tG06s2SaDw6QzcZhU1BdkrEatpybK9hoDUv1AbMFTpNufUYJ03x3dF4NghOZn1pExOzymNaogUJM9-ynvY_Tm_b4lubE17qojg5YdClUuNaZj_MW6vEiwA-aouJOP7zWSGp122TmgVPT4z7DfuqmBhW2BVhIFZsXqcPU4y6lw5OFjuXJ4OvB-MCp_0-vXq_DhBUrjkMJItFxt1EYDlkKOEmmnlOE1TJK48YCug";

export default function Home() {
  const [guildTechCore, setGuildTechCore] = useState<any>(null);
  const [guildTechConnected, setGuildTechConnected] = useState<any>(null);
  const [guildTechLeaderBoards, setGuildTechLeaderBoards] = useState<any>(null);
  const [selectedLeaderBoard, setSelectedLeaderBoard] = useState<any>(null);
  const [listGuild, setListGuild] = useState<any>(null);
  const [myShares, setMyShares] = useState<any>(null);

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
