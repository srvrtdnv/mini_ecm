package mini_ecm.dao.impl.hibernate;

import java.util.List;

import org.hibernate.Session;

import mini_ecm.dao.EmployeeDAO;
import mini_ecm.model.Employee;

public class HibernateEmployeeDAO implements EmployeeDAO {

	@Override
	public Employee findById(Long id) {
		Session session = HibernateSessionFactoryHolder.getFactory().openSession();
		
		Employee result = session.get(Employee.class, id);
		
		session.close();
		
		return result;
	}

	@Override
	public List<Employee> findAll() {
		Session session = HibernateSessionFactoryHolder.getFactory().openSession();

		List<Employee> result = (List<Employee>) session.createQuery("FROM Employee").list();
		
		session.close();
		
		return result;
	}

	@Override
	public void delete(Employee empl) {
		Session session = HibernateSessionFactoryHolder.getFactory().openSession();
		
		session.delete(empl);
		
		session.close();
	}

	@Override
	public void saveOrUpdate(Employee empl) {
		Session session = HibernateSessionFactoryHolder.getFactory().openSession();
		
		session.saveOrUpdate(empl);
		
		session.close();
	}

}
