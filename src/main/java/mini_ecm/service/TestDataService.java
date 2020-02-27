package mini_ecm.service;

import mini_ecm.dao.JDBCTestDataDAO;
import mini_ecm.dao.TestDataDAO;

public class TestDataService {
	
	private TestDataDAO dao = new JDBCTestDataDAO();
	
	public String getById(String id) {
		return dao.getById(id);
	}
	
}
