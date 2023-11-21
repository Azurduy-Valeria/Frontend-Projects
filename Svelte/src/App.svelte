<script>
  let todos = [];
  let doneTodos = [];
  let input = "";
  let selectedTasks = new Set();

  const handleAddTodo = () => {
    if (input) {
      todos = [...todos, input];
      input = "";
    }
  };

  const handleSelectTask = (index) => {
    if (selectedTasks.has(index)) {
      selectedTasks.delete(index);
    } else {
      selectedTasks.add(index);
    }
    selectedTasks = new Set(selectedTasks);
  };

  const handleRemoveTodos = () => {
    todos = todos.filter((_, index) => !selectedTasks.has(index));
    selectedTasks = new Set();
  };

  const handleDoneTodos = () => {
    const doneTasks = todos.filter((_, index) => selectedTasks.has(index));
    todos = todos.filter((_, index) => !selectedTasks.has(index));
    doneTodos = [...doneTodos, ...doneTasks];
    selectedTasks = new Set();
  };
</script>

<main>
	<div>
		<h1 class="header">My To-Do List</h1>
		<div class="input-container">
		  <input
			type="text"
			bind:value={input}
			placeholder="Enter a task..."
		  />
		  <button on:click={handleAddTodo}>Add Task</button>
		  <button on:click={handleDoneTodos}>Done</button>
		  <button class="trash-button" on:click={handleRemoveTodos}>🗑️</button>
		</div>
		<div class="tasks-container">
		  <div>
			<h2>Tasks</h2>
			<ul>
			  {#each todos as todo, index (index)}
				<li>
				  <input
					type="checkbox"
					checked={selectedTasks.has(index)}
					on:change={() => handleSelectTask(index)}
				  />
				  {todo}
				</li>
			  {/each}
			</ul>
		  </div>
		  <div>
			<h2>Done</h2>
			<ul>
			  {#each doneTodos as todo, index (index)}
				<li>{todo}</li>
			  {/each}
			</ul>
		  </div>
		</div>
	  </div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	.trash-button {
    font-size: 20px;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  .tasks-container {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  .header {
    text-align: center;
  }
  .input-container {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
  }

</style>