package mini_ecm.dao.impl.hibernate;

import java.util.List;

import org.hibernate.Session;

import mini_ecm.dao.SubvisionDAO;
import mini_ecm.model.Employee;
import mini_ecm.model.Subvision;

public class HibernateSubvisionDAO implements SubvisionDAO {

	@Override
	public Subvision findById(Long id) {
		Session session = HibernateSessionFactoryHolder.getFactory().openSession();

		Subvision result = session.get(Subvision.class, id);

		session.close();
		
		return result;
	}

	@Override
	public List<Subvision> findAll() {
		Session session = HibernateSessionFactoryHolder.getFactory().openSession();
		
		List<Subvision> result = (List<Subvision>) session.createQuery("FROM Subvision").list();
		
		session.close();
		
		return result;
	}

	@Override
	public void delete(Subvision subv) {
		Session session = HibernateSessionFactoryHolder.getFactory().openSession();

		session.delete(subv);
		
		session.close();
	}

	@Override
	public void saveOrUpdate(Subvision subv) {
		Session session = HibernateSessionFactoryHolder.getFactory().openSession();
		
		session.saveOrUpdate(subv);
		
		session.close();
	}

}
