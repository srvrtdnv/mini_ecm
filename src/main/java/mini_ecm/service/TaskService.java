package mini_ecm.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import mini_ecm.dao.EmployeeDAO;
import mini_ecm.dao.TaskDAO;
import mini_ecm.model.Employee;
import mini_ecm.model.Task;

@Path("/task")
public class TaskService {
	
	@Inject
	private EmployeeDAO emplDao;
	
	@Inject
	private TaskDAO taskDao;
	
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAll() {
		List<Task> res = taskDao.findAll();
		return Response.accepted(res).build();
	}
	
	@GET
	@Path("/created")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCreated(@Context HttpServletRequest request) {
		List<Task> res = taskDao.findByAuthor(AuthenticationService.getUserId(request.getSession()));
		return Response.accepted(res).build();
	}
	
	@GET
	@Path("/my")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getMyTasks(@Context HttpServletRequest request) {
		List<Task> res = taskDao.findByDoer(AuthenticationService.getUserId(request.getSession()));
		return Response.accepted(res).build();
	}
	
	@POST
	@Path("/delete/{id}")
	public void deleteTask(@PathParam("id") Long id) {
		Task obj = new Task();
		obj.setId(id);
		taskDao.delete(obj);
	}
	
	@POST
	@Path("/create")
	@Produces(MediaType.APPLICATION_JSON)
	public Response createTask(@FormParam("subject") String subject, @FormParam("text") String text, @FormParam("doers") String doers, @FormParam("exTime") String exTime, @FormParam("controlled") boolean isControlled, String s) {
		
		Set<Employee> doersList = new HashSet<Employee>();
		
		for (String id : doers.split(",")) {
			
			Employee empl = emplDao.findById(Long.parseLong(id));
			
			if (empl == null) return Response.accepted("There is no employee with id = " + id).build();
			
			doersList.add(empl);
			
		}
		
		Task task = new Task();
		task.setControlled(isControlled);
		task.setDoers(doersList);
		task.setExecutionTime(exTime);
		task.setSubject(subject);
		task.setText(text);
		task.setTaskAuthor(emplDao.findById(AuthenticationService.getUserId(null)));
		
		for (Employee doer : doersList) {
			
			doer.getTasks().add(task);
			
		}
		
		int result = taskDao.saveOrUpdate(task);
		
		if (result > 0) return Response.accepted("Task has been created.").build();
		else return Response.accepted("Error").build();
	}
	
	@POST
	@Path("/update/{id}")
	public Response updTask(@PathParam("id") Long id, @FormParam("subject") String subject, @FormParam("text") String text, @FormParam("doers") String doers, @FormParam("exTime") String exTime, @FormParam("controlled") boolean isControlled, @FormParam("done") boolean isDone, String s) {
		
		Task task = taskDao.findById(id);
		
		Set<Employee> doersList = new HashSet<Employee>();
		
		for (String doer : doers.split(",")) {
			
			Employee empl = emplDao.findById(Long.parseLong(doer));
			
			if (empl == null) return Response.accepted("There is no employee with id = " + id).build();
			
			doersList.add(empl);
			
			empl.getTasks().add(task);
			
		}
		
		if (task == null) return Response.accepted("There is no task with id = " + id).build();
		
		for (Employee empl : task.getDoers()) {
			
			if (doersList.contains(empl)) continue;
			
			empl.getTasks().remove(task);
			
			emplDao.saveOrUpdate(empl);
			
		}

		task.setSubject(subject);
		task.setText(text);
		task.setExecutionTime(exTime);
		task.setControlled(isControlled);
		task.setDone(isDone);
		task.setDoers(doersList);
		
		int result = taskDao.saveOrUpdate(task);
		
		if (result  > 0) return Response.accepted("Task has been updated.").build();
		else return Response.accepted("Something went wrong.").build();
		
	}
	
}
