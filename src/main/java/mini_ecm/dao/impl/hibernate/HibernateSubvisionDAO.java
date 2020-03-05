package mini_ecm.dao.impl.hibernate;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import mini_ecm.dao.SubvisionDAO;
import mini_ecm.model.Employee;
import mini_ecm.model.Subvision;

public class HibernateSubvisionDAO implements SubvisionDAO {

	@Override
	public Subvision findById(Long id) {
		Session session = HibernateSessionFactoryHolder.getFactory().openSession();
		
		Subvision result;
		
		try {
		
			result = session.get(Subvision.class, id);
		
		} finally {

			session.close();
		
		}
		
		return result;
	}

	@Override
	public List<Subvision> findAll() {
		Session session = HibernateSessionFactoryHolder.getFactory().openSession();
		
		List<Subvision> result;
		
		try {
		
			result = (List<Subvision>) session.createQuery("FROM Subvision").list();
		
		} finally {
			
			session.close();
		
		}
		
		return result;
	}

	@Override
	public int delete(Subvision subv) {
		Session session = HibernateSessionFactoryHolder.getFactory().openSession();
		
		int result = -1;
		
		try {
			
			Transaction t = session.beginTransaction();
			
			Query qry = session.createQuery("DELETE Subvision s WHERE s.id = :id ");
			
			qry.setParameter("id", subv.getId());
			
			qry.executeUpdate();
			
			t.commit();
			
			result = 1;
		
		} finally {
		
			session.close();
		
		}
		
		return result;
	}

	@Override
	public int saveOrUpdate(Subvision subv) {
Session session = HibernateSessionFactoryHolder.getFactory().openSession();
		
		int result = -1;
		
		try {
		
			Transaction trans = session.beginTransaction();
			
			session.saveOrUpdate(subv);
			
			session.flush();
			
			trans.commit();
			
			result = 1;
			
		} finally {
		
			session.close();
		
		}
		
		return result;
	}

}
