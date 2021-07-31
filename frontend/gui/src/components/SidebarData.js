// Author - bharath k (bharatk7@in.ibm.com)
import React from "react";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import { FiLink } from "react-icons/fi";
import { BiLogOut, BiDonateHeart } from "react-icons/bi";

export const SidebarData = [
  {
    title: "Account",
    path: "/account",
    icon: <IoIcons.IoMdPerson />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    id: "20",

    subNav: [
      {
        title: "Wallet",
        path: "/wallet",
        icon: <IoIcons.IoMdCash />,
      },
      {
        title: "Logout",
        path: "/logout",
        icon: <BiLogOut />,
      },
    ],
  },
  {
    title: "MarketPlace",
    path: "/shop",
    icon: <FaIcons.FaShoppingCart />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    id: "21",

    subNav: [
      {
        title: "Sell",
        path: "/sell/",
        icon: <IoIcons.IoMdArrowDropupCircle />,
        cName: "sub-nav",
      },
      {
        title: "Purchase",
        path: "/buy/",
        icon: <IoIcons.IoMdArrowDropdownCircle />,
        cName: "sub-nav",
      },
      // {
      //   title: "Helping Hand",
      //   path: "/help/",
      //   icon: <BiDonateHeart />,
      //   cName: "sub-nav",
      // },
    ],
  },

  {
    title: "Recommendation",
    path: "/recommend",
    icon: <FaIcons.FaChalkboardTeacher />,
    id: "22",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Agriculture",
        path: "/agri",
        icon: <IoIcons.IoIosGrid />,
      },
    ],
  },
  {
    title: "Helping Hand",
    path: "/helpinghand/",
    icon: <FaIcons.FaHandsHelping />,
    id: "23",
    cName: "sub-nav",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Opportunities",
        path: "/resource/",
        icon: <FiLink />,
        cName: "sub-nav",
      },
      {
        title: "Donate",
        path: "/help/",
        icon: <BiDonateHeart />,
      },
    ],
  },
  {
    title: "Weather Updates",
    path: "/weather",
    id: "24",
    icon: <IoIcons.IoMdRainy />,
  },
  {
    title: "Forum",
    id: "25",
    path: "/forum",
    icon: <IoIcons.IoIosChatboxes />,
  },
];
