package mini_ecm.model;

import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PreRemove;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "employees")
public class Employee {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "middle_name")
	private String middleName;
	
	@Column(name = "last_name")
	private String lastName;

	@Column(name = "position")
	private String position;
	
	@JsonIgnore
	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
	@JoinTable(name = "tasks_employees", 
			joinColumns = @JoinColumn(name = "employee_id"),
            inverseJoinColumns = @JoinColumn(name = "task_id"))
	private Set<Task> tasks;
	
	@JsonIgnore
	@OneToMany(mappedBy = "taskAuthor", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Task> createdMessages;
	
	@JsonIgnore
	@OneToOne(mappedBy = "manager", fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
	private Subvision subvision;
	
	@JsonIgnore
	@OneToOne(mappedBy = "manager", fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
	private Company company;
	
	@PreRemove
	public void preRemove() {
		if (subvision != null) subvision.setManager(null);
		if (company != null) company.setManager(null);
	}

	public String getLastName() {
		return lastName;
	}


	public void setLastName(String lastName) {
		this.lastName = lastName;
	}


	public String getMiddleName() {
		return middleName;
	}


	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}


	public String getFirstName() {
		return firstName;
	}


	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public List<Task> getCreatedMessages() {
		return createdMessages;
	}


	public void setCreatedMessages(List<Task> createdMessages) {
		this.createdMessages = createdMessages;
	}
	
	public Set<Task> getTasks() {
		return tasks;
	}


	public void setTasks(Set<Task> tasks) {
		this.tasks = tasks;
	}


	public String getPosition() {
		return position;
	}


	public void setPosition(String position) {
		this.position = position;
	}


	public Subvision getSubvision() {
		return subvision;
	}


	public void setSubvision(Subvision subvision) {
		this.subvision = subvision;
	}


	public Company getCompany() {
		return company;
	}


	public void setCompany(Company company) {
		this.company = company;
	}

	
	@Override
	public boolean equals(Object empl) {
		if (empl == null) return false;
		if (empl.getClass() != Employee.class) return false;
		if (this.id.equals(((Employee) empl).getId())) return true;
		return false;
	}
	
	@Override
	public int hashCode() {
		if (id == null) return 0;
		return (int) id.longValue();
	}

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder("Id: " + id + ". Name: ");
		
		sb.append(firstName + " ");
		sb.append(middleName + " ");
		sb.append(lastName);
		
		return sb.toString();
	}
	
}
