package mini_ecm.dao.impl.hibernate;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

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
	public int delete(Company comp) {
Session session = HibernateSessionFactoryHolder.getFactory().openSession();
		
		Transaction t = session.beginTransaction();
		
		Query qry = session.createQuery("DELETE Company c WHERE c.id = :id ");
		
		qry.setParameter("id", comp.getId());
		
		qry.executeUpdate();
		
		t.commit();
		
		session.close();
		
		return 1;
	}

	@Override
	public int saveOrUpdate(Company comp) {
		Session session = HibernateSessionFactoryHolder.getFactory().openSession();
		
		int result = -1;
		
		try {
		
			Transaction trans = session.beginTransaction();
			
			session.saveOrUpdate(comp);
			
			session.flush();
			
			trans.commit();
			
			result = 1;
			
		}finally {
		
			session.close();
		
		}
		return result;
	}

}
