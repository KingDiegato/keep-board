export interface Task {
	title?: string
	description?: string
	id?: string
}

export type TaskArr = Task[]

export interface TaskContextType {
	tasks: Task[]
	dispatch
	addTask
	removeTask
}

export type Action =
	| {
			type: 'ADD_TASK'
			payload: Task
	  }
	| {
			type: 'REMOVE_TASK'
			payload: string
	  }
	| {
			type: 'UPDATE_TASK'
			payload: string
	  }

export type DispatchAction =
	| {
			type: 'ADD_TASK'
			payload: Task[]
	  }
	| {
			type: 'REMOVE_TASK'
			payload: string
	  }
	| {
			type: 'UPDATE_TASK'
			payload: string
	  }
