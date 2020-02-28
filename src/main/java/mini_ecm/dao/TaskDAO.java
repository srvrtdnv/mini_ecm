package mini_ecm.dao;

import java.util.List;

import mini_ecm.model.Task;


public interface TaskDAO {
	
	public Task findById(String id);
	public List<Task> findAll();
	public List<Task> findByAuthor(String author);
	public List<Task> findByDoer(String doer);

}
