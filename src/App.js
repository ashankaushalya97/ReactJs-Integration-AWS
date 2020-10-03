import React from 'react';
import logo from './logo.svg';
import './App.css';
import '@aws-amplify/ui/dist/style.css';
import {Auth,API,graphqlOperation} from 'aws-amplify';
import awsconfig from './aws-exports';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import {Button, withAuthenticator} from 'aws-amplify-react';
Auth.configure(awsconfig);
API.configure(awsconfig);


function createUser(user){
  const newUser = API.graphql(graphqlOperation(mutations.createTodo,{input:{
      name: user['username'],
      description: "UI/UX"
    }}));
    console.log('new :::: ',newUser);
}
function updateData(data,newDesc){
  data['description'] = newDesc;
  console.log("update :::::: ",data);
  API.graphql(graphqlOperation(mutations.updateTodo,{input:{'id':data['id'],'name':data['name'],'description':data['description']}}));
}
function deleteData(data){
  API.graphql(graphqlOperation(mutations.deleteTodo,{input:{"id":data["id"]}}));
}

function App() {
  const allData = API.graphql(graphqlOperation(queries.listTodos));
  console.log("All data ::::: ",allData);

  const getData = API.graphql(graphqlOperation(queries.getTodo,{id:"be781943-04f0-4e12-aae4-a4a888e4fb6a"})).then(todo => {
    console.log("data ::::: ",todo);
    // updateData(todo['data']['getTodo'],"Edit");
    // deleteData(todo['data']['getTodo']);
  }).catch(err=> console.log(err));

  const searchData = API.graphql(graphqlOperation(queries.listTodos,{filter:{name:{eq:"ashan"}}}));
  console.log("Search data :::::::::: ",searchData);

  Auth.currentAuthenticatedUser({
    bypassCache:false
  }).then(user=> {
    console.log("User :::::::: ",JSON.stringify(user));
  }).catch(err=> console.log(err));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Sample App!!!!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default withAuthenticator(App,{includeGreetings: true});
// export default App;
