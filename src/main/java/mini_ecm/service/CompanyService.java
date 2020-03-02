package mini_ecm.service;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import mini_ecm.dao.CompanyDAO;
import mini_ecm.model.Company;

@Path("/company")
public class CompanyService {
	
	@Inject
	private CompanyDAO dao;
	
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAll() {
		List<Company> res = dao.findAll();
		return Response.accepted(res).build();
	}
	
}
