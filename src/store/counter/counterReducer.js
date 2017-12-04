import { counterTypes } from './counterTypesActions'
import { tasksTypes } from '../tasks/tasksTypesActions'

const reducer = (state = 0, action) => {

    let { type } = action

    switch (type) {
        case tasksTypes.ADD_TODO:
        case counterTypes.INCREMENT:
            state++
            break
        case tasksTypes.REMOVE_TODO:
        case counterTypes.DECREMENT:
            if (state > 0) {
                state--
            }
            break
        case tasksTypes.RESET_TODO:
        case counterTypes.RESET:
            state = 0
            break
        default:
            return state
    }

    return state
}

export default reducer