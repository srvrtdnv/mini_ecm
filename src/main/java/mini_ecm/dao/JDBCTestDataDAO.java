package mini_ecm.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class JDBCTestDataDAO implements TestDataDAO {
	
	static {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		} catch (ClassNotFoundException e) {
		}
	}

	@Override
	public String getById(String id) {
		try {
			Connection con = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/mini_ecm", "root", "root");
			
			Statement stmnt = con.createStatement();
			
			ResultSet rs = stmnt.executeQuery("SELECT * FROM test WHERE id = " + id + ";");
			
			if (rs.next()) return rs.getString("text");
		} catch (SQLException e) {
		}
		return "";
	}

}
