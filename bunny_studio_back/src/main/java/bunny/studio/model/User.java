package bunny.studio.model;

import java.util.*;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "name", nullable = false)
	private String name;

	@OneToMany(
		cascade = CascadeType.ALL,
		fetch = FetchType.EAGER,
		orphanRemoval = true
    )
    private List<Task> Tasks = new ArrayList<>();

	public User() {}

	public User(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + "]";
	}

	// GETERS and SETERS
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String firstName) {
		this.name = firstName;
	}

	public List<Task> getTasks() {
		return Tasks;
	}

	public void setTasks(List<Task> tasks) {
		Tasks = tasks;
	}

}
