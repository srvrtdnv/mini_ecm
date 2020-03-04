package mini_ecm.service;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

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
	
	@POST
	@Path("/create")
	public Response createEmployee(@FormParam("lName") String lName, @FormParam("fName") String fName, @FormParam("mName") String mName, @FormParam("position") String position, String s) {
		if (isPositionExist(position)) {
			Employee empl = new Employee();
			empl.setLastName(lName);
			empl.setFirstName(fName);
			empl.setMiddleName(mName);
			empl.setPosition(position);
			dao.saveOrUpdate(empl);
			return Response.accepted(empl.getId()).build();
		} else {
			return Response.accepted(-1).build();
		}
	}
	
	@POST
	@Path("/update/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response updTask(@PathParam("id") Long id, @FormParam("lName") String lName, @FormParam("fName") String fName, @FormParam("mName") String mName, @FormParam("position") String position, String s) {
		
		Employee empl = dao.findById(id);
		
		if (empl == null) return Response.accepted("There is no employee with id = " + id).build();
		
		empl.setFirstName(fName);
		empl.setLastName(lName);
		empl.setMiddleName(mName);
		empl.setPosition(position);
		
		int result = dao.saveOrUpdate(empl);
		
		if (result  > 0) return Response.accepted("Employee has been updated.").build();
		else return Response.accepted("Something went wrong.").build();
	}
	
	public boolean isPositionExist(String position) {
		return true;
	}
}
