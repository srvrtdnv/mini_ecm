package mini_ecm.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "companies")
public class Company {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "legal_adress")
	private String legalAd;
	
	@Column(name = "physical_adress")
	private String physicalAd;
	
	@OneToOne(optional = false, cascade = CascadeType.ALL)
	@JoinColumn(name = "manager")
	private Employee manager;

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	public String getLegalAdd() {
		return legalAd;
	}

	public void setLegalAdd(String legalAdd) {
		this.legalAd = legalAdd;
	}

	public String getPhysicalAdd() {
		return physicalAd;
	}

	public void setPhysicalAdd(String physicalAdd) {
		this.physicalAd = physicalAdd;
	}

	public Employee getManager() {
		return manager;
	}

	public void setManager(Employee manager) {
		this.manager = manager;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	@Override
	public String toString() {
		return name;
	}
	
}
