// Author - bharath k (bharatk7@in.ibm.com)
import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import Card from "react-bootstrap/Card";
import "./products.css";
import { get_coins, fileupload, Ebill } from "../Services/Rest_call";
import { toast } from "react-toastify";
import { GiTwoCoins } from "react-icons/gi";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";
toast.configure();

function Wallet(props) {
  const [resp_data, setdata] = useState("");
  const [selectedFile, setfile] = useState("");
  const [image, setimage] = useState(false);
  const [cnum, setcnum] = useState("");
  const [cname, setcname] = useState("");
  const [state, setstate] = useState("");
  const [amt, setamt] = useState("");
  const [down, setdown] = useState(false);
  const [down1, setdown1] = useState(false);

  useEffect(() => {
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    }
  }, []);

  const onFileChange = (event) => {
    try {
      setfile(event.target.files[0]);
      if (!event.target.files[0].type.match("image.*")) {
        setfile(null);
        toast.error("Please select image file", {
          autoClose: 3000,
        });
      } else {
        setimage(true);
      }
    } catch {
      setfile(null);
    }
  };

  function EhandleSubmit(event) {
    setdown1(true);
    event.preventDefault();
    Ebill(
      event.target.cnum.value,
      event.target.cname.value,
      event.target.state.value,
      event.target.amt.value
    )
      .then(function (response) {
        window.location.reload();
      })
      .catch(function (error) {
        if (!error.response) {
          alert("Connection to host failed");
          setdown1(false);
        } else {
          setdown1(false);
          if (error.response.status === 500) {
            toast.error("Internal Server Error", {
              autoClose: 3000,
            });
          }
          if (error.response.status === 401) {
            localStorage.clear();
            props.update_login();
          }
          if (error.response.status === 400) {
            try {
              if (error.response.data.response !== undefined) {
                toast.error(error.response.data.response, {
                  autoClose: 3000,
                });
              }
            } catch {}
          }
        }
      });
  }

  function handleSubmit() {
    if (selectedFile != null && image) {
      setdown(true);
      const formData = new FormData();
      formData.append("imagefile", selectedFile);
      fileupload(formData)
        .then(function (response) {
          window.location.reload();
        })
        .catch(function (error) {
          if (!error.response) {
            setdown(false);
            alert("Connection to host failed");
          } else {
            setdown(false);
            if (error.response.status === 500) {
              toast.error("Internal Server Error", {
                autoClose: 3000,
              });
            }
            if (error.response.status === 401) {
              localStorage.clear();
              props.update_login();
            }
            if (error.response.status === 400) {
              try {
                if (error.response.data.response !== undefined) {
                  toast.error(error.response.data.response, {
                    autoClose: 3000,
                  });
                }
              } catch {}
            }
          }
        });
    } else {
      setdown(false);
      toast.error("Please select image file", {
        autoClose: 3000,
      });
    }
    setfile(null);
    document.getElementsByClassName("fileupload")[0].value = null;
  }

  useEffect(() => {
    get_coins()
      .then((response) => {
        setdata(response.data);
      })
      .catch(function (error) {
        if (!error.response) {
          alert("Connection to host failed");
        } else {
          if (error.response.status === 401) {
            localStorage.clear();
            props.update_login();
          }
          if (error.response.status === 500) {
            toast.error("Internal Server Error", {
              autoClose: 3000,
            });
          }
        }
      })
      .then(function () {});
  }, [props]);

  return (
    <>
      <div className="Trade_button">
        <span className="earn">Collect Free BioCoins</span>
        <div className="card-rows">
          <Card className="card2 coins">
            <Card.Body>
              <Card.Title>
                <b>BioCoin Balance : </b>
                {resp_data.coins} <GiTwoCoins />
              </Card.Title>
            </Card.Body>
          </Card>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />

      <button type="button" className="collapsible">
        Cab Sharing
        {down && (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            style={{ marginLeft: "5px" }}
          />
        )}
      </button>

      <div className="content1">
        <p className="invoice">Upload Cab Sharing Invoice To Earn BioCoins</p>
        <div className="cabs">
          <input
            className="radio_buttons"
            name={"select-radio"}
            value="ola"
            type="radio"
            required
            defaultChecked
          ></input>
          <label className="label_label">Ola</label>

          <input
            className="radio_buttons"
            name={"select-radio"}
            value="uber"
            type="radio"
            required
            disabled={true}
          ></input>
          <label className="label_label">Uber</label>
        </div>
        <br /> <br />
        <div className="fileup">
          <input type="file" className="fileupload" onChange={onFileChange} />
          <Button
            buttonStyle="btn--fileupload"
            buttonSize="btn--small"
            onClick={handleSubmit}
          >
            Upload
          </Button>
        </div>
      </div>

      <button type="button" className="collapsible">
        Electricity Bill (India)
        {down1 && (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            style={{ marginLeft: "5px" }}
          />
        )}
      </button>

      <div className="content">
        <p className="invoice">Submit Electricity Bill To Earn BioCoins</p>
        <div className="cabs">
          <div id="billformContainer">
            <form onSubmit={EhandleSubmit}>
              <div className="rows">
                <div className="columnb">
                  <label className="theLabelsb">Consumer Number : </label>
                  <input
                    className="theInputsb"
                    value={cnum}
                    onChange={(e) => setcnum(e.target.value)}
                    placeholder="Consumer No"
                    type="number"
                    name="cnum"
                    required
                  />
                </div>
                <div className="columnb">
                  <label className="theLabelsb">Consumer Name : </label>
                  <input
                    className="theInputsb"
                    value={cname}
                    onChange={(e) => setcname(e.target.value)}
                    placeholder="Consumer Name"
                    type="text"
                    name="cname"
                    required
                  />
                </div>
                <div className="columnb">
                  <label className="theLabelsb">State : </label>
                  <input
                    className="theInputsb"
                    value={state}
                    onChange={(e) => setstate(e.target.value)}
                    placeholder="State"
                    type="text"
                    name="state"
                    required
                  />
                </div>
                <div className="columnb">
                  <label className="theLabelsb">Bill Amount : </label>
                  <input
                    className="theInputsb"
                    value={amt}
                    onChange={(e) => setamt(e.target.value)}
                    placeholder="Bill Amount"
                    type="number"
                    name="amt"
                    required
                  />
                </div>
                <Button buttonStyle="btn--fileupload1" buttonSize="btn--small">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Wallet;
