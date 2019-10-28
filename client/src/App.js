import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dogs: [],
      name: "",
      breed: "",
      id: "",
      token: "",
      email: "",
      password: "",
      loading: false
    };
    this.onChange = this.onChange.bind(this);
    this.addDog = this.addDog.bind(this);
    this.deleteDog = this.deleteDog.bind(this);
    this.updateDog = this.updateDog.bind(this);
    this.get_Id = this.get_Id.bind(this);
    this.isLoaded = this.isLoaded.bind(this);
    this.getDogs = this.getDogs.bind(this);
    this.star = this.star.bind(this);
    this.login = this.login.bind(this);
    this.loadUser = this.loadUser.bind(this);
    this.tokenConfig = this.tokenConfig.bind(this);
    this.userLoggedIn = this.userLoggedIn.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.getDogs();
    this.loadUser();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  star(dog_id, x) {
    if (dog_id === this.state.id) {
      return <div key={x}>&#9733;</div>;
    } else return null;
  }

  userLoggedIn() {
    if (this.state.token) {
      return <div> &#9733; User Logged In &#9733; </div>;
    } else return null;
  }

  isLoaded() {
    this.setState({ loading: false });
    this.getDogs();
  }

  get_Id(event, id) {
    event.preventDefault();
    this.setState({ id });
  }

  logout() {
    this.setState({ token: "" });
  }

  // Setup config/headers and token
  tokenConfig() {
    const { token } = this.state;
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };

    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  }

  // Dog
  // Routes
  getDogs() {
    axios
      .get("api/dogs")
      .then(res => res.data)
      .then(data => {
        this.setState({ dogs: data });
      })
      .catch(err => console.log(err));
    console.log("hi");
  }

  addDog() {
    this.setState({ loading: true });
    const dog = {
      name: this.state.name,
      breed: this.state.breed
    };

    axios.post("api/dogs", dog, this.tokenConfig()).then(res => {
      this.isLoaded();
    });
  }

  deleteDog(e, id) {
    e.preventDefault();
    this.setState({ loading: true });
    axios
      .delete(`api/dogs/${id}`, this.tokenConfig())
      .then(res => this.isLoaded());
  }

  updateDog() {
    this.setState({ loading: true });
    const id = this.state.id;
    const dog = {
      name: this.state.name,
      breed: this.state.breed
    };
    axios
      .put(`api/dogs/${id}`, dog, this.tokenConfig())
      .then(res => this.isLoaded());
  }

  // Auth
  // Routes
  loadUser() {
    axios
      .get("api/auth/user", this.tokenConfig())
      .then(res => console.log(res));
  }

  login() {
    const userCreds = {
      email: this.state.email,
      password: this.state.password
    };
    axios.post("api/auth", userCreds, this.tokenConfig()).then(res => {
      this.setState({ token: res.data.token });
      console.log(this.state.token);
    });
    this.loadUser();
    this.getDogs();
  }

  // Make New User

  render() {
    const { dogs } = this.state;
    return (
      <div>
        <h1>mY rEaCt ApP</h1>
        {this.userLoggedIn()}
        {dogs.map(({ _id, name, breed }) => (
          <div key={_id} style={{ display: "flex" }}>
            <button onClick={e => this.get_Id(e, _id)}>Get Id</button>
            <button onClick={e => this.deleteDog(e, _id)}>Delete</button>
            <div>{this.star(_id)}</div>
            <div>{name}</div>
            <div>{breed}</div>
          </div>
        ))}
        <input onChange={this.onChange} name="name" />
        <input onChange={this.onChange} name="breed" />
        <input onChange={this.onChange} name="email" placeholder="email" />
        <input
          onChange={this.onChange}
          name="password"
          placeholder="password"
        />
        <button onClick={this.addDog}>Submit</button>
        <button onClick={this.updateDog}>Update</button>
        <button onClick={this.login}>Login</button>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default App;
