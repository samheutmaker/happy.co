import request from 'superagent'
import {
  API_URL
} from './../env';

class Client {
  constructor(baseUrl = "") {
    this.baseUrl = baseUrl;
    this.token = null;
    let token = localStorage.getItem("TRANSCRIBR_TOKEN");
    if (token) {
      this.token = token;
    }
  }
  // Internal
  _getUrl(slug) {
    return `${this.baseUrl}${slug}`;
  }
  _defaultHeaders() {
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };
    if (this.token) {
      headers.token = this.token;
    }
    return headers;
  }
  _setToken(token) {
    localStorage.setItem("TRANSCRIBR_TOKEN", token);
    this.token = token;
  }
  _handleError(error) {
    throw error;
  }
  _handleHTTPError(error) {
    let msg;
    try {
      msg = JSON.parse(error.response.text);
    } catch (e) {
      msg = error && error.response 
        ? error.response.text 
        : { error: 'An error occured while processing the request.'};
    }

    msg = msg.error;
    throw msg;
  }
  // Requests
  get(slug = "", query = {}, headers = {}) {
    return request
      .get(this._getUrl(slug))
      .query(query)
      .set({
        ...headers,
        ...this._defaultHeaders()
      })
      .catch(this._handleHTTPError);
  }
  post(slug = "", data = {}, headers = {}) {
    return request
      .post(this._getUrl(slug))
      .set({
        ...this._defaultHeaders(),
        ...headers,
      })
      .send(data)
      .catch(this._handleHTTPError);
  }
  put(slug = "", data = {}, headers = {}) {
    return request
      .put(this._getUrl(slug))
      .set({
        ...headers,
        ...this._defaultHeaders()
      })
      .send(data)
      .catch(this._handleHTTPError);
  }
  delete(slug = "", data = {}, headers = {}) {
    return request
      .delete(this._getUrl(slug))
      .set({
        ...headers,
        ...this._defaultHeaders()
      })
      .send(data)
      .catch(this._handleHTTPError);
  }
  // Authentication
  register(firstName = "", lastName = "", email = "", password = "") {
    return this.post("/user/register", {
      firstName,
      lastName,
      email,
      password
    })
      .then(res => {
        this._setToken(JSON.parse(res.text).token);
        return res;
      })
      .then(res => {
        return JSON.parse(res.text);
      })
      .catch(this._handleError);
  }
  login(email = "", password = "") {
    return this.post("/user/login", {
      email,
      password
    })
      .then(res => {
        this._setToken(JSON.parse(res.text).token);
        return res;
      })
      .then(res => {
        return JSON.parse(res.text);
      })
      .catch(this._handleError);
  }
  uploadFiles(files) {
    let form = new FormData();
    form.append('file', files);
    form.append("filename", "Sam");
    return this.post('/transcribe', form, {
      "Content-Type": null,
    })
      .then(res => {
        return JSON.parse(res.text);
      })
      .catch(this._handleError);
  }

/*============================================================
Projects
============================================================*/
createProject(project) {
  return this.post("/project/create", project)
  .then(res => {
    return JSON.parse(res.text);
  })
  .catch(this._handleError);
}
getProject(projectId) {
  return this.get(`/project/get/${projectId}`)
    .then(res => {
      return JSON.parse(res.text);
    })
    .catch(this._handleError);
}
listProjects() {
  return this.get("/project/list")
    .then(res => {
      return JSON.parse(res.text);
    })
    .catch(this._handleError);
}
updateProject(project) {
  return this.post("/project/update", project)
    .then(res => {
      return JSON.parse(res.text);
    })
    .catch(this._handleError);
}
deleteProject(projectId) {
  return this.post("/project/delete", { projectId })
    .then(res => {
      return JSON.parse(res.text);
    })
    .catch(this._handleError);
}


}


export default new Client(API_URL);
