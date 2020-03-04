package mini_ecm.dao;

import java.util.List;

import mini_ecm.model.Company;

public interface CompanyDAO {
	
	public Company findById(Long id);
	public List<Company> findAll();
	public int delete(Company comp);
	public int saveOrUpdate(Company comp);
	
}
