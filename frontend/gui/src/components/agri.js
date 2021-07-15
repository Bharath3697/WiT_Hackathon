// Author - bharath k (bharatk7@in.ibm.com)
import React, { useState } from "react";
import "./general.css";
import { get_pest_data, get_rec } from "../Services/Rest_call";
import DisplayImg from "./display_images";
import { Button } from "./Button";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function Agri(props) {
  const [down, setdown] = useState(false);
  const [selected, setselect] = useState("");
  const [harmful, setharmful] = useState("");
  const [harmless, setharmless] = useState("");
  const [selected1, setselect1] = useState("");
  const [crop_name, setcrop_name] = useState("");
  const [selecttext, setselecttext] = useState(false);
  const [N, setN] = useState("");
  const [P, setP] = useState("");
  const [K, setK] = useState("");
  const [TMP, setTMP] = useState("");
  const [HUM, setHUM] = useState("");
  const [RF, setRF] = useState("");
  const [PH, setPH] = useState("");
  const [csug, setcsug] = useState(null);

  const handleSubmit = (event) => {
    const self = props;
    event.preventDefault();
    setdown(true);
    get_rec(
      event.target.N.value,
      event.target.P.value,
      event.target.K.value,
      event.target.PH.value,
      event.target.TMP.value,
      event.target.HUM.value,
      event.target.RF.value
    )
      .then(function (response) {
        setdown(false);
        setcsug(response.data.crop);
        document.getElementById(
          "cimg"
        ).src = `https://greenhouse-bucket.s3.us-south.cloud-object-storage.appdomain.cloud/crop_${response.data.crop}.jpg`;
      })
      .catch(function (error) {
        setdown(false);
        if (!error.response) {
          alert("Connection to host failed");
        } else {
          if (error.response.status === 401) {
            localStorage.clear();
            self.update_login();
          }
          if (error.response.status === 500) {
            toast.error("Internal Server Error", {
              autoClose: 3000,
            });
          }
          if (error.response.status === 400) {
            try {
              if (error.response.data.item_name !== undefined) {
                toast.error("Item Name : " + error.response.data.item_name[0], {
                  autoClose: 3000,
                });
              }
            } catch {}
            try {
              if (error.response.data.location !== undefined) {
                toast.error("Location : " + error.response.data.location[0], {
                  autoClose: 3000,
                });
              }
            } catch {}
          }
        }
      });
  };

  const get_pest_info = (event) => {
    const self = props;
    setcrop_name(event.target.getAttribute("value"));
    get_pest_data(event.target.getAttribute("value"))
      .then(function (response) {
        setselect1("1");
        setharmless(response.data.harmless);
        setharmful(response.data.harmful);
        setselecttext(false);
      })
      .catch(function (error) {
        if (!error.response) {
          alert("Connection to host failed");
        } else {
          if (error.response.status === 401) {
            localStorage.clear();
            self.update_login();
          }
          if (error.response.status === 500) {
            toast.error("Internal Server Error", {
              autoClose: 3000,
            });
          } else {
            toast.error("Error loading data", {
              autoClose: 3000,
            });
          }
        }
      });
  };
  const handleclick = (event) => {
    setselect(event.target.getAttribute("name"));
  };
  const changeview = (event) => {
    setselecttext(!selecttext);
  };

  return (
    <div className="agri_container">
    <h4>Knowing the right crop to grow and understanding harmful/harmless pest will return you better yield </h4><br/>
      <div className="agri_box">
        <span className="agriculture" name="crop" onClick={handleclick}>
          Crop Suggestion
        </span>

        <span className="agriculture" name="bug" onClick={handleclick}>
          Pest Identification
        </span>

        <a className="agriculture" name="bug" href="/weather">
          Weather
        </a>
      </div>

      <div className="result_box1">
        {selected === "crop" && (
          <>
            <span className="rec_title">
              Fill the form to get the ML recommended crop :
              {down && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  style={{ marginLeft: "25px" }}
                />
              )}
            </span>
            <div className="crop_cat">
              <form onSubmit={handleSubmit}>
                <div className="headsm">
                  <div className="dis_left">
                    <label className="label_labelml">Nitrogen </label>
                    <input
                      className="ml_boxl"
                      name="N"
                      value={N}
                      type="number"
                      required
                      onChange={(e) => setN(e.target.value)}
                    ></input>
                    <br />
                    <br />
                    <label className="label_labelml">Phosphorus </label>
                    <input
                      className="ml_boxl"
                      name="P"
                      value={P}
                      type="number"
                      required
                      onChange={(e) => setP(e.target.value)}
                    ></input>
                    <br />
                    <br />
                    <label className="label_labelml">Potassium </label>
                    <input
                      className="ml_boxl"
                      name="K"
                      value={K}
                      type="number"
                      required
                      onChange={(e) => setK(e.target.value)}
                    ></input>
                    <br />
                    <br />
                    <label className="label_labelml">Ph </label>
                    <input
                      className="ml_boxl"
                      name="PH"
                      value={PH}
                      type="number"
                      required
                      onChange={(e) => setPH(e.target.value)}
                    ></input>
                    <br />
                    <br />
                  </div>
                  <div className="dis_right">
                    <label className="label_labelm">Temparature </label>
                    <input
                      className="ml_box"
                      name="TMP"
                      value={TMP}
                      type="number"
                      required
                      onChange={(e) => setTMP(e.target.value)}
                    ></input>
                    <br />
                    <br />
                    <label className="label_labelm">Humidity </label>
                    <input
                      className="ml_box"
                      name="HUM"
                      value={HUM}
                      type="number"
                      required
                      onChange={(e) => setHUM(e.target.value)}
                    ></input>
                    <br />
                    <br />
                    <label className="label_labelm">RainFall </label>
                    <input
                      className="ml_box"
                      name="RF"
                      value={RF}
                      type="number"
                      required
                      onChange={(e) => setRF(e.target.value)}
                    ></input>
                    <br />

                    <Button type="submit" buttonStyle="btn--secondaryp">
                      Analyze
                    </Button>
                  </div>
                </div>
              </form>
            </div>
            <div className="output">
              {csug != null && (
                <>
                  <h6 className="op">Recommended Crop : {csug}</h6>
                  <br />
                  <img alt="crop_image" id="cimg" src="" />
                </>
              )}
            </div>
          </>
        )}

        {selected === "bug" && (
          <div className="crop_cat">
            <div className="heads">
              <label className="label_label">Paddy</label>
              <input
                className="radio_buttons"
                name="crop_type"
                value="paddy"
                type="radio"
                required
                onClick={get_pest_info}
              ></input>
              <label className="label_label">Wheat</label>
              <input
                className="radio_buttons"
                name="crop_type"
                value="wheat"
                type="radio"
                required
                onClick={get_pest_info}
              ></input>
              <br />
              <span>More crops will be added soon</span>
              <span className="viewer" onClick={changeview}>
                {selected1 === "1" && selecttext === false && "view harmless"}
                {selected1 === "1" && selecttext === true && "view harmful"}
              </span>
            </div>
            <div>
              {selected1 === "1" && selecttext === true && (
                <DisplayImg
                  pestlist={harmless}
                  name={"Harmless Pests for : " + crop_name}
                />
              )}
              {selected1 === "1" && selecttext === false && (
                <DisplayImg
                  pestlist={harmful}
                  name={"Harmful Pests for : " + crop_name}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Agri;
