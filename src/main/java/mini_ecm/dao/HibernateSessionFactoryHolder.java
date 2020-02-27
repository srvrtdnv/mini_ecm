package mini_ecm.dao;

import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;

import mini_ecm.model.Company;
import mini_ecm.model.Employee;
import mini_ecm.model.Subvision;
import mini_ecm.model.Task;

public class HibernateSessionFactoryHolder {
	private static SessionFactory factory;
	
	public static SessionFactory getFactory() {
		if (factory == null) {
			synchronized (HibernateSessionFactoryHolder.class) {
				if (factory == null) {
					Configuration conf = new Configuration().configure();
					StandardServiceRegistryBuilder builder = new StandardServiceRegistryBuilder().applySettings(conf.getProperties());
					conf.addAnnotatedClass(Task.class);
					conf.addAnnotatedClass(Employee.class);
					conf.addAnnotatedClass(Company.class);
					conf.addAnnotatedClass(Subvision.class);
					factory = conf.buildSessionFactory(builder.build());
				}
			}
		}
		return factory;
	}

	
}
