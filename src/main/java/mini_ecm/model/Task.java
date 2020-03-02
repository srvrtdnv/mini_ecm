package mini_ecm.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "tasks")
public class Task {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "text")
	private String text;
	
	@Column(name = "subject")
	private String subject;

	@Column(name = "execution_time")
	private String executionTime;
	
	@Column(name = "is_done", columnDefinition = "boolean default false")
	private boolean isDone;
	
	@Column(name = "is_controlled", columnDefinition = "boolean default false")
	private boolean isControlled;
	
	@ManyToMany(mappedBy = "tasks", fetch = FetchType.EAGER)
	private List<Employee> doers;
	
	@ManyToOne(optional = false, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "author_id", nullable = false)
	private Employee taskAuthor;

	public Employee getTaskAuthor() {
		return taskAuthor;
	}

	public void setTaskAuthor(Employee messageAuthor) {
		this.taskAuthor = messageAuthor;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}
	
	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public List<Employee> getDoers() {
		return doers;
	}

	public void setDoers(List<Employee> doers) {
		this.doers = doers;
	}

	public String getExecutionTime() {
		return executionTime;
	}

	public void setExecutionTime(String executionTime) {
		this.executionTime = executionTime;
	}

	public boolean isDone() {
		return isDone;
	}

	public void setDone(boolean isDone) {
		this.isDone = isDone;
	}

	public boolean isControlled() {
		return isControlled;
	}

	public void setControlled(boolean isControlled) {
		this.isControlled = isControlled;
	}

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder("");
		
		sb.append("Id: " + id);
		sb.append(". Subject: " + subject);
		sb.append(". Text: " + text);
		sb.append(". Is done: " + isDone);
		sb.append(". Is controlled: " + isControlled);
		sb.append(". Author id: " + taskAuthor.getId());
		sb.append(". Doers size: " + doers.size());
		sb.append(". Time: " + executionTime);
		
		return sb.toString();
	}
	
}
