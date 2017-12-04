export const counterTypes = {
    'INCREMENT':'INCREMENT',
    'DECREMENT':'DECREMENT',
    'RESET':'RESET'
}

export const counterActions = {
    [counterTypes.INCREMENT]:() => {
        return {
            type:counterTypes.INCREMENT
        }
    },
    [counterTypes.DECREMENT]:() => {
        return {
            type:counterTypes.DECREMENT
        }
    },
    [counterTypes.RESET]:() => {
        return {
            type:counterTypes.RESET
        }
    }
}