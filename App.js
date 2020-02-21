import React, { useEffect, useReducer } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import API, { graphqlOperation } from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub';
import config from './aws-exports'

import CommentInputComponent from './src/components/Comment/CommentInputComponent';
import CommentComponent from './src/components/Comment/CommentComponent';
import CommentLineComponent from './src/components/Comment/CommentLineComponent';

API.configure(config)             // Configure Amplify
PubSub.configure(config)

export default function App() {
  // const [state, dispatch] = useReducer(reducer, initialState)

  // useEffect(() => {
  //   getData()
  // }, [])

  // async function getData() {
  //   const todoData = await API.graphql(graphqlOperation(listTodos))
  //   dispatch({type:'QUERY', todos: todoData.data.listTodos.items});
  // }

  return (
    <View style={styles.container}>
      <CommentComponent eventId={'123'}/>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1
    }
});

//  // other imports
// import { listTodos } from './src/graphql/queries';

// const initialState = {todos:[]};
// const reducer = (state, action) =>{
//   switch(action.type){
//     case 'QUERY':
//       return {...state, todos:action.todos}
//     case 'SUBSCRIPTION':
//       return {...state, todos:[...state.todos, action.todo]}
//     default:
//       return state
//   }
// };