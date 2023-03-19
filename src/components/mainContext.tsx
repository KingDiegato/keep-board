import React, { type FormEvent, useRef, useContext, useState } from 'react'
import { v4 as uuid } from 'uuid'
import styles from './styles/task.module.css'
import { TaskContext } from './context/taskContext'

export function MainContext(): React.ReactElement {
	const [error, setError] = useState(false)
	const { addTask, removeTask, tasks } = useContext(TaskContext)

	const titleRef = useRef<HTMLInputElement>(null)
	const descRef = useRef<HTMLInputElement>(null)

	const handleSubmit = (event: FormEvent): void => {
		event.preventDefault()
		if (titleRef.current === null) return
		if (descRef.current === null) return

		const title = titleRef.current.value
		const description = descRef.current.value
		if (title.length <= 0) {
			setError(true)
			throw new Error('Title Must have at Least 1 Letter')
		}
		const newTask = {
			title,
			description,
			id: uuid()
		}
		addTask(newTask)
		setError(false)
		titleRef.current.value = ''
		descRef.current.value = ''
	}

	return (
		<>
			<form className={styles.submit} onSubmit={handleSubmit}>
				<label htmlFor='input-title'>
					<strong>TITLE</strong>
				</label>
				<input
					ref={titleRef}
					className={styles.input}
					required
					type='text'
					id='input-title'
					placeholder='Buy Glasses..., Go to the School..., Cooking Dinner...'
				/>
				<label htmlFor='input-description'>
					<small>DESCRIPTION</small>
				</label>
				<input
					ref={descRef}
					className={styles.input}
					type='text'
					id='input-description'
					placeholder='Need to buy my new glasses...'
				/>
				<button className={styles.button_create}>Create Task</button>
				<p style={{ color: 'red' }}>
					{error && 'Title Must have at least 1 Word'}
				</p>
			</form>
			<main>
				<ul className={styles.list}>
					{tasks.map((items) => {
						return (
							<li key={items.id} className={styles.list_item}>
								<details open>
									<summary
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center'
										}}
									>
										<span className={styles.list_title}>{items.title}</span>
										<div style={{ display: 'flex', gap: '10px' }}>
											<p
												style={{ fontSize: '24px', margin: '0', color: 'lime' }}
												onClick={function taskEdit() {}}
											>
												🖊
											</p>
											<p
												style={{ fontSize: '24px', margin: '0', color: 'red' }}
												onClick={function taskRemover() {
													const itemsId = items.id
													removeTask(itemsId)
												}}
											>
												🗑
											</p>
										</div>
									</summary>
									<p style={{ width: '30ch' }}>{items.description}</p>
								</details>
							</li>
						)
					})}
				</ul>
			</main>
		</>
	)
}
