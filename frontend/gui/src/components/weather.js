// Author - bharath k (bharatk7@in.ibm.com)
import React from "react";
import { Button } from "./Button";
import { get_weather } from "../Services/Rest_call";
import "./form.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as IoIcons from "react-icons/io5";

toast.configure();

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resp_data: "",
      day_list: "",
      active_index: -1,
      max_temp: "",
      min_temp: "",
      postal: "",
      textAreaValue: "",
      view_day: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleinput = this.handleinput.bind(this);
    this.handleview = this.handleview.bind(this);
  }
  handleview = (event = null, index = null) => {
    if (index === 0) {
      var active = index;
    } else {
      active = event.target.getAttribute("value");
    }
    this.setState({
      active_index: active,
    });

    var element;
    var elements = document.getElementsByClassName("days");
    for (element of elements) {
      element.classList.remove("day_active");
    }
    document.getElementById(active).classList.add("day_active");
  };
  handleinput = (event) => {
    this.setState({
      postal: event.target.value,
    });
  };
  handleSubmit = (event) => {
    var self = this;
    event.preventDefault();

    get_weather(event.target.postal.value)
      .then((res) => {
        this.setState({
          resp_data: res.data,
          day_list: res.data.day,
          max_temp: res.data.max_temp,
          min_temp: res.data.min_temp,
          active_index: 0,
        });
        self.handleview(null, 0);
      })
      .catch(function (error) {
        if (!error.response) {
          alert("Connection to host failed");
        } else {
          if (error.response.status === 500) {
            toast.error("Internal Server Error", {
              autoClose: 3000,
            });
          }
          if (error.response.status === 401) {
            localStorage.clear();
            self.props.update_login();
          }
          if (error.response.status === 400) {
            try {
              if (error.response.data.topic !== undefined) {
                toast.error("Topic : " + error.response.data.topic[0], {
                  autoClose: 3000,
                });
              }
            } catch {}
            try {
              if (error.response.data.description !== undefined) {
                toast.error(
                  "Description : " + error.response.data.description[0],
                  {
                    autoClose: 3000,
                  }
                );
              }
            } catch {}
          }
        }
      });
  };
  render() {
    var day_list = this.state.day_list;
    var active_index = this.state.active_index;
    var resp_data = this.state.resp_data;

    let days;
    let details;
    const getdetails = (index, side) => {
      if (side === 0) {
        details = (
          <>
            <span className="tod">
              <IoIcons.IoSunny className="tod" size={30} />
            </span>

            <br />
            <p className="max_temp visible">
              <b>Min Temparature : </b>
              {resp_data.min_temp[index] || "NA"}
            </p>
            <p className="max_temp visible">
              <b> Max Temparature : </b>
              {resp_data.max_temp[index] || "NA"}
            </p>
            <p className="max_temp visible">
              <b> Windspeed (mph): </b>
              {resp_data.day_windSpeed[index] || "NA"}
            </p>
            <p className="max_temp visible">
              <b> Windspeed Details : </b>
              {resp_data.day_wind_dir_disc[index] || "NA"}
            </p>

            <p className="max_temp visible">
              <b>Precipitation Chance : </b>
              {resp_data.day_precipChance[index] || "NA"}
            </p>

            <p className="max_temp visible">
              <b>Precipitation Type : </b>
              {resp_data.day_precipType[index] || "NA"}
            </p>

            <p className="max_temp visible">
              <b> Details : </b>
              {resp_data.day_narrative[index] || "NA"}
            </p>
          </>
        );
      } else {
        details = (
          <>
            <span className="tod">
              <IoIcons.IoMoonSharp className="tod" size={30} />
            </span>

            <br />
            <p className="max_temp visible">
              <b>Min Temparature : </b>
              {resp_data.min_temp[index] || "NA"}
            </p>
            <p className="max_temp visible">
              <b> Max Temparature : </b>
              {resp_data.max_temp[index] || "NA"}
            </p>
            <p className="max_temp visible">
              <b>Windspeed (mph): </b>
              {resp_data.night_windSpeed[index] || "NA"}
            </p>
            <p className="max_temp visible">
              <b>Windspeed Details : </b>
              {resp_data.night_wind_dir_disc[index] || "NA"}
            </p>
            <p className="max_temp visible">
              <b>Precipitaion Chance : </b>
              {resp_data.night_precipChance[index] || "NA"}
            </p>
            <p className="max_temp visible">
              <b>Precipitaion Type : </b>
              {resp_data.night_precipType[index] || "NA"}
            </p>
            <p className="max_temp visible">
              <b>Details : </b>
              {resp_data.night_narrative[index] || "NA"}
            </p>
          </>
        );
      }

      return details;
    };

    if (day_list.length !== 0) {
      days = day_list.map((item, index) => (
        <>
          {index === 0 ? (
            <span
              className="days day_active"
              value={index}
              key={item}
              id={index}
              onClick={this.handleview}
            >
              {item}
            </span>
          ) : (
            <span
              className="days "
              value={index}
              key={index}
              id={index}
              onClick={this.handleview}
            >
              {item}
            </span>
          )}
        </>
      ));
    }
    return (
      <div id="wformContainer" onSubmit={this.handleSubmit}>
        <form id="wformC">
          <div className="rows">
            <div className="columnw">
              <input
                className="theInputsw"
                value={this.postal}
                onChange={this.handleinput}
                placeholder="Postal Code"
                type="number"
                name="postal"
                required
              />
              <Button type="submit" buttonStyle="btn--primaryw">
                Search
              </Button>
            </div>
          </div>
        </form>
        {day_list.length > 0 && <div className="scrollable">{days}</div>}
        <div className="container">
          <div className="lh">
            {active_index !== -1 &&
              "Day data for : " &&
              getdetails(active_index, 0)}
          </div>

          <div className="rh">
            {" "}
            {active_index !== -1 &&
              "Day data for : " &&
              getdetails(active_index, 1)}
          </div>
        </div>
      </div>
    );
  }
}
export default Weather;
