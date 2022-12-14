import React, { Component } from "react";
import { BreadCrumbs, Icon } from "components";
import AssessmentList from "../common/AssessmentList";
import YearDialogue from "../common/YearDialogue";
import { Screen } from "modules/common";
import { connect } from "react-redux";
import { addBreadCrumbs } from "egov-ui-kit/redux/app/actions";
import Label from "egov-ui-kit/utils/translationNode";

const IconStyle = {
  margin: "0px",
};

const listIconStyle = {
  margin: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  height: "inherit",
};

const innerDivStyle = {
  padding: "20px 56px 20px 50px",
  borderBottom: "1px solid #e0e0e0",
};

class AssessPay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogueOpen: false,
      items: [
        {
          primaryText: <Label label="Add New Property" fontSize="16px" color="#484848" labelStyle={{ fontWeight: 500 }} />,
          route: "/date-dialogue",
          leftIcon: (
            <div style={listIconStyle}>
              <Icon action="content" name="add" color="#484848" style={IconStyle} />
            </div>
          ),
        },
        {
          primaryText: <Label label="Search Property" fontSize="16px" color="#484848" labelStyle={{ fontWeight: 500 }} />,
          route: "/assess-pay/search-property",
          leftIcon: (
            <div style={listIconStyle}>
              <Icon action="action" name="search" color="#484848" style={IconStyle} />
            </div>
          ),
        },
      ],
    };
  }

  componentDidMount = () => {
    const { addBreadCrumbs, title } = this.props;
    title && addBreadCrumbs({ title: title, path: window.location.pathname });
  };

  closeYearRangeDialogue = () => {
    this.setState({ dialogueOpen: false });
  };

  onListItemClick = (item, index) => {
    const { route } = item;

    let path = route && route.slice(1);

    switch (path) {
      case "date-dialogue":
        this.setState({
          dialogueOpen: true,
        });
        break;
      default:
        this.props.history.push(path);
        break;
    }
  };

  render() {
    const { urls, history } = this.props;

    return (
      <Screen>
        <BreadCrumbs url={urls} history={history} />
        <AssessmentList onItemClick={this.onListItemClick} innerDivStyle={innerDivStyle} items={this.state.items} history={this.props.history} />
        <YearDialogue open={this.state.dialogueOpen} closeDialogue={this.closeYearRangeDialogue} />
      </Screen>
    );
  }
}
const mapStateToProps = (state) => {
  const { common, app } = state;
  const { urls } = app;
  // const { generalMDMSDataById } = common;
  // console.log(generalMDMSDataById);
  // const FinancialYear = generalMDMSDataById && generalMDMSDataById.FinancialYear;
  // const getYearList =
  //   FinancialYear &&
  //   Object.keys(FinancialYear).map((year, index) => {
  //     console.log(year);
  //   });

  return { urls };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBreadCrumbs: (url) => dispatch(addBreadCrumbs(url)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssessPay);
