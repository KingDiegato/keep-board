/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { Action, Task, TaskArr } from '../task'
import { v4 as uuid } from 'uuid'

const list: TaskArr = JSON.parse(
	window.localStorage.getItem('taskList') ?? ''
) || [
	{
		title: 'Example',
		description: 'This is an Example of the Task',
		id: uuid()
	},
	{
		title: 'Another Example',
		description: 'Content only can be choice if you open it',
		id: uuid()
	},
	{
		title: 'Try to click over me',
		description: 'Here you can see the Description of the Task',
		id: uuid()
	}
]

const updateLocalStorage = (state: object): void => {
	window.localStorage.setItem('taskList', JSON.stringify(state))
}

export const initialState = list
export const reducer = (state: Task[], action: Action): Task[] => {
	switch (action.type) {
		case 'ADD_TASK': {
			const newState = [...state, action.payload]
			updateLocalStorage(newState)
			return newState
		}
		case 'REMOVE_TASK': {
			const newState = state.filter((task: Task) => task.id !== action.payload)
			updateLocalStorage(newState)
			return newState
		}
		default:
			return state
	}
}
