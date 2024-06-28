import React from "react";
import StatisticsCard from "../../../../components/@vuexy/statisticsCard/StatisticsCard";
import { Users } from "react-feather";
import { subscribersGained, subscribersGainedSeries } from "./StatisticsData";

class SubscriberGained extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {},
      modal: false,
    };
  }
  LookupviewStart = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };
  render() {
    return (
      <StatisticsCard
        // icon={<Users className="primary" size={22} />}
        // stat="92.6k"
        statTitle="Today's Sales"
        statTitle1="Last
        Month Sales"
        statTitle2=" Average
        Sales"
        statTitle3=" Pending
        Order"
        statTitle4=" Pending
        Delivery"
        options={subscribersGained}
        // series={subscribersGainedSeries}
        // type="area"
      />
    );
  }
}
export default SubscriberGained;
