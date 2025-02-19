import React from "react";
import {
  FaUsers,
  FaCircle,
  FaShoppingCart,
  FaProductHunt,
  FaList,
  FaCriticalRole,
  FaPeopleArrows,
  FaFileInvoice,
  FaCartArrowDown,
  FaBusinessTime,
  FaTruck,
  FaRunning,
  FaFileInvoiceDollar,
  FaFile,
  FaDollarSign,
  FaBook,
  FaFileSignature,
  FaWarehouse,
  FaRegListAlt,
  FaBookDead,
  FaListAlt,
  FaCalculator,
  FaLaptopHouse,
  FaShip,
} from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { SiContactlesspayment } from "react-icons/si";
import { GiNotebook } from "react-icons/gi";
import { MdAccountBalance } from "react-icons/md";
import { HiCurrencyRupee } from "react-icons/hi";
import { BiRupee } from "react-icons/bi";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import { RiMoneyPoundCircleLine } from "react-icons/ri";
import { TbZoomMoney } from "react-icons/tb";
import { MdShoppingBag } from "react-icons/md";
import { GiHumanPyramid } from "react-icons/gi";
import { FaAddressCard } from "react-icons/fa";
import { GiGrowth } from "react-icons/gi";
import { MdDownloadDone } from "react-icons/md";
import { SiGotomeeting } from "react-icons/si";
import { TbFileTime } from "react-icons/tb";
import { MdPresentToAll } from "react-icons/md";
import { MdAddBusiness } from "react-icons/md";
import { SiManageiq } from "react-icons/si";
import { GiRingmaster } from "react-icons/gi";
import { GrIndicator } from "react-icons/gr";
import { GiReceiveMoney } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";
import { GiBassetHoundHead } from "react-icons/gi";
import { GiScrollUnfurled } from "react-icons/gi";
import { MdOutlineReceiptLong } from "react-icons/md";
import { MdAppRegistration } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { TfiAnnouncement } from "react-icons/tfi";
import { FiRepeat } from "react-icons/fi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { IoWarning } from "react-icons/io5";
import { GiMoneyStack } from "react-icons/gi";
import { FcRules } from "react-icons/fc";
import { GiUpgrade } from "react-icons/gi";
import { RiStockFill } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { GoEyeClosed } from "react-icons/go";
import { IoTrendingDown } from "react-icons/io5";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { TbBuildingWarehouse } from "react-icons/tb";
import { RiFileDamageLine } from "react-icons/ri";

import { GiTakeMyMoney } from "react-icons/gi";
import { BsAppIndicator } from "react-icons/bs";
import { GrDocumentPerformance } from "react-icons/gr";
import { GrDocumentTime } from "react-icons/gr";
import { MdOutlineModelTraining } from "react-icons/md";
import { RiPagesLine } from "react-icons/ri";
import { GiTemptation } from "react-icons/gi";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { HiUserGroup } from "react-icons/hi";

import { GiSkills } from "react-icons/gi";
import { GiDamagedHouse } from "react-icons/gi";
import { AiOutlineStock } from "react-icons/ai";
import { RiPsychotherapyFill } from "react-icons/ri";
import { GiNuclearWaste } from "react-icons/gi";
import { SiBookstack } from "react-icons/si";

import { BsFillCartXFill, BsMinecart } from "react-icons/bs";

import {
  MdInventory2,
  MdChecklist,
  MdOutlineProductionQuantityLimits,
  MdOutlineTransform,
  MdOutlineStorage,
  MdOutlineSettings,
} from "react-icons/md";
import { RiFileDamageFill } from "react-icons/ri";

import { BsCart4 } from "react-icons/bs";

import { RiTeamLine } from "react-icons/ri";
import { GiHumanTarget } from "react-icons/gi";
import { GiCash } from "react-icons/gi";

import { AiOutlineTransaction } from "react-icons/ai";
import { IoReceiptOutline } from "react-icons/io5";

import { IoMdCloudDone } from "react-icons/io";
import { TbTruckReturn } from "react-icons/tb";
import { GrNotes } from "react-icons/gr";
import { GiDiceTarget } from "react-icons/gi";
import { BsTrophy, BsFileBarGraph } from "react-icons/bs";
import { RiFileLockLine } from "react-icons/ri";
import { BiPurchaseTag } from "react-icons/bi";
import {
  MdOutlinePendingActions,
  MdIncompleteCircle,
  MdAssignmentReturn,
} from "react-icons/md";

const horizontalMenuConfig = [
  {
    /*
  {
    id: "dashboard",
    title: "Dashboard",
    type: "item",
    icon: <FaHome size={15} />,
    permissions: ["admin", "editor"],
    navLink: "/dashboard",
  },*/
  },

  {
    id: "Users",
    title: "Users",
    type: "collapse",

    icon: <FaUsers size={24} />,
    children: [
      {
        id: "CreateUsers",
        title: "Create User",
        type: "item",
        icon: <FaList size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/SoftNumen/accounSearch",
      },

      {
        id: "SuperAdmin List",
        title: "SuperAdmin List",
        type: "item",
        icon: <HiOutlineClipboardDocumentList size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/rupioo/SuperAdminList",
      },
      // {
      //   id: "SuperAdminWithUser",
      //   title: "SuperAdmin With User",
      //   type: "item",
      //   icon: <HiOutlineClipboardDocumentList size={22} />,
      //   permissions: ["admin", "editor"],
      //   navLink: "/app/rupioo/SuperAdminWithUser",
      // },
      // {
      //   id: "SuperAdminWithCustomer",
      //   title: "SuperAdmin With Customer",
      //   type: "item",
      //   icon: <HiOutlineClipboardDocumentList size={22} />,
      //   permissions: ["admin", "editor"],
      //   navLink: "/app/rupioo/SuperAdminWithCustomer",
      // },
      {
        id: "subscriptionplan",
        title: "Subscription Plan",
        type: "item",
        icon: <SiContactlesspayment size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/rupioo/subscriptionplan/list",
      },

      {
        id: "rolesandpermission",
        title: "Roles and Persmissions",
        type: "item",
        icon: <FaCriticalRole size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/Trupee/account/RoleList",
      },
      {
        id: "CreateCustomer",
        title: "Create Customer",
        type: "item",
        icon: <FaPeopleArrows size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/SoftNumen/CustomerSearch",
      },
      {
        id: "CreateTransport",
        title: "Create Transporter",
        type: "item",
        icon: <FaShip size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/ajgroup/CreateTransportList",
      },
      // {
      //   id: "uploadsalespersion",
      //   title: "Upload Sales Person",
      //   type: "item",
      //   icon: <FaShip size={22} />,
      //   permissions: ["admin", "editor"],
      //   navLink: "/app/SoftNumen/Uploadsalespersion",
      // },
    ],
  },
  {
    id: "Sales",
    title: "Sales",
    type: "collapse",
    icon: <FaShoppingCart size={24} />,
    children: [
      {
        id: "CreateInvoice",
        title: "Sales Invoice",
        type: "item",
        icon: <FaFileInvoice size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/softnumen/InvoiceGenerator",
      },
      {
        id: "OrderList",
        title: "Sales Order",
        type: "item",
        icon: <FaCartArrowDown size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/softnumen/order/orderList",
      },
      // {
      //   id: "PlaceOrder",
      //   title: "Place Order",
      //   type: "item",
      //   icon: <FaLuggageCart size={22} />,
      //   permissions: ["admin", "editor"],
      //   navLink: "/app/AjGroup/order/placeOrderList",
      // },
      {
        id: "PendingOrder",
        title: "Pending Order",
        type: "item",
        icon: <FaBusinessTime size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/softnumen/order/pendingOrder",
      },
      {
        id: "CompleteOrder",
        title: "Complete Order",
        type: "item",
        icon: <IoMdCloudDone size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/softNumen/order/confirmedOrder",
      },

      {
        id: "dispatch",
        title: "Dispatch details",
        type: "item",
        icon: <FaTruck size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/AjGroup/dispatch/goodDispatchList",
      },

      {
        id: "salesReturn",
        title: "Sales Return",
        type: "item",
        icon: <TbTruckReturn size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/SoftNumen/SalesOrderReturnList",
      },
      {
        id: "Creditnote",
        title: "CreditNote",
        type: "item",
        icon: <GrNotes size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/AjGroup/note/CreditNoteList",
      },
      {
        id: "SalesLead",
        title: "Sales Lead",
        type: "item",
        icon: <FaCircle size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/jupitech/order/SalesLead",
      },
      {
        id: "Sales Team",
        title: "Sales Team",
        type: "item",
        icon: <FaCircle size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/SoftNumen/CreateSalesMan",
      },
      {
        id: "target Creation",
        title: "Target Creation",
        type: "item",
        icon: <GiDiceTarget size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/rupioo/HeadtargetingList/0",
      },
      {
        id: "Promotional Activity",
        title: "Promotional Activity",
        type: "item",
        icon: <FaRunning size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/AjGroup/PromotionalActivityList",
      },
      {
        id: "Auto Billing Lock",
        title: "Auto Billing Lock",
        type: "item",
        icon: <RiFileLockLine size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/softNumen/order/OrderSearch",
      },
      {
        id: "achievement",
        title: "Achievement",
        type: "item",
        icon: <BsTrophy size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/SoftNumen/ticket/targerReport",
        // navLink: "/app/jupitech/order/achivement",
      },
    ],
  },
  {
    id: "Purchase",
    title: "Purchase",
    type: "collapse",
    icon: <FaProductHunt size={24} />,
    children: [
      {
        id: "Purchaseorder",
        title: "Purchase Order",
        type: "item",
        icon: <BiPurchaseTag size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/AJgroup/order/purchaseOrderList",
      },
      {
        id: "Purchaseorderpending",
        title: "Purchase Pending",
        type: "item",
        icon: <MdOutlinePendingActions size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/AJgroup/purchase/pendingPurchase",
      },
      // {
      //   id: "Purchaseordercomplete",
      //   title: "Purchase Complete",
      //   type: "item",
      //   icon: <MdIncompleteCircle size={22} />,
      //   permissions: ["admin", "editor"],
      //   navLink: "/app/AJgroup/purchase/purchaseCompleted",
      // },
      {
        id: "PurchaseInvoice",
        title: "Purchase Invoice",
        type: "item",
        icon: <FaFileInvoiceDollar size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/AJGroup/product/PurchaseInvoice",
      },
      {
        id: "PurchaseReturnss",
        title: "Purchase Return",
        type: "item",
        icon: <MdAssignmentReturn size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/AJgroup/order/PurchaseReturnList",
      },
      {
        id: "DebitNotes",
        title: "Debit Notes",
        type: "item",
        icon: <FaFile size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/AjGroup/note/DebitNoteList",
      },
      // {
      //   id: "multivendor",
      //   title: "Multivendor",
      //   type: "item",
      //   icon: <FaCircle size={8} />,
      //   permissions: ["admin", "editor"],
      //   navLink: "/app/softNumen/warranty/Campaignlist",
      // },
      // {
      //   id: "PurchaseReturnss",
      //   title: "Purchase Return",
      //   type: "item",
      //   icon: <FaCircle size={8} />,
      //   permissions: ["admin", "editor"],
      //   navLink: "/app/softNumen/warranty/Campaignlist",
      // },
    ],
  },
  {
    id: "transaction",
    title: "Transaction",
    type: "collapse",
    icon: <AiOutlineTransaction size={24} />,
    children: [
      {
        id: "Receipt",
        title: "Receipt",
        type: "item",
        icon: <IoReceiptOutline size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/SoftNumen/parts/ReceiptList",
      },
      {
        id: "payment",
        title: "Payment",
        type: "item",
        icon: <FaDollarSign size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/AJgroup/purchase/PaymentListAll",
      },
      {
        id: "cashbook",
        title: "Cashbook",
        type: "item",
        icon: <FaBook size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/SoftNumen/report/CashBookReports",
      },
      {
        id: "CashAccount",
        title: "CashAccount",
        type: "item",
        icon: <FaBook size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/SoftNumen/parts/Cashbook",
      },
      {
        id: "PartyLedger",
        title: "Party Ledger",
        type: "item",
        icon: <GiNotebook size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/AJGroup/account/PartyLedgersView",
      },
      // {
      //   id: "VendorLedger",
      //   title: "Vendor Ledger",
      //   type: "item",
      //   icon: <FaBook size={22} />,
      //   permissions: ["admin", "editor"],
      //   navLink: "/app/rupioo/parts/UserLedger",
      // },
    ],
  },

  // {
  //   id: "Team",
  //   title: "Team",
  //   type: "collapse",
  //   icon: <FaShoppingCart size={15} />,
  //   children: [
  //     {
  //       id: "PartyCreation",
  //       title: "Party Creation",
  //       type: "item",
  //       icon: <FaList size={15} />,
  //       permissions: ["admin", "editor"],
  //       // navLink: "/app/SoftNumen/account/PartyCreation",
  //       navLink: "/app/SoftNumen/PartyList",
  //     },
  //     {
  //       id: "Team Creation",
  //       title: "Team Creation",
  //       type: "item",
  //       icon: <FaList size={15} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/app/SoftNumen/ticket/TicketSearch",
  //     },

  //     {
  //       id: "Area Assignment",
  //       title: "Area Assignment",
  //       type: "item",
  //       icon: <FaList size={15} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/app/SoftNumen/ticket/TicketSearch",
  //     },
  //     {
  //       id: "Party Assignment",
  //       title: "Party Assignment",
  //       type: "item",
  //       icon: <FaList size={15} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/app/SoftNumen/ticket/TicketSearch",
  //     },
  //     {
  //       id: "Target creation Partywise",
  //       title: "Target creation Partywise",
  //       type: "item",
  //       icon: <FaList size={15} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/app/SoftNumen/ticket/TicketSearch",
  //     },
  //     {
  //       id: "Target creation Product wise",
  //       title: "Target creation Product wise",
  //       type: "item",
  //       icon: <FaList size={15} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/app/SoftNumen/ticket/TicketSearch",
  //     },

  //     {
  //       id: "TargetAchieved",
  //       title: "Auto Target Creation",
  //       type: "item",
  //       icon: <FaList size={15} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/app/SoftNumen/ticket/TicketSearch",
  //     },
  //     {
  //       id: "Balanncedtarget",
  //       title: "Balanced Target",
  //       type: "item",
  //       icon: <FaList size={15} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/app/SoftNumen/ticket/TicketSearch",
  //     },
  //     {
  //       id: "TeamWorkingreport",
  //       title: "Team working Report",
  //       type: "item",
  //       icon: <FaList size={15} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/app/SoftNumen/ticket/TicketSearch",
  //     },
  //     {
  //       id: "Orderdispatchreport",
  //       title: "Order Dispatch Detail",
  //       type: "item",
  //       icon: <FaList size={15} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/app/SoftNumen/ticket/TicketSearch",
  //     },
  //     {
  //       id: "PartyReport",
  //       title: "Party Report",
  //       type: "item",
  //       icon: <FaList size={15} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/app/SoftNumen/ticket/TicketSearch",
  //     },
  //     {
  //       id: "CollectionReport",
  //       title: "Collection Report",
  //       type: "item",
  //       icon: <FaList size={15} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/app/SoftNumen/ticket/TicketSearch",
  //     },
  //     {
  //       id: "Paymentduereport",
  //       title: "Payment due Report",
  //       type: "item",
  //       icon: <FaList size={15} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/app/SoftNumen/ticket/TicketSearch",
  //     },
  //     {
  //       id: "DeadParty",
  //       title: "Dead Party",
  //       type: "item",
  //       icon: <FaList size={15} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/app/SoftNumen/ticket/TicketSearch",
  //     },
  //   ],
  // },
  //////////////////////// // HRM START BY JAYESH//////
  {
    id: "HRM",
    title: "HRM",
    type: "collapse",
    icon: <GiHumanPyramid size={22} />,
    children: [
      {
        id: "recruitmentandplacement",
        title: "Recruitment and Placement",
        type: "collapse",
        icon: <GiGrowth List size={22} />,
        children: [
          {
            id: "jobcreate",
            title: "Job Create",
            type: "item",
            icon: <FaAddressCard size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/ajgroup/HRM/JobList",
          },
          {
            id: "jobapplied/result",
            title: "Job Applied/ Result",
            type: "item",
            icon: <MdDownloadDone size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/ajgroup/HRM/JobappList",
          },
          {
            id: "practiceandskillstest",
            title: "Practice & Skills Test",
            type: "item",
            icon: <GiSkills size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/ajgroup/HRM/practiceList",
          },
          {
            id: "interview",
            title: "Interview",
            type: "item",
            icon: <SiGotomeeting size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/ajgroup/HRM/interviewList",
          },
          {
            id: "offerletter",
            title: "Offer Letter",
            type: "item",
            icon: <RiPagesLine size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/ajgroup/HRM/offerList",
          },

          {
            id: "training",
            title: "Training",
            type: "item",
            icon: <MdOutlineModelTraining size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/ajgroup/HRM/trainList",
          },
        ],
      },

      {
        id: "timesheet",
        title: "Time Sheet",
        type: "item",
        icon: <GrDocumentTime size={22} />,
        permissions: ["admin", "editor"],

        children: [
          {
            id: "attendance",
            title: "Attendance",
            type: "item",
            icon: <MdPresentToAll size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/ajgroup/HRM/attenList",
          },
          {
            id: "EmployeeList",
            title: "EmployeeList",
            type: "item",
            icon: <MdPresentToAll size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/ajgroup/HRM/EmployeeList",
          },

          {
            id: "leave",
            title: "Add Leave",
            type: "item",
            icon: <MdAddBusiness size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/ajgroup/HRM/leaveList",
          },
          {
            id: "manageleave",
            title: "Manage Leave",
            type: "item",
            icon: <SiManageiq size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/ajgroup/HRM/Time-sheet/ManageLeaveList",
          },
          {
            id: "holiday",
            title: "Hours & Holiday Master",
            type: "item",
            icon: <GiRingmaster size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/ajgroup/HRM/holidayList",
          },
        ],
      },
      {
        id: "performance",
        title: "Performance",
        type: "item",
        icon: <GrDocumentPerformance size={22} />,
        permissions: ["admin", "editor"],

        children: [
          {
            id: "indicator",
            title: "Indicator",
            type: "item",
            icon: <BsAppIndicator size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/ajgroup/HRM/indicatList",
          },
          {
            id: "incentive",
            title: "Incentive",
            type: "item",
            icon: <GiReceiveMoney size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/ajgroup/HRM/incentList",
          },
          {
            id: "bonus",
            title: "Bonus",
            type: "item",
            icon: <GiPayMoney size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/ajgroup/HRM/bonusList",
          },
          // {
          //   id: "goaltracking",
          //   title: "Goal Tracking",
          //   type: "item",
          //   icon: <FaList size={12} />,
          //   permissions: ["admin", "editor"],
          //   // navLink: "/app/freshlist/house/goaltracking",
          //   navLink: "/app/ajgroup/HRM/goalList",
          // },
          {
            id: "appraisal",
            title: "Appraisal",
            type: "item",
            icon: <GiTakeMyMoney size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/ajgroup/HRM/apprList",
          },
        ],
      },

      // {
      //   id: "reports",
      //   title: "Reports",
      //   type: "item",
      //   icon: <FaList size={12} />,
      //   permissions: ["admin", "editor"],

      //   children: [
      //     {
      //       id: "attendancereport",
      //       title: "Attendance Report",
      //       type: "item",
      //       icon: <FaList size={12} />,
      //       permissions: ["admin", "editor"],
      //       navLink: "/app/ajgroup/HRM/reportAttenList",
      //     },
      //     {
      //       id: "leavereport",
      //       title: "Leave Report",
      //       type: "item",
      //       icon: <FaList size={12} />,
      //       permissions: ["admin", "editor"],

      //       navLink: "/app/ajgroup/HRM/reportLeaveList",
      //     },

      //     {
      //       id: "payrollreport",
      //       title: "Payroll Report",
      //       type: "item",
      //       icon: <FaList size={12} />,
      //       permissions: ["admin", "editor"],
      //       navLink: "/app/ajgroup/HRM/reportPayrollList",
      //     },

      //     {
      //       id: "timesheetreport",
      //       title: "TimeSheet Report",
      //       type: "item",
      //       icon: <FaList size={12} />,
      //       permissions: ["admin", "editor"],
      //       navLink: "/app/ajgroup/HRM/reportTimesheetList",
      //     },
      //   ],
      // },

      {
        id: "setrules",
        title: "Set Rules",
        type: "item",
        icon: <GiBassetHoundHead size={22} />,
        permissions: ["admin", "editor"],

        children: [
          {
            id: "rules",
            title: "Rules",
            type: "item",
            icon: <FcRules size={22} />,
            navLink: "/app/ajgroup/HRM/ruleList",
          },
        ],
      },

      {
        id: "payroll",
        title: "Payroll",
        type: "item",
        icon: <GiScrollUnfurled size={22} />,
        permissions: ["admin", "editor"],

        children: [
          {
            id: "Setsalary",
            title: "Set Salary",
            type: "item",
            icon: <GiMoneyStack size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/ajgroup/HRM/setsalarList",
          },
          {
            id: "payslip",
            title: "Payslip",
            type: "item",
            icon: <MdOutlineReceiptLong size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/ajgroup/HRM/setpayslip",
          },
        ],
      },

      // {
      //   id: "Shifts",
      //   title: "Shift List",
      //   type: "item",
      //   icon: <GiRingmaster size={22} />,
      //   permissions: ["admin", "editor"],
      //   navLink: "/app/ajgroup/HRM/ShiftList",
      // },

      {
        id: "hrmadminsetup",
        title: "HRM Admin Setup",
        type: "item",
        icon: <MdOutlineAdminPanelSettings size={22} />,
        permissions: ["admin", "editor"],

        children: [
          {
            id: "resignation",
            title: "Resignation",
            type: "item",
            icon: <MdAppRegistration size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/ajgroup/HRM/resignation",
          },
          {
            id: "complaint",
            title: "Complaint",
            type: "item",
            icon: <CiEdit size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/ajgroup/HRM/complainList",
          },
          {
            id: "warrning",
            title: "Warning",
            type: "item",
            icon: <IoWarning size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/ajgroup/HRM/warningList",
          },
          {
            id: "announcement",
            title: "Announcement",
            type: "item",
            icon: <TfiAnnouncement size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/ajgroup/HRM/announceList",
          },
          {
            id: "Emilist",
            title: "EMI",
            type: "item",
            icon: <MdAccountBalance size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/ajgroup/HRM/EmilList",
          },
          {
            id: "advanceWages",
            title: "Advance Wages",
            type: "item",
            icon: <GiUpgrade size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/ajgroup/HRM/advancewagesList",
          },
          {
            id: "termination",
            title: "Termination",
            type: "item",
            icon: <FiRepeat size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/ajgroup/HRM/termList",
          },
          {
            id: "Shifts",
            title: "Shift List",
            type: "item",
            icon: <GiRingmaster size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/ajgroup/HRM/ShiftList",
          },
          {
            id: "Branch",
            title: "Branch List",
            type: "item",
            icon: <GiRingmaster size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/ajgroup/HRM/BranchList",
          },
        ],
      },
    ],
  },
  {
    id: "Report",
    title: "Report",
    type: "collapse",
    icon: <FaFileSignature size={24} />,
    children: [
      {
        id: "AllGSTR",
        title: "All GSTR",
        type: "collapse",
        icon: <HiCurrencyRupee size={22} />,
        children: [
          {
            id: "GSTR 1",
            title: "GSTR 1",
            type: "item",
            icon: <BiRupee size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/rupioo/report/GSTR1",
          },
          {
            id: "GSTR 3B",
            title: "GSTR 3B",
            type: "item",
            icon: <HiOutlineCurrencyRupee size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/SoftNumen/ticket/GSTR3B",
          },
          {
            id: "GSTR 2B",
            title: "GSTR 2B",
            type: "item",
            icon: <RiMoneyPoundCircleLine size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/SoftNumen/ticket/GSTR2B",
          },
          {
            id: "HSN WISE REPORT",
            title: "HSN WISE REPORT",
            type: "item",
            icon: <TbZoomMoney size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/rupioo/report/hsnwisereport",
          },
        ],
      },
      {
        id: "Purchase Report",
        title: "Purchase Reports",
        type: "collapse",
        icon: <MdShoppingBag size={22} />,
        children: [
          {
            id: "PRODUCT WISE PURCHASE REPORT",
            title: "PRODUCT WISE PURCHASE REPORT",
            type: "item",
            icon: <GiTemptation size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/Rupioo/Report/ProductWisePuchaseReport",
          },
          {
            id: "PURCHASE ORDER REPORT",
            title: "PURCHASE ORDER REPORT",
            type: "item",
            icon: <HiOutlineShoppingCart size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/Rupioo/Report/PurchaseOrderReport",
          },
          {
            id: "PARTY WISE AND PRODUCT WISE PURCHASE REPORT",
            title: "PARTY WISE AND PRODUCT WISE PURCHASE REPORT",
            type: "item",
            icon: <HiUserGroup size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/SoftNumen/ticket/purchasereportamount",
          },
          {
            id: "Purchase Return Report",
            title: "Purchase Return Report",
            type: "item",
            icon: <TbTruckReturn size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/rupioo/report/PurchaseReturnReport",
          },
        ],
      },
      {
        id: "Stock Reports",
        title: "Stock Reports",
        type: "collapse",
        icon: <RiStockFill size={22} />,
        children: [
          {
            id: "STOCK DIFFERENCE REPORT",
            title: "STOCK DIFFERENCE REPORT",
            type: "item",
            icon: <TbReportAnalytics size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/rupioo/report/StockDifferenceReport",
          },
          {
            id: "Dead Stock Report",
            title: "Dead Stock Report",
            type: "item",
            icon: <GoEyeClosed size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/rupioo/report/WareHouseOverDueStock",
          },
          {
            id: "Low Stock Report",
            title: "Low Stock Report",
            type: "item",
            icon: <IoTrendingDown size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/rupioo/report/LowStockReports",
          },
          {
            id: "Closing Stock Report",
            title: "Closing Stock Report",
            type: "item",
            icon: <GiCardboardBoxClosed size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/rupioo/report/ClosingStockReport",
          },
          {
            id: "WareHouse Stock Shortage",
            title: "WareHouse Stock Shortage",
            type: "item",
            icon: <TbBuildingWarehouse size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/Ajgroup/stock/WarehouseShortageReport",
          },
          {
            id: "Damade Report",
            title: "Damage Reports",
            type: "item",
            icon: <RiFileDamageLine size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/rupioo/report/DamageStockReport",
          },
          // {
          //   id: "Stock Reconcilation Monthly",
          //   title: "Stock Reconcilation Monthly",
          //   type: "item",
          //   icon: <GiCash size={22} />,
          //   permissions: ["admin", "editor"],
          //   navLink: "/app/SoftNumen/ticket/GSTR2B",
          // },
          {
            id: "WareHouse Reports",
            title: "WareHouse Reports",

            type: "item",
            icon: <FaWarehouse size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/rupioo/report/WareHouseReports",
          },
          {
            id: "WareHouse Stock Report",
            title: "WareHouse Stock Report",
            type: "item",
            icon: <TbReportSearch size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/SoftNumen/ticket/WareHouseReport",
          },
        ],
      },
      {
        id: "Sales Reports",
        title: "Sales Reports",
        type: "collapse",
        icon: <FaProductHunt size={22} />,
        children: [
          {
            id: "Dead Parties Reports",
            title: "Dead Parties Reports",
            type: "item",
            icon: <GiCash size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/rupioo/report/DeadPartyReport",
          },
          {
            id: "PARTY WISE AND PRODUCT WISE SALE REPORT",
            title: "PARTY WISE AND PRODUCT WISE SALE REPORT",
            type: "item",
            icon: <GiCash size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/softNumen/report/Orderreport",
          },
          {
            id: "PRODUCT WISE SALE REPORT",
            title: "PRODUCT WISE SALE REPORT",
            type: "item",
            icon: <GiCash size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/SoftNumen/ticket/PendingOrderReport",
          },
          {
            id: "Sales Order Report",
            title: "Sales Order Report",
            type: "item",
            icon: <GiCash size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/rupioo/reports/SalesOrderReport",
          },
          {
            id: "Sales Pending Report",
            title: "Sales Pending Report",
            type: "item",
            icon: <GiCash size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/rupioo/report/SalesPendingReports",
          },
          {
            id: "SalesComplete Order Report",
            title: "SalesComplete Order Report",
            type: "item",
            icon: <GiCash size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/rupioo/reports/SalesCompletedOrderReports",
          },
          {
            id: "Delivered Order Report",
            title: "Delivered Order Report",
            type: "item",
            icon: <GiCash size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/rupioo/reports/SalesDeliveredReport",
          },
          {
            id: "Sales Report and Amount",
            title: "Sales Report and Amount",
            type: "item",
            icon: <GiCash size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/SoftNumen/ticket/Salesreport",
          },
          {
            id: "Sales Return Report",
            title: "Sales Return Report",
            type: "item",
            icon: <GiCash size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/rupioo/reports/SalesReturnReport",
          },
          {
            id: "SalesTarget Report",
            title: "SalesTarget Report",
            type: "item",
            icon: <GiCash size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/SoftNumen/ticket/targerReport",
          },
          {
            id: "Target Achieved Report",
            title: "Target Achieved Report",
            type: "item",
            icon: <GiCash size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/rupioo/report/AchievementReport",
          },
          {
            id: "Target Pending Report",
            title: "Target Pending Report",
            type: "item",
            icon: <GiCash size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/SoftNumen/ticket/GSTR2B",
          },
          {
            id: "SalesDispatch Report",
            title: "Dispatch Report",
            type: "item",
            icon: <GiCash size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/SoftNumen/ticket/DispatchReport",
          },
        ],
      },
      {
        id: "Finance Reports",
        title: "Finance Reports",
        type: "collapse",
        icon: <FaProductHunt size={22} />,
        children: [
          {
            id: "TAX REPORT",
            title: "TAX REPORT",
            type: "item",
            icon: <GiCash size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/SoftNumen/ticket/TaxReport",
          },
          {
            id: "Lock Party Report",
            title: "Lock Party Report",
            type: "item",
            icon: <GiCash size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/SoftNumen/ticket/LockPartyReport",
          },
          {
            id: "Overdue Report",
            title: "Overdue Report",
            type: "item",
            icon: <GiCash size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/SoftNumen/report/OverdueReport",
          },
          {
            id: "Party Ledger Report",
            title: "Party Ledger Report",
            type: "item",
            icon: <GiCash size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/report/ledger/PartyLedgerReport",
          },
          {
            id: "Cashbook Report",
            title: "cashbook Report",
            type: "item",
            icon: <GiCash size={22} />,
            permissions: ["admin", "editor"],
            // navLink: "/app/SoftNumen/ticket/CashbookReport",
            navLink: "/app/SoftNumen/report/CashBookReports",
          },
          {
            id: "Bank Statement",
            title: "Bank Statement",
            type: "item",
            icon: <GiCash size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/rupioo/report/BankStatementReport",
          },
          {
            id: "Receipt Report",
            title: "receipt Report",
            type: "item",
            icon: <GiCash size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/SoftNumen/report/ReceiptReport",
          },
          {
            id: "Payment Report",
            title: "Payment Report",
            type: "item",
            icon: <GiCash size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/SoftNumen/ticket/PaymentReport",
          },
          {
            id: "Due Report",
            title: "Due Report",
            type: "item",
            icon: <GiCash size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/SoftNumen/ticket/DueReport",
          },
          // {
          //   id: "sales Report and Amount",
          //   title: "sales Report and Amount",
          //   type: "item",
          //   icon: <GiCash size={22} />,
          //   permissions: ["admin", "editor"],
          //   navLink: "/app/SoftNumen/ticket/Salesreport",
          // },
          // {
          //   id: "sales Return Report",
          //   title: "sales Return Report",
          //   type: "item",
          //   icon: <GiCash size={22} />,
          //   permissions: ["admin", "editor"],
          //   navLink: "/app/rupioo/reports/SalesReturnReport",
          // },

          {
            id: "PartywiseLedger Report",
            title: "PartywiseLedger Report",
            type: "item",
            icon: <GiCash size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/SoftNumen/ticket/PartyWiseledgerReport",
          },
          {
            id: "Profit and Loss Report",
            title: "Profit and Loss Report",
            type: "item",
            icon: <GiCash size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/rupioo/report/ProfitandLossReport",
          },
          {
            id: "BalanceSheet",
            title: "BalanceSheet",
            type: "item",
            icon: <GiCash size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/SoftNumen/ticket/GSTR2B",
          },
          {
            id: "Promotional Activity Report",
            title: "Promotional Activity Report",
            type: "item",
            icon: <GiCash size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/rupioo/report/PromotionalActivityReport",
          },
        ],
      },
      // {
      //   id: "OrdeReportList",
      //   title: "Order Report List",
      //   type: "collapse",
      //   icon: <FaProductHunt size={22} />,
      //   children: [
      //     {
      //       id: "OrderReport",
      //       title: "Order Report",
      //       type: "item",
      //       icon: <BsFillCartCheckFill size={22} />,
      //       permissions: ["admin", "editor"],
      //       navLink: "/app/softNumen/report/Orderreport",
      //     },
      //     {
      //       id: "Pending Order Report",
      //       title: "Pending Order Report",
      //       type: "item",
      //       icon: <MdOutlinePendingActions size={22} />,
      //       permissions: ["admin", "editor"],
      //       navLink: "/app/SoftNumen/ticket/PendingOrderReport",
      //     },
      //     {
      //       id: "Salesreport",
      //       title: "Sales Report and Amount",
      //       type: "item",
      //       icon: <FaFileInvoiceDollar size={22} />,
      //       permissions: ["admin", "editor"],
      //       navLink: "/app/SoftNumen/ticket/Salesreport",
      //     },
      //     {
      //       id: "OverdueReport",
      //       title: "Overdue Report",
      //       type: "item",
      //       icon: <FaBusinessTime size={22} />,
      //       permissions: ["admin", "editor"],
      //       navLink: "/app/SoftNumen/report/OverdueReport",
      //     },
      //     {
      //       id: "Lock In Report",
      //       title: "Lock In Report",
      //       type: "item",
      //       icon: <BsFileLock2Fill size={22} />,
      //       permissions: ["admin", "editor"],
      //       navLink: "/app/SoftNumen/ticket/LockInReport",
      //     },
      //     {
      //       id: "DispatchReport",
      //       title: "Dispatch Report",
      //       type: "item",
      //       icon: <FaTruckLoading size={22} />,
      //       permissions: ["admin", "editor"],
      //       navLink: "/app/SoftNumen/ticket/DispatchReport",
      //     },
      //     {
      //       id: "WareHouse Report",
      //       title: "WareHouse Report",
      //       type: "item",
      //       icon: <FaWarehouse size={22} />,
      //       permissions: ["admin", "editor"],
      //       navLink: "/app/SoftNumen/ticket/WareHouseReport",
      //     },
      //   ],
      // },
      // {
      //   id: "Receipt and payment customise",
      //   title: "Receipt/Payment Customise",
      //   type: "item",
      //   icon: <FaCircle size={8} />,
      //   permissions: ["admin", "editor"],
      //   navLink: "/app/SoftNumen/Inspections/InspectionsSearch",
      // },
      // {
      //   id: "StockReport",
      //   title: "Stock Report",
      //   type: "item",
      //   icon: <BsFileBarGraph size={22} />,
      //   permissions: ["admin", "editor"],
      //   navLink: "/app/SoftNumen/ticket/Stockreport",
      // },

      // {
      //   id: "purchasereportamount",
      //   title: "Purchase Report and Amount",
      //   type: "item",
      //   icon: <HiOutlineDocumentReport size={22} />,
      //   permissions: ["admin", "editor"],
      //   navLink: "/app/SoftNumen/ticket/purchasereportamount",
      // },
      // {
      //   id: "TeamandtargerReport",
      //   title: "Team and Target Report",
      //   type: "item",
      //   icon: <RiTeamLine size={22} />,
      //   permissions: ["admin", "editor"],
      //   navLink: "/app/SoftNumen/ticket/TeamandtargerReport",
      // },

      // {
      //   id: "Partywise ledger",
      //   title: "Partywise ledger",
      //   type: "item",
      //   icon: <SiHyperledger size={22} />,
      //   permissions: ["admin", "editor"],
      //   navLink: "/app/SoftNumen/ticket/Partywiseledger",
      // },
      // {
      //   id: "TransporterReport",
      //   title: "Transportor Report",
      //   type: "item",
      //   icon: <MdEmojiTransportation size={22} />,
      //   permissions: ["admin", "editor"],
      //   navLink: "/app/SoftNumen/ticket/TransporterReport",
      // },
      // {
      //   id: "targerReport",
      //   title: "Target Report",
      //   type: "item",
      //   icon: <GiHumanTarget size={22} />,
      //   permissions: ["admin", "editor"],
      //   navLink: "/app/SoftNumen/ticket/targerReport",
      // },

      // {
      //   id: "HSN Wise sale Report",
      //   title: "HSN Wise sale Report",
      //   type: "item",
      //   icon: <FaFileInvoiceDollar size={22} />,
      //   permissions: ["admin", "editor"],
      //   navLink: "/app/SoftNumen/ticket/HSNWisesaleReport",
      // },
      // {
      //   id: "Product List with HSN and GST",
      //   title: "Product List with HSN and GST",
      //   type: "item",
      //   icon: <FaRegListAlt size={22} />,
      //   permissions: ["admin", "editor"],
      //   navLink: "/app/SoftNumen/ticket/ProductListwithHSNandGST",
      // },
      // {
      //   id: "Out Standing Report",
      //   title: "Out Standing Report",
      //   type: "item",
      //   icon: <FaOutdent size={22} />,
      //   permissions: ["admin", "editor"],
      //   navLink: "/app/SoftNumen/ticket/OutStandingReport",
      // },

      // {
      //   id: "Cashbook Report",
      //   title: "Cashbook Report",
      //   type: "item",
      //   icon: <FaBook size={22} />,
      //   permissions: ["admin", "editor"],
      //   // navLink: "/app/SoftNumen/report/CashBookReports",
      //   navLink: "/app/SoftNumen/ticket/CashbookReport",
      // },
    ],
  },

  {
    id: "Stock",
    title: "Stock",
    type: "collapse",
    icon: <MdInventory2 size={24} />,
    children: [
      {
        id: "Inward Stock",
        title: "Inward Stock",
        type: "item",
        icon: <FaCartArrowDown size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/softNumen/warehouse/InwardStock",
      },
      {
        id: "Outward Stock",
        title: "Outward Stock",
        type: "item",
        icon: <BsCart4 size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/Ajgroup/warehouse/OutwardStock",
      },
      {
        id: "Closing Stock",
        title: "Closing Stock",
        type: "item",
        icon: <BsFillCartXFill size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/ajgroup/stock/ClosingStockList",
      },
      {
        id: "Opening Stock",
        title: "Opening Stock",
        type: "item",
        icon: <BsFillCartXFill size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/softNumen/warranty/openingStock",
      },
      {
        id: "Low Stock",
        title: "Low Stock",
        type: "item",
        icon: <BsMinecart size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/Ajgroup/stock/LowStockList",
        // navLink: "/app/softNumen/warranty/LowStock",
      },
      {
        id: "Damaged Stock",
        title: "Damaged Stock",
        type: "item",
        icon: <GiDamagedHouse size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/softNumen/warranty/DamagedStock",
        // navLink: "/app/softNumen/warranty/DamagedStock",
      },
      {
        id: "OverDue Stock",
        title: "OverDue Stock",
        type: "item",
        icon: <AiOutlineStock size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/Ajgroup/Stock/AllOverdueStockList",
        // navLink: "/app/Ajgroup/Stock/OverDueStockReport",
      },

      {
        id: "Dead Party",
        title: "Dead Party",
        type: "item",
        icon: <FaBookDead size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/softNumen/report/DeadParty",
      },
    ],
  },

  {
    id: "Others",
    title: "Others",
    type: "collapse",
    icon: <RiPsychotherapyFill size={24} />,
    children: [
      {
        id: "ProductList",
        title: "Product",
        type: "collapse",
        icon: <FaProductHunt size={22} />,
        children: [
          {
            id: "CategoryList",
            title: "Category List",
            type: "item",
            icon: <FaListAlt size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/freshlist/category/categoryList",
          },
          {
            id: "subCategoryList",
            title: "subCategory List",
            type: "item",
            icon: <MdChecklist size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/freshlist/subcategory/subCategoryList",
          },
          {
            id: "ProductCreation",
            title: "Product Creation",
            type: "item",
            icon: <MdOutlineProductionQuantityLimits size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/freshlist/house/houseProductList",
          },
        ],
      },
      // {
      //   id: "Multivendor",
      //   title: "Multivendor",
      //   type: "collapse",
      //   icon: <FaProductHunt size={15} />,
      //   children: [
      //     {
      //       id: "Registration",
      //       title: "Registration",
      //       type: "item",
      //       icon: <FaCircle size={8} />,
      //       permissions: ["admin", "editor"],
      //       navLink: "/app/freshlist/category/categoryList",
      //     },
      //     {
      //       id: "subCategoryList",
      //       title: "subCategory List",
      //       type: "item",
      //       icon: <FaCircle size={8} />,
      //       permissions: ["admin", "editor"],
      //       navLink: "/app/freshlist/subcategory/subCategoryList",
      //     },
      //     {
      //       id: "ProductCreation",
      //       title: "Product Creation",
      //       type: "item",
      //       icon: <FaCircle size={8} />,
      //       permissions: ["admin", "editor"],
      //       navLink: "/app/freshlist/house/houseProductList",
      //     },
      //   ],
      // },
      {
        id: "warehouse",
        title: "Warehouse",
        type: "item",
        icon: <FaWarehouse size={22} />,
        children: [
          {
            id: "WarehouseList",
            title: "WarehouseList",
            type: "item",
            icon: <FaRegListAlt size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/softNumen/system/WareHouseListSoft",
          },
          // {
          //   id: "rawmaterialinward ",
          //   title: "Item Inward",
          //   type: "item",
          //   icon: <FaCartArrowDown size={22} />,
          //   permissions: ["admin", "editor"],
          //   navLink: "/app/softNumen/warehouse/RawMaterialInward",
          // },
          // {
          //   id: "rawmaterialoutward",
          //   title: "Item Outward",
          //   type: "item",
          //   icon: <BsCart4 size={22} />,
          //   permissions: ["admin", "editor"],
          //   navLink: "/app/softNumen/warehouse/RawmaterialOutward",
          // },
          {
            id: "stocktransfer",
            title: "Stock Transfer",
            type: "item",
            icon: <MdOutlineTransform size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/softNumen/warehouse/StockTransfer",
          },
          {
            id: "damageReport",
            title: "Damage Report",
            type: "item",
            icon: <RiFileDamageFill size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/rupioo/report/DamageStockReport",
            // navLink: "/app/softNumen/warehouse/DamageReport",
          },
          {
            id: "stockstorage",
            title: "Stock Storage",
            type: "item",
            icon: <MdOutlineStorage size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/softNumen/warehouse/StockStorage",
          },
          {
            id: "wastageDetail",
            title: "Wastage Detail",
            type: "item",
            icon: <GiNuclearWaste size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/views/apps/AjGroup/Production/Wastageproduction",
            // navLink: "/app/softNumen/warehouse/WastageDetail",
          },
          {
            id: "dispatchDetail",
            title: "Dispatch Detail",
            type: "item",
            icon: <FaTruck size={22} />,
            permissions: ["admin", "editor"],
            navLink: "/app/AjGroup/dispatch/WarehouseDispatchlist",
            // navLink: "/app/softNumen/warehouse/DispatchDetail",
          },
        ],
      },
      {
        id: "production",
        title: "Production",
        type: "collapse",
        icon: <FaShoppingCart size={22} />,
        children: [
          {
            id: "items",
            title: "Items",
            type: "item",
            icon: <FaList size={12} />,
            permissions: ["admin", "editor"],
            navLink: "/views/apps/freshlist/Production/Itemproduct",
          },
          // {
          //   id: "productionprocess",
          //   title: "Production Process",
          //   type: "item",
          //   icon: <FaList size={12} />,
          //   permissions: ["admin", "editor"],
          //   navLink: "/views/apps/freshlist/Production/productionprocesspage",
          // },
          {
            id: "wastagematerial",
            title: "Wastage Material",
            type: "item",
            icon: <FaList size={12} />,
            permissions: ["admin", "editor"],
            navLink: "/views/apps/AjGroup/Production/Wastageproduction",
            // navLink:
            //   "/views/apps/freshlist/Production/wastagematerialproduction",
          },
          // {
          //   id: "Material Return",
          //   title: "Material Return",
          //   type: "item",
          //   icon: <FaList size={12} />,
          //   permissions: ["admin", "editor"],
          //   navLink: "/views/apps/AjGroup/Production/ReturnProductionProduct",
          //   // navLink:
          //   //   "/views/apps/freshlist/Production/wastagestockreturnproduction",
          // },
          {
            id: "pricecalculater",
            title: "Price Calculater",
            type: "item",
            icon: <FaList size={12} />,
            permissions: ["admin", "editor"],
            navLink:
              "/views/apps/freshlist/Production/pricecalculaterproduction",
          },
        ],
      },

      // {
      //   id: "HRM",
      //   title: "HRM",
      //   type: "item",
      //   icon: <FaUserAstronaut size={22} />,
      //   permissions: ["admin", "editor"],
      //   navLink: "/app/softNumen/system/WareHouseListSoft",
      // },
      {
        id: "Setting",
        title: "Setting",

        type: "item",
        icon: <MdOutlineSettings size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/softNumen/system/SettingTab",
      },
      {
        id: "Pricecalculation",
        title: "Price Calculation",
        type: "item",
        icon: <FaCalculator size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/softNumen/system/WareHouseListSoft",
      },
      // {
      //   id: "Unit",
      //   title: "UnitList",
      //   type: "item",
      //   icon: <SiBookstack size={22} />,
      //   permissions: ["admin", "editor"],
      //   navLink: "/app/softNumen/Unit/UnitList",
      // },
      {
        id: "transportationCharges",
        title: "Add Charges",
        type: "item",
        icon: <SiBookstack size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/rupioo/addcharges/OtherChargesList",
      },

      {
        id: "InvoiceList",
        title: "InvoiceList",
        type: "item",
        icon: <MdOutlineProductionQuantityLimits size={22} />,
        permissions: ["admin", "editor"],
        navLink: "/app/Invoicenew",
      },
      // {
      //   id: "wareHouseStock",
      //   title: "WareHouseStock",
      //   type: "item",
      //   icon: <FaLaptopHouse size={22} />,
      //   permissions: ["admin", "editor"],
      //   navLink: "/app/softNumen/warehouse/StockTransfer",
      // },
    ],
  },
];

export default horizontalMenuConfig;
