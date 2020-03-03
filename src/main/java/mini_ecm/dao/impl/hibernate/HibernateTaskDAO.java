package mini_ecm.dao.impl.hibernate;

import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.transaction.Transactional;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import mini_ecm.dao.TaskDAO;
import mini_ecm.model.Task;


public class HibernateTaskDAO implements TaskDAO {

	@Override
	public Task findById(Long id) {
		Session session = HibernateSessionFactoryHolder.getFactory().openSession();

		Task result = session.get(Task.class, id);
		
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
	public void delete(Task task) {
		Session session = HibernateSessionFactoryHolder.getFactory().openSession();

		task = findById(task.getId());
		
		Transaction t = session.beginTransaction();
		
		session.delete(task);
		
		t.commit();
		
		session.close();
	}

	@Override
	public void saveOrUpdate(Task task) {
		Session session = HibernateSessionFactoryHolder.getFactory().openSession();
		
		session.saveOrUpdate(task);
		
		
		session.close();
	}

}
