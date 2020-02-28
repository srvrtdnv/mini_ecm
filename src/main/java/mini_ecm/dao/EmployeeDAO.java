package mini_ecm.dao;

import java.util.List;

import mini_ecm.model.Employee;


public interface EmployeeDAO {
	
	public Employee findById(String id);
	public List<Employee> findAll();

}
