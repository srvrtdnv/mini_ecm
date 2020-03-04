package mini_ecm.dao.impl.hibernate;

import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.transaction.Transactional;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import mini_ecm.dao.TaskDAO;
import mini_ecm.model.Employee;
import mini_ecm.model.Task;


public class HibernateTaskDAO implements TaskDAO {

	@Override
	public Task findById(Long id) {
		Session session = HibernateSessionFactoryHolder.getFactory().openSession();
		
		Transaction trans = session.beginTransaction();
		
		Task result = session.get(Task.class, id);
		
		session.flush();
		
		trans.commit();
		
		session.close();
		
		return result;
	}

	@Override
	public List<Task> findAll() {
		Session session = HibernateSessionFactoryHolder.getFactory().openSession();

		List<Task> result = (List<Task>) session.createQuery("FROM Task").list();
		
		
		session.close();
		
		return result;
	}

	@Override
	public List<Task> findByAuthor(Long author) {
		Session session = HibernateSessionFactoryHolder.getFactory().openSession();
		
		
		Query qry = session.createQuery("FROM Task t WHERE taskAuthor.id = :author");
		
		qry.setParameter("author", author);
		
		List<Task> result = (List<Task>) qry.list();
		
		
		session.close();
		
		return result;
	}

	@Override
	public List<Task> findByDoer(Long doerId) {
		Session session = HibernateSessionFactoryHolder.getFactory().openSession();

		Query qry = session.createQuery("FROM Task t JOIN t.doers d WHERE d.id = :doerId ");
		
		qry.setParameter("doerId", doerId);

		List<Task> result = (List<Task>) qry.list();
		
		
		session.close();
		
		return result;
	}

	@Override
	@Transactional
	public int delete(Task task) {
		Session session = HibernateSessionFactoryHolder.getFactory().openSession();

		task = findById(task.getId());
		
		Transaction t = session.beginTransaction();
		
		session.delete(task);
		
		t.commit();
		
		session.close();
		
		return 1;
	}

	@Override
	public int saveOrUpdate(Task task) {
		Session session = HibernateSessionFactoryHolder.getFactory().openSession();
		
		Transaction trans = session.beginTransaction();
		
		int result = -1;
		try {
			
			session.saveOrUpdate(task);
			
			//autoupdating many-to-many works only with cascade all
			for (Employee doer : task.getDoers()) {
				session.merge(doer);
			}
			
			session.flush();
			
			trans.commit();
			
			result = 1;
			
		} finally {
		}
		session.close();
		
		return result;
	}

}
