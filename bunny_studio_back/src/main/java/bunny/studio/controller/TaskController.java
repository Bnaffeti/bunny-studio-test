package bunny.studio.controller;

import java.util.HashMap;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bunny.studio.exception.ResourceNotFoundException;
import bunny.studio.model.*;
import bunny.studio.repository.TaskRepository;
import bunny.studio.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class TaskController {

	@Autowired
	private TaskRepository taskRepository;

	@Autowired
	private UserRepository userRepository;

	/**
	 * getAllTasks
	*/
	@GetMapping("/tasks")
	public List<Task> getAllTasks() {
		return taskRepository.findAll();
	}

	/**
	 * getTaskById
	 * @param taskId
	 * @return
	 * @throws ResourceNotFoundException
	 */
	@GetMapping("/tasks/{id}")
	public List<Task> getTasksByUserId(@PathVariable(value = "id") Long userId) throws ResourceNotFoundException {
		return taskRepository.findAll().stream().filter(item -> item.getUser().getId() == userId).collect(Collectors.toList());
	}

	/**
	 * createTask
	 * 
	 * @param task
	 * @return
	 * @throws ResourceNotFoundException
	 */
	@PostMapping("/tasks")
	public Task createTask(@Valid @RequestBody Task task) throws ResourceNotFoundException {
		User user = this.userRepository.findById(task.getUser().getId())
		.orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + task.getUser().getId()));
		task.setUser(user);
		return taskRepository.save(task);
	}


	/**
	 * updateTask
	 * @param taskId
	 * @param taskDetails
	 * @return
	 * @throws ResourceNotFoundException
	*/
	@PutMapping("/tasks/{id}")
	public ResponseEntity<Task> updateTask(@PathVariable(value = "id") Long taskId,
			@Valid @RequestBody Task taskDetails) throws ResourceNotFoundException {
		Task task = taskRepository.findById(taskId)
				.orElseThrow(() -> new ResourceNotFoundException("Task not found for this id :: " + taskId));

		task.setDescription(taskDetails.getDescription());
		task.setState(taskDetails.getState());
		final Task updatedTask = taskRepository.save(task);
		return ResponseEntity.ok(updatedTask);
	}

	/**
	 * deleteTask
	 * @param taskId
	 * @return
	 * @throws ResourceNotFoundException
	 */
	@DeleteMapping("/tasks/{id}")
	public Map<String, Boolean> deleteTask(@PathVariable(value = "id") Long taskId) throws ResourceNotFoundException {
		Task task = taskRepository.findById(taskId)
				.orElseThrow(() -> new ResourceNotFoundException("Task not found for this id :: " + taskId));

		taskRepository.delete(task);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
}
