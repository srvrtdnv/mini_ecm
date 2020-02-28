package mini_ecm.dao;

import java.util.List;

import mini_ecm.model.Subvision;


public interface SubvisionDAO {
	
	public Subvision findById(String id);
	public List<Subvision> findAll();

}
