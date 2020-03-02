package mini_ecm;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import mini_ecm.dao.impl.hibernate.HibernateSessionFactoryHolder;
import mini_ecm.dao.impl.hibernate.HibernateTaskDAO;
import mini_ecm.model.Employee;
import mini_ecm.model.Subvision;
import mini_ecm.model.Task;

@WebServlet(urlPatterns = "")
public class Servlet extends HttpServlet {
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		
		Task task = new Task();
		Employee empl = new Employee();
		Subvision subv= new Subvision();
		
		task.setTaskAuthor(empl);
		task.setText("MY TEXT");
		//task.setControlled(false);
		//task.setDone(false);
		task.setExecutionTime("2 hours");
		task.setSubject("MY SUBJECT");
		
		empl.setFirstName("Ivan");
		empl.setMiddleName("Ivanovich");
		empl.setLastName("Ivanov");
		empl.setPosition("developer");
		
		List<Task> list = new ArrayList<Task>();
		list.add(task);
		
		empl.setCreatedMessages(list);
		
		subv.setName("MY SUBVISION");
		subv.setManager(empl);
		subv.setPhNumber("+74953626961");
		
		
		doHibernateFindTaskByAuthorTest();
		
		req.getRequestDispatcher("/views/dojo_view.html").forward(req, resp);
	}
	
	public void doHibernateFindTaskByAuthorTest() {
		Session session = HibernateSessionFactoryHolder.getFactory().openSession();

		Query qry = session.createQuery("FROM Task WHERE taskAuthor.id = :author");
		
		qry.setParameter("author", 4L);
		
		List<Task> result = (List<Task>) qry.list();
		
		session.close();
		
		System.out.println(result.size());
	}
	
	public void doHibernateTest(Subvision subv) {
		Session session = HibernateSessionFactoryHolder.getFactory().openSession();
		Transaction transaction = session.beginTransaction();
		
		session.save(subv);
		transaction.commit();
		session.close();
		
		System.out.println(new HibernateTaskDAO().findById(4L).getTaskAuthor().getFirstName());
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		super.doPost(req, resp);
	}
	
}
