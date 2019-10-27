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
  }

  componentDidMount() {
    this.getDogs();
  }

  getDogs() {
    axios
      .get("/api/dogs")
      .then(res => res.data)
      .then(data => {
        this.setState({ dogs: data });
      })
      .catch(err => console.log(err));
    console.log("hi");
  }

  isLoaded() {
    this.setState({ loading: false });
    this.getDogs();
  }

  addDog() {
    this.setState({ loading: true });
    const dog = {
      name: this.state.name,
      breed: this.state.breed
    };

    axios.post("/api/dogs", dog).then(res => {
      this.isLoaded();
    });
  }

  deleteDog(e, id) {
    e.preventDefault();
    this.setState({ loading: true });
    axios.delete(`/api/dogs/${id}`).then(res => this.isLoaded());
  }

  updateDog() {
    this.setState({ loading: true });
    const id = this.state.id;
    const dog = {
      name: this.state.name,
      breed: this.state.breed
    };
    axios.put(`/api/dogs/${id}`, dog).then(res => this.isLoaded());
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  get_Id(event, id) {
    event.preventDefault();
    this.setState({ id });
  }

  star(dog_id, x) {
    if (dog_id === this.state.id) {
      return <div key={x}>&#9733;</div>;
    } else return null;
  }

  render() {
    const { dogs } = this.state;
    return (
      <div>
        <h1>mY rEaCt ApP</h1>
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
        <button onClick={this.addDog}>Submit</button>
        <button onClick={this.updateDog}>Update</button>
      </div>
    );
  }
}

export default App;
