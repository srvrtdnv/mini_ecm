package mini_ecm.dao.impl.hibernate;

import java.util.List;

import org.hibernate.Session;

import mini_ecm.dao.CompanyDAO;
import mini_ecm.model.Company;

public class HibernateCompanyDAO implements CompanyDAO {

	@Override
	public Company findById(Long id) {
		Session session = HibernateSessionFactoryHolder.getFactory().openSession();
		
		Company result = session.get(Company.class, id);
		
		session.close();
		
		return result;
	}

	@Override
	public List<Company> findAll() {
		Session session = HibernateSessionFactoryHolder.getFactory().openSession();
		
		List<Company> result = (List<Company>) session.createQuery("FROM Company").list();
		
		session.close();
		
		return result;
	}

	@Override
	public void delete(Company comp) {
		Session session = HibernateSessionFactoryHolder.getFactory().openSession();
		
		session.delete(comp);
		
		session.close();
	}

	@Override
	public void saveOrUpdate(Company comp) {
		Session session = HibernateSessionFactoryHolder.getFactory().openSession();
		
		session.saveOrUpdate(comp);
		
		session.close();
	}

}
