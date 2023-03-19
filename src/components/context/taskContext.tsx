import React, { createContext, useReducer } from 'react'
import { v4 as uuid } from 'uuid'
import { initialState, reducer } from '../reducer/reducers'
import type { Task, TaskContextType } from '../task'

export const TaskContext = createContext<TaskContextType>({
	tasks: [
		{
			title: 'title',
			description: 'This is the first task of the list',
			id: uuid()
		}
	],
	dispatch: () => {},
	addTask: () => {},
	removeTask: () => {}
})

export function TraskProvider({
	children
}: {
	children: React.ReactNode
}): React.ReactElement {
	const [tasks, dispatch] = useReducer(reducer, initialState)

	const addTask = (newTask: Task): void => {
		dispatch({ type: 'ADD_TASK', payload: newTask })
	}
	const removeTask = (taskId: string): void => {
		dispatch({ type: 'REMOVE_TASK', payload: taskId })
	}
	return (
		<TaskContext.Provider
			value={{
				tasks,
				dispatch,
				addTask,
				removeTask
			}}
		>
			{children}
		</TaskContext.Provider>
	)
}
