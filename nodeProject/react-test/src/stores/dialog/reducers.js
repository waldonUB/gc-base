// todo waldon  ADD_TODO 可以再拆分actionType？

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          text: action.text,
          completed: false,
        },
      ]
    case 'CHANGE_TEXT':
      return action.text
    default:
      return state
  }
}
export default todos
