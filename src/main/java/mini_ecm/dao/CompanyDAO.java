package mini_ecm.dao;

import java.util.List;

import mini_ecm.model.Company;

public interface CompanyDAO {
	
	public Company findById(Long id);
	public List<Company> findAll();
	public void delete(Company comp);
	public void saveOrUpdate(Company comp);
	
}
