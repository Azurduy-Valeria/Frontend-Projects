import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos: string[] = [];
  doneTodos: string[] = [];
  input = "";
  selectedTasks = new Set<number>();

  handleAddTodo() {
    if (this.input) {
      this.todos.push(this.input);
      this.input = "";
    }
  }

  handleSelectTask(index: number) {
    if (this.selectedTasks.has(index)) {
      this.selectedTasks.delete(index);
    } else {
      this.selectedTasks.add(index);
    }
  }

  handleRemoveTodos() {
    this.todos = this.todos.filter((_, index) => !this.selectedTasks.has(index));
    this.selectedTasks.clear();
  }

  handleDoneTodos() {
    const doneTasks = this.todos.filter((_, index) => this.selectedTasks.has(index));
    const remainingTasks = this.todos.filter((_, index) => !this.selectedTasks.has(index));
    this.doneTodos = [...this.doneTodos, ...doneTasks];
    this.todos = remainingTasks;
    this.selectedTasks.clear();
  }
}

