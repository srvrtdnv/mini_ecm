package mini_ecm.dao;

import java.util.List;

import mini_ecm.model.Company;

public interface CompanyDAO {
	
	public Company findById(String id);
	public List<Company> findAll();
	
}
