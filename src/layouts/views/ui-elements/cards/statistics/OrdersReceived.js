import React from "react";
import StatisticsCard from "../../../../components/@vuexy/statisticsCard/StatisticsCard";
import { Package } from "react-feather";
import { ordersReceived, ordersReceivedSeries } from "./StatisticsData";
import { Card, CardBody, Row, Col } from "reactstrap";

// class OrdersReceived extends React.Component {
//   render() {
//     return (
//       <StatisticsCard
//         icon={<Package className="warning" size={22} />}
//         iconBg="warning"
//         stat="97.5K"
//         statTitle="Transaction"
//         options={ordersReceived}
//         series={ordersReceivedSeries}
//         type="area"
//       />
//     );
//   }
// }
// export default OrdersReceived

// import React from 'react'

function OrdersReceived({
  // iconBg,
  // stat,
  heading,
  productName,
  alert,
  grade,
  partyName,
  SalesPersonName,
  Inactive,
  statTitle,
  statTitle1,
  statTitle2,
  statTitle3,
  statTitle4,
  statTitle5,
  // type,
}) {
  return (
    <div>
      <StatisticsCard
        heading={heading}
        statTitle={statTitle}
        statTitle1={statTitle1}
        statTitle2={statTitle2}
        statTitle3={statTitle3}
        statTitle4={statTitle4}
        statTitle5={statTitle5}
        productName={productName}
        alert={alert}
        grade={grade}
        partyName={partyName}
        SalesPersonName={SalesPersonName}
        Inactive={Inactive}
      />
    </div>
  );
}

export default OrdersReceived;
