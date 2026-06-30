import React, { Suspense, useEffect, useState } from 'react';
import Menuitems from './MenuItems';
import { useLocation } from 'react-router';
import { Box, List } from '@mui/material';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';
import { useDispatch, useSelector } from 'react-redux';
import { ShowLoader } from '../../../redux/actions/loader';
import { useTheme } from '@emotion/react';

const SidebarItems = () => {
  const { pathname } = useLocation();
  const style = useTheme().palette.sidemenutext;
  const pathDirect = pathname;
  const dispatch = useDispatch();
  // const items= Menuitems();


  const makeseconds = Math.random();
  const Stringconvertion = makeseconds.toString();
  const zeroToOne = Stringconvertion.replace('0','1')

  const items = Menuitems();

  if (!items.length) {
    return null; // or loading skeleton
  }

  return (
    <Box pl={1} pr={2}>
      

      <List sx={{ pt: 0 }} className="sidebarNav">
        {items.map((item , ind) => {
          // {/********SubHeader**********/}
          if(item.item){
          if (item.subheader) {
            return <NavGroup item={item} key={ind}  />;

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else {
            if(item.href != undefined){
              return (
                  <NavItem item={item}  key={ind}  pathDirect={pathDirect} />
              );
            }
          }
        }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
