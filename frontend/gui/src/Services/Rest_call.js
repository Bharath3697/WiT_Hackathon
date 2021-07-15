// Author - bharath k (bharatk7@in.ibm.com)
import axios from "axios";
const apiurl = window.location.origin;
export async function logout() {
  const token = localStorage.getItem("Token");
  return await axios({
    method: "post",
    headers: { Authorization: `Token ${token}` },
    url: apiurl + "/api/logout/",
    data: {
      token: token,
    },
  });
}

export async function login(email, password) {
  return await axios({
    method: "post",
    url: apiurl + "/api/login/",
    data: {
      email: email,
      password: password,
    },
  });
}
export async function Ebill(cnum, cname, state, amount) {
  const token = localStorage.getItem("Token");
  return await axios({
    method: "post",
    headers: { Authorization: `Token ${token}` },
    url: apiurl + "/api/Ebill/",
    data: {
      cnum: cnum,
      cname: cname,
      state: state,
      amount: amount,
    },
  });
}

export async function register(username, email, password, phone_number) {
  return await axios({
    method: "post",
    url: apiurl + "/api/register/",
    data: {
      username: username,
      email: email,
      password: password,
      phone_number: phone_number,
    },
  });
}

export function get_item() {
  const token = localStorage.getItem("Token");
  return axios({
    method: "get",
    headers: { Authorization: `Token ${token}` },
    url: apiurl + "/api/items/",
  });
}

export function get_rec(N, P, K, PH, TMP, HUM, RF) {
  const token = localStorage.getItem("Token");
  return axios({
    method: "get",
    headers: { Authorization: `Token ${token}` },
    url: apiurl + "/api/agri_rec/",
    params: {
      N: N,
      P: P,
      K: K,
      PH: PH,
      TMP: TMP,
      HUM: HUM,
      RF: RF,
    },
  });
}

export function get_coins() {
  const token = localStorage.getItem("Token");
  return axios({
    method: "get",
    headers: { Authorization: `Token ${token}` },
    url: apiurl + "/api/coins/",
  });
}

export function get_donation() {
  const token = localStorage.getItem("Token");
  return axios({
    method: "get",
    headers: { Authorization: `Token ${token}` },
    url: apiurl + "/api/donate/",
  });
}

export function get_job() {
  const token = localStorage.getItem("Token");
  return axios({
    method: "get",
    headers: { Authorization: `Token ${token}` },
    url: apiurl + "/api/opportunity/",
  });
}

export function get_topics() {
  const token = localStorage.getItem("Token");
  return axios({
    method: "get",
    headers: { Authorization: `Token ${token}` },
    url: apiurl + "/api/topic/",
  });
}
export function eachtopic(topicID) {
  const token = localStorage.getItem("Token");
  return axios({
    method: "get",
    headers: { Authorization: `Token ${token}` },

    url: apiurl + `/api/topic/${topicID}`,
  });
}
export function eachitem(prodID) {
  const token = localStorage.getItem("Token");
  return axios({
    method: "get",
    headers: { Authorization: `Token ${token}` },

    url: apiurl + `/api/items/${prodID}`,
  });
}

export function eachdonation(donID) {
  const token = localStorage.getItem("Token");
  return axios({
    method: "get",
    headers: { Authorization: `Token ${token}` },

    url: apiurl + `/api/donate/${donID}`,
  });
}

export function eachjob(jobID) {
  const token = localStorage.getItem("Token");
  return axios({
    method: "get",
    headers: { Authorization: `Token ${token}` },

    url: apiurl + `/api/opportunity/${jobID}`,
  });
}

export function deletedonation(donID) {
  const token = localStorage.getItem("Token");
  return axios({
    method: "delete",
    headers: { Authorization: `Token ${token}` },
    url: apiurl + `/api/donate/${donID}`,
  });
}

export function deletejob(jobID) {
  const token = localStorage.getItem("Token");
  return axios({
    method: "delete",
    headers: { Authorization: `Token ${token}` },
    url: apiurl + `/api/opportunity/${jobID}`,
  });
}

export function deletetopic(topicID) {
  const token = localStorage.getItem("Token");
  return axios({
    method: "delete",
    headers: { Authorization: `Token ${token}` },
    url: apiurl + `/api/topic/${topicID}`,
  });
}

export function deletecomment(commentID) {
  const token = localStorage.getItem("Token");
  return axios({
    method: "delete",
    headers: { Authorization: `Token ${token}` },

    url: apiurl + `/api/discuss/${commentID}`,
  });
}

export function deleteitem(prodID) {
  const token = localStorage.getItem("Token");
  return axios({
    method: "delete",
    headers: { Authorization: `Token ${token}` },

    url: apiurl + `/api/items/${prodID}`,
  });
}

export function comment(topic, comment) {
  const token = localStorage.getItem("Token");
  return axios({
    method: "post",
    headers: { Authorization: `Token ${token}` },
    url: apiurl + "/api/discuss/",
    data: {
      topic: topic,
      comment: comment,
    },
  });
}
export function question(topic, description) {
  const token = localStorage.getItem("Token");
  return axios({
    method: "post",
    headers: { Authorization: `Token ${token}` },
    url: apiurl + "/api/topic/",
    data: {
      topic: topic,
      description: description,
    },
  });
}

export function trade(item_name, location, quantity, amount, metric, op_type) {
  const token = localStorage.getItem("Token");
  return axios({
    method: "post",
    headers: { Authorization: `Token ${token}` },
    url: apiurl + "/api/items/",
    data: {
      item_name: item_name,
      location: location,
      quantity: quantity,
      amount: amount,
      metric: metric,
      op_type: op_type,
    },
  });
}

export function donate(item_name, location) {
  const token = localStorage.getItem("Token");
  return axios({
    method: "post",
    headers: { Authorization: `Token ${token}` },
    url: apiurl + "/api/donate/",
    data: {
      donation_item_name: item_name,
      donation_location: location,
    },
  });
}

export function post_job(looking_for, sector, job_location, res_comments) {
  const token = localStorage.getItem("Token");
  return axios({
    method: "post",
    headers: { Authorization: `Token ${token}` },
    url: apiurl + "/api/opportunity/",
    data: {
      looking_for: looking_for,
      sector: sector,
      job_location: job_location,
      res_comments: res_comments,
    },
  });
}

export function get_pest_data(crop) {
  const token = localStorage.getItem("Token");
  return axios({
    method: "get",
    headers: { Authorization: `Token ${token}` },
    url: apiurl + "/api/pest/",
    params: {
      crop_name: crop,
    },
  });
}

export function get_weather(postal_code) {
  const token = localStorage.getItem("Token");
  return axios({
    method: "get",
    headers: { Authorization: `Token ${token}` },
    url: apiurl + "/api/weather/",
    params: {
      postal_code: postal_code,
    },
  });
}

export function fileupload(formData) {
  const token = localStorage.getItem("Token");
  return axios({
    method: "post",
    headers: { Authorization: `Token ${token}` },
    url: apiurl + "/api/travel/",
    data: formData,
  });
}
