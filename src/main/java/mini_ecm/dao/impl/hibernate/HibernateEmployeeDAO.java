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
		
		Employee result;
		
		try {
			result = session.get(Employee.class, id);
		}
		finally {
			session.close();
		}
		
		return result;
	}

	@Override
	public List<Employee> findAll() {
		Session session = HibernateSessionFactoryHolder.getFactory().openSession();
		
		List<Employee> result = null;
		
		try {
		
			result = (List<Employee>) session.createQuery("FROM Employee").list();
		
		} finally {
		
			session.close();
		
		}
		
		return result;
	}

	@Override
	public int delete(Employee empl) {
		empl = findById(empl.getId());
		
		Session session = HibernateSessionFactoryHolder.getFactory().openSession();
		
		int result = -1;
		
		if (empl != null) {
			
			Subvision subv = empl.getSubvision();
			Company comp = empl.getCompany();
			
			try {
			
				Transaction t = session.beginTransaction();
				
				session.delete(empl);
				
				if (subv != null) session.merge(subv);
				if (comp != null) session.merge(comp);
		
				session.flush();
				
				t.commit();
				
				result = 1;
			
			} finally {
			
				session.close();
			
			}
			
		}
		
		return result;
	}

	@Override
	public int saveOrUpdate(Employee empl) {
		Session session = HibernateSessionFactoryHolder.getFactory().openSession();
		
		int result = -1;
		
		try {
		
			Transaction trans = session.beginTransaction();
			
			session.saveOrUpdate(empl);
			
			session.flush();
			
			trans.commit();
			
			result = 1;
			
		} finally {

			session.close();
			
		}
		
		return result;
	}

}
