import React from "react";
import "./App.css";
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const mapStateToProps = state => {
  return { rejected: state.rejected };
};

class Rejected extends React.Component {
  constructor(props) {
    super(props);
  }

  back = () => {
    console.log("sdfdsfdfsdsad");

    console.log(this.props.history);

    this.props.history.goBack();
  };

  render() {
    return (
      <div className="container App">
        <h4 style={{ "text-align": "center" }}>Rejected Candidate Details</h4>

        <div className="container">
          <div className="row">
            {this.props.rejected.map(x => {
              let j = JSON.parse(JSON.parse(x));
              return (
                <div className="card1">
                  <img
                    src={j.Image}
                    alt="Avatar"
                    style={{ width: 400, height: 300 }}
                  />
                  <div className="container" style={{ width: 400 }}>
                    <h4 className="text-center">
                      <b>{j.name}</b>
                    </h4>
                  </div>
                </div>
              );
            })}
            {this.props.rejected.length == 0 && (
              <div className="text-center">
              <h1>
                {" "}
                <b >No data found to display.</b>
              </h1>
              </div>
            )}
          </div>
        </div>
        <div className="text-center">
          <button
            type="button"
            onClick={this.back}
            className="text-center btn btn-danger"
          >
            Back
          </button>
        </div>
      </div>
    );
  }
}

const Form = connect(
  mapStateToProps,
  null
)(Rejected);
export default withRouter(Form);
