package mini_ecm.dao;

import java.util.List;

import mini_ecm.model.Employee;


public interface EmployeeDAO {
	
	public Employee findById(Long id);
	public List<Employee> findAll();
	public int delete(Employee empl);
	public int saveOrUpdate(Employee empl);

}
