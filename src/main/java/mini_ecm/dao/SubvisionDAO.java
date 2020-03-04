package mini_ecm.dao;

import java.util.List;

import mini_ecm.model.Subvision;


public interface SubvisionDAO {
	
	public Subvision findById(Long id);
	public List<Subvision> findAll();
	public int delete(Subvision subv);
	public int saveOrUpdate(Subvision subv);

}
