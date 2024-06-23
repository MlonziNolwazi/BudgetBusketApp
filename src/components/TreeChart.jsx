import { ResponsiveTree } from "@nivo/tree";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { TreeMockData as data } from "../data/treeMockData";

const MyResponsiveTree = () => (
  <ResponsiveTree
    data={data}
    identity="name"
    activeNodeSize={24}
    inactiveNodeSize={12}
    nodeColor={{ scheme: "tableau10" }}
    fixNodeColorAtDepth={1}
    linkThickness={2}
    activeLinkThickness={8}
    inactiveLinkThickness={2}
    linkColor={{
      from: "target.color",
      modifiers: [["opacity", 0.8]],
    }}
    margin={{ top: 90, right: 90, bottom: 90, left: 90 }}
    motionConfig="stiff"
    meshDetectionRadius={80}
  />
);

export default MyResponsiveTree;
