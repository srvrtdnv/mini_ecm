package mini_ecm.service;

import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import mini_ecm.dao.TaskDAO;
import mini_ecm.model.Task;

@Path("/task")
public class TaskService {
	
	@Inject
	private TaskDAO dao;
	
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAll() {
		List<Task> res = dao.findAll();
		return Response.accepted(res).build();
	}
	
	@GET
	@Path("/created")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCreated(@Context HttpServletRequest request) {
		List<Task> res = dao.findByAuthor(AuthenticationService.getUserId(request.getSession()));
		return Response.accepted(res).build();
	}
	
	@GET
	@Path("/my")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getMyTasks(@Context HttpServletRequest request) {
		List<Task> res = dao.findByDoer(AuthenticationService.getUserId(request.getSession()));
		return Response.accepted(res).build();
	}
	
	@POST
	@Path("/delete/{id}")
	public void deleteTask(@PathParam("id") Long id) {
		Task obj = new Task();
		obj.setId(id);
		dao.delete(obj);
	}
	
}
