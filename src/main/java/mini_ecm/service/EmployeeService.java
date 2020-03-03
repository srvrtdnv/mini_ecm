package mini_ecm.service;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import mini_ecm.dao.EmployeeDAO;
import mini_ecm.model.Employee;
import mini_ecm.model.Subvision;

@Path("/employee")
public class EmployeeService {

	@Inject
	private EmployeeDAO dao;
	
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAll() {
		List<Employee> res = dao.findAll();
		return Response.accepted(res).build();
	}
	
	@POST
	@Path("/delete/{id}")
	public void deleteTask(@PathParam("id") Long id) {
		Employee obj = new Employee();
		obj.setId(id);
		dao.delete(obj);
	}
}
