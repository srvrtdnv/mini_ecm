package mini_ecm.service;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import mini_ecm.dao.EmployeeDAO;
import mini_ecm.dao.SubvisionDAO;
import mini_ecm.model.Employee;
import mini_ecm.model.Subvision;

@Path("/subvision")
public class SubvisionService {
	
	@Inject
	private EmployeeDAO emplDao;
	
	@Inject
	private SubvisionDAO subvDao;
	
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAll() {
		List<Subvision> res = subvDao.findAll();
		return Response.accepted(res).build();
	}
	
	@POST
	@Path("/delete/{id}")
	public void deleteTask(@PathParam("id") Long id) {
		Subvision obj = new Subvision();
		obj.setId(id);
		subvDao.delete(obj);
	}
	
	@POST
	@Path("/create")
	@Produces(MediaType.APPLICATION_JSON)
	public Response createCompany(@FormParam("manager") Long manager, @FormParam("name") String name, @FormParam("phAdress") String phNumber, String s) {
		Employee empl = emplDao.findById(manager);
		
		if (empl == null) return Response.accepted("There is no employee with id = " + manager).build();
		
		Subvision subv = new Subvision();
		
		subv.setManager(empl);
		subv.setPhNumber(phNumber);
		subv.setName(name);
		
		subvDao.saveOrUpdate(subv);
		
		return Response.accepted(subv).build();
	}
	
	@POST
	@Path("/update/{id}")
	public Response updTask(@PathParam("id") Long id, @FormParam("manager") Long manager, @FormParam("name") String name, @FormParam("phNumber") String phNumber, String s) {
		
		Subvision subv = subvDao.findById(id);
		
		if (subv == null) return Response.accepted("There is no subvision with id = " + id).build();
		
		Employee empl = emplDao.findById(manager);
		
		if (empl == null) return Response.accepted("There is no employee with id = " + id).build();
		
		
		subv.setName(name);
		subv.setManager(empl);
		subv.setPhNumber(phNumber);
		
		int result = subvDao.saveOrUpdate(subv);
		
		if (result > 0) return Response.accepted("Subvision has been updated.").build();
		else return Response.accepted("Something went wrong.").build();
	}
	
}
