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

import mini_ecm.dao.SubvisionDAO;
import mini_ecm.model.Subvision;
import mini_ecm.model.Task;

@Path("/subvision")
public class SubvisionService {
	
	@Inject
	private SubvisionDAO dao;
	
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAll() {
		List<Subvision> res = dao.findAll();
		return Response.accepted(res).build();
	}
	
	@POST
	@Path("/delete/{id}")
	public void deleteTask(@PathParam("id") Long id) {
		Subvision obj = new Subvision();
		obj.setId(id);
		dao.delete(obj);
	}
	
}
