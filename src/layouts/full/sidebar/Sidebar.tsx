import { useMediaQuery, Box, Drawer } from "@mui/material";
import { motion } from "framer-motion";
import SidebarItems from "./SidebarItems";
import { Upgrade } from "./Updrade";
import Logo from "../../../components/logo/logo";

const Sidebar = (props) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const sidebarWidth = 280;

  // 🔥 COMMON MODERN STYLE
  const paperStyle = (theme) => ({
    width: sidebarWidth,
    boxSizing: "border-box",

    // 💎 GLASS EFFECT
    background: "rgba(255,255,255,0.75)",
    backdropFilter: "blur(12px)",

    borderRight: "1px solid rgba(0,0,0,0.05)",

    // soft shadow
    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",

    overflow: "hidden",
  });

  // 🔥 SIDEBAR CONTENT
  const SidebarContent = () => (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 🔥 LOGO (STICKY TOP) */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          px: 2,
          py: 2,
          backdropFilter: "blur(10px)",
          background: "rgba(255,255,255,0.6)",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Logo width="140px" />
      </Box>

      {/* 🔥 MENU (SCROLLABLE) */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 1,
          py: 1,

          // smooth scrollbar
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(0,0,0,0.1)",
            borderRadius: "10px",
          },
        }}
      >
        <SidebarItems />
      </Box>

      {/* 🔥 UPGRADE (BOTTOM STICKY) */}
      <Box
        sx={{
          p: 2,
          borderTop: "1px solid rgba(0,0,0,0.05)",
          background: "rgba(255,255,255,0.6)",
        }}
      >
        <Upgrade />
      </Box>
    </Box>
  );

  // 🔥 DESKTOP
  if (lgUp) {
    return (
      <Box sx={{ width: sidebarWidth, flexShrink: 0 }}>
        <Drawer
          anchor="left"
          open={props.isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: paperStyle,
          }}
        >
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{ height: "100%" }}
          >
            <SidebarContent />
          </motion.div>
        </Drawer>
      </Box>
    );
  }

  // 🔥 MOBILE
  return (
    <Drawer
      anchor="left"
      open={props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: paperStyle,
      }}
    >
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        exit={{ x: -100 }}
        transition={{ duration: 0.3 }}
        style={{ height: "100%" }}
      >
        <SidebarContent />
      </motion.div>
    </Drawer>
  );
};

export default Sidebar;