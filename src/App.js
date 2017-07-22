import React, { Component } from 'react';
import $ from 'jquery';
import uuid from 'uuid';
import Todos from './components/Todos';
import './App.css';
import Projects from './components/projects';
import AddProject from './components/AddProject';


class App extends Component {
  constructor(){
    super();
    this.state = {
      projects: [],
      todos:[],
    }
  }

  getTodos(){
    $.ajax({
      url:'https://jsonplaceholder.typicode.com/todos',
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({todos: data}, function(){
          console.log(this.state);
        });
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
      }
    });
  }

  getProjects(){
    this.setState({projects: [
      {
        id: uuid.v4(),
        title: "business website",
        category: "web design"
      },
      {
        id: uuid.v4(),
        title: "social app",
        category: 'mobile development'
      },
      {
        id: uuid.v4(),
        title: "ecommerce shopping cart",
        category: 'web development'
      }
    ]});
  }

  componentWillMount(){
    this.getProjects();
    this.getTodos();
  }

componentDidMount(){
  this.getTodos();
}

  handleAddProject(project){
    let projects = this.state.projects;
    projects.push(project);
    this.setState({projects:projects});
  }

  handleDeleteProject(id){
    let projects = this.state.projects;
    let index = projects.findIndex(x => x.id === id);
    projects.splice(index, 1);
    this.setState({projects: projects});
  }


  render() {
    return (
      <div className="App">
          <AddProject addProject={this.handleAddProject.bind(this)}/>
          <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)}/>
          <hr />
          <Todos todos={this.state.todos}/>
      </div>
    );
  }
}

export default App;
