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

import mini_ecm.dao.CompanyDAO;
import mini_ecm.dao.EmployeeDAO;
import mini_ecm.model.Company;
import mini_ecm.model.Employee;
import mini_ecm.model.Subvision;

@Path("/company")
public class CompanyService {
	
	@Inject
	private EmployeeDAO emplDao;
	
	@Inject
	private CompanyDAO compDao;
	
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAll() {
		List<Company> res = compDao.findAll();
		return Response.accepted(res).build();
	}
	
	@POST
	@Path("/delete/{id}")
	public void deleteTask(@PathParam("id") Long id) {
		Company obj = new Company();
		obj.setId(id);
		compDao.delete(obj);
	}
	
	@POST
	@Path("/create")
	@Produces(MediaType.APPLICATION_JSON)
	public Response createCompany(@FormParam("manager") Long manager, @FormParam("name") String name, @FormParam("phAdress") String phAdress, @FormParam("legAdress") String legAdress, String s) {
		Employee empl = emplDao.findById(manager);
		
		if (empl == null) return Response.accepted("Error").build();
		
		Company comp = new Company();
		
		comp.setManager(empl);
		comp.setPhysicalAdd(phAdress);
		comp.setName(name);
		comp.setLegalAdd(legAdress);
		
		compDao.saveOrUpdate(comp);
		
		return Response.accepted("Company has ben created.").build();
	}
	
	@POST
	@Path("/update/{id}")
	public Response updTask(@PathParam("id") Long id, @FormParam("manager") Long manager, @FormParam("name") String name, @FormParam("phAdress") String phAdress, @FormParam("legAdress") String legAdress, String s) {

		Company comp = compDao.findById(id);
		
		if (comp == null) return Response.accepted("There is no subvision with id = " + id).build();
		
		Employee empl = emplDao.findById(manager);
		
		if (empl == null) return Response.accepted("There is no employee with id = " + id).build();
		
		
		comp.setName(name);
		comp.setManager(empl);
		comp.setPhysicalAdd(phAdress);
		comp.setLegalAdd(legAdress);
		
		int result = compDao.saveOrUpdate(comp);
		
		if (result > 0) return Response.accepted("Company has been updated.").build();
		else return Response.accepted("Something went wrong.").build();
	}
	
}
