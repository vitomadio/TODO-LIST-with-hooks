import React, {createContext, useReducer} from 'react';

export const StoreContext = createContext({});

const initialState = {todoList: []}

function reducer(state, action) {
  switch (action.type) {
    case 'getTodos':
      return { todoList: action.payload };
    case 'setTodos':
      return { todoList: action.payload };
    case 'addTodo':
      return { todoList: [...state.todoList, action.payload] };
    case 'removeTodo':
      return { todoList: state.todoList.filter(todo => todo.id !== action.payload)}
    default: return state;
  }
}

const Store = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={[state, dispatch]}>{children}</StoreContext.Provider>
  )
}

export default Store;