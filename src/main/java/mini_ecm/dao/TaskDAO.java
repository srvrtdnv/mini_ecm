package mini_ecm.dao;

import java.util.List;

import mini_ecm.model.Task;


public interface TaskDAO {
	
	public Task findById(Long id);
	public List<Task> findAll();
	public List<Task> findByAuthor(Long author);
	public List<Task> findByDoer(Long doer);
	public int delete(Task task);
	public int saveOrUpdate(Task task);

}
