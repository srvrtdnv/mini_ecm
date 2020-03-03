package mini_ecm.dao.impl.hibernate;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import mini_ecm.dao.EmployeeDAO;
import mini_ecm.model.Company;
import mini_ecm.model.Employee;
import mini_ecm.model.Subvision;

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

		empl = findById(empl.getId());
		
		Subvision subv = empl.getSubvision();
		Company comp = empl.getCompany();
		
		Transaction t = session.beginTransaction();
		
		System.out.println(session.contains(empl));
		
		session.delete(empl);
		
		
		if (subv != null) session.merge(subv);
		if (comp != null) session.merge(comp);
		

		session.flush();
		
		t.commit();
		
		session.close();;
	}

	@Override
	public void saveOrUpdate(Employee empl) {
		Session session = HibernateSessionFactoryHolder.getFactory().openSession();
		
		session.saveOrUpdate(empl);
		
		session.close();
	}

}
