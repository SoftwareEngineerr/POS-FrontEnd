import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import {
  ListItemIcon,
  ListItem,
  List,
  styled,
  ListItemText,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";

const NavItem = ({ item, level, pathDirect, onClick }) => {
  const Icon = item.icon;
  const theme = useTheme();

  const ListItemStyled = styled(ListItem)(({ theme }) => ({
    borderRadius: "12px",
    margin: "4px 8px",
    padding: "3px 2px",
    transition: "all 0.25s ease",
    cursor: "pointer",

    display: "flex",
    alignItems: "center",
    gap: "10px",

    color: theme.palette.text.secondary,

    // 🔥 HOVER
    "&:hover": {
      background: "rgba(25, 118, 210, 0.08)",
      transform: "translateX(6px)",
      color: theme.palette.primary.main,
    },

    // 🔥 ACTIVE
    "&.Mui-selected": {
      background: theme.palette.primary.main,
      color: "#fff",
      boxShadow: "0px 4px 12px rgba(25,118,210,0.3)",

      "& .MuiListItemIcon-root": {
        color: "#fff",
      },
    },
  }));

  return (
    <List component="li" disablePadding key={item.id}>
      
        <ListItemStyled
          component={item.external ? "a" : NavLink}
          to={item.href}
          href={item.external ? item.href : ""}
          selected={pathDirect === item.href}
          target={item.external ? "_blank" : ""}
          onClick={onClick}
        >
          {/* 🔥 ICON */}
          <ListItemIcon
            sx={{
              minWidth: "36px",
              color: "inherit",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              "& svg": {
                fontSize: "1.3rem",
                transition: "0.3s",
              },
              "&:hover svg": {
                transform: "scale(1.2) rotate(6deg)",
              },
            }}
          >
            <Icon />
          </ListItemIcon>

          {/* 🔥 TEXT */}
          <ListItemText
            primary={item.title}
            sx={{
              "& .MuiTypography-root": {
                fontSize: "0.95rem",
                fontWeight: 500,
              },
              display: (theme) =>
                theme.palette.sidemenutext.display.display,
            }}
          />
        </ListItemStyled>
    </List>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
  pathDirect: PropTypes.any,
};

export default NavItem;