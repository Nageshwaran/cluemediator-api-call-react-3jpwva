import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link, browserHistory, IndexRoute } from "react-router";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { shortlist, rejected, removerejected, removeshortlist } from "./Action";

function mapDispatchToProps(dispatch) {
  return {
    shortlist: user => dispatch(shortlist(user)),
    rejected: user => dispatch(rejected(user)),
    removeshortlist: user => dispatch(removeshortlist(user)),
    removerejected: user => dispatch(removerejected(user))
  };
}

function mapStateToProps(state) {
  return { rejectedval: state.rejected, shortListval: state.shortList };
}

class CandidateDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      candidatedetails: this.props.location.state.detail,
      shortlistdisabled: false,
      rejectedlistdisabled: false
    };
  }

  componentDidMount() {
    let data = JSON.parse(this.state.candidatedetails);
    if (this.props.shortListval.length > 0) {
      this.props.shortListval.filter(d => {
        if (JSON.parse(JSON.parse(d)).id == data.id) {
          this.setState({ shortlistdisabled: true });
        }
      });
    }
    if (this.props.rejectedval.length > 0) {
      this.props.rejectedval.filter(d => {
        if (JSON.parse(JSON.parse(d)).id == data.id) {
          this.setState({ rejectedlistdisabled: true });
        }
      });
    }
  }
  MoreInfo2 = event => {
    event.preventDefault();
    const candidateinfo = event.currentTarget.attributes["def1"].value;
    if (this.state.rejectedlistdisabled) {
      this.props.removerejected({ candidateinfo });
    }

    this.props.shortlist({ candidateinfo });
    this.props.history.goBack();
  };

  MoreInfo3 = event => {
    const candidateinfo = event.currentTarget.attributes["def2"].value;
    if (this.state.shortlistdisabled) {
      this.props.removeshortlist({ candidateinfo });
    }

    this.props.rejected({ candidateinfo });
    this.props.history.goBack();
  };
  render() {
    const { Image, name, id } = JSON.parse(this.state.candidatedetails);
    return (
      <div className="container App">
        <h4 style={{ "text-align": "center" }}>Candidate Details</h4>

        <div className="card2 mx-auto d-block" style={{ align: "center" }}>
          <img
            src={Image}
            alt="Avatar"
            style={{ align: "center", width: 250, height: 250 }}
          />
          <div style={{ "text-align": "center" }}>
            <h4>
              <b>{name}</b>
            </h4>
          </div>
        </div>
        <div class="text-center">
          <button
            def1={JSON.stringify(this.state.candidatedetails)}
            type="button"
            disabled={this.state.shortlistdisabled}
            onClick={e => this.MoreInfo2(e)}
            className="btn btn-success"
          >
            ShortList
          </button>{" "}
          &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <button
            def2={JSON.stringify(this.state.candidatedetails)}
            type="button"
            disabled={this.state.rejectedlistdisabled}
            onClick={e => this.MoreInfo3(e)}
            className="btn btn-danger"
          >
            Reject
          </button>
        </div>
      </div>
    );
  }
}

const Form = connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidateDetails);
export default withRouter(Form);
