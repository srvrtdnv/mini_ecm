package mini_ecm;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import org.glassfish.jersey.internal.inject.AbstractBinder;
import org.glassfish.jersey.server.ResourceConfig;

import mini_ecm.dao.CompanyDAO;
import mini_ecm.dao.EmployeeDAO;
import mini_ecm.dao.SubvisionDAO;
import mini_ecm.dao.TaskDAO;
import mini_ecm.dao.impl.hibernate.HibernateCompanyDAO;
import mini_ecm.dao.impl.hibernate.HibernateEmployeeDAO;
import mini_ecm.dao.impl.hibernate.HibernateSubvisionDAO;
import mini_ecm.dao.impl.hibernate.HibernateTaskDAO;

@ApplicationPath("/api")
public class RestApp extends ResourceConfig {
	
	public RestApp() {
		register(new AbstractBinder() {

			@Override
			protected void configure() {
				bind(HibernateTaskDAO.class).to(TaskDAO.class);
				bind(HibernateCompanyDAO.class).to(CompanyDAO.class);
				bind(HibernateSubvisionDAO.class).to(SubvisionDAO.class);
				bind(HibernateEmployeeDAO.class).to(EmployeeDAO.class);
			}
			
		});
	    packages("mini_ecm", "mini_ecm.service");
	}
	
}
