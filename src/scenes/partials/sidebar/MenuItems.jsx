import { Fragment } from "react";
import { Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { Item, selectedItemIcon } from "../../global/MenuItemHelper";

function MenuItems({ title, items, selected, setSelected }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Fragment>
      <Typography
        variant="h6"
        color={colors.grey[300]}
        sx={{ m: "15px 0 5px 20px" }}
      >
        {title}
      </Typography>
      {items.map((item, i) => (
        <Item
          key={i}
          title={item.title}
          to={item.to}
          icon={selectedItemIcon(item.icon)}
          selected={selected}
          setSelected={setSelected}
        />
      ))}
    </Fragment>
  );
}

export default MenuItems;
