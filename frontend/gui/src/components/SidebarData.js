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
    icon: <IoIcons.IoMdRainy />,
  },
  {
    title: "Forum",
    path: "/forum",
    icon: <IoIcons.IoIosChatboxes />,
  },
];
