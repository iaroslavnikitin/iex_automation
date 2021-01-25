<%--
  Copyright (c) 2002 by Phil Hanna
  All rights reserved.
  
  You may study, use, modify, and distribute this
  software for any purpose provided that this
  copyright notice appears in all copies.
  
  This software is provided without warranty
  either expressed or implied.
--%>
<%@ page import="java.util.*, java.sql.*, javax.sql.*, javax.naming.* " %>
<%
Context ctx = new InitialContext();
DataSource ds = (DataSource)ctx.lookup("java:comp/env/jdbc/ghixDS");
Connection con = null;
	Statement stmt = null;
	ResultSet rs = null;
String status="DOWN";

try {
    con = ds.getConnection();
	    stmt = con.createStatement();
	    rs = stmt.executeQuery("select sysdate from dual");
	    while(rs.next()) {
    	status="UP";
    }
} catch (Exception ex) {
    ex.printStackTrace();
} finally {
    	if (con != null) {
			try{
				con.close();
		    	con = null;
		    }catch (Exception e){
	    		e.printStackTrace();
	    	}
    	}
	   
    	if (stmt != null) {
	    	try{
	    		stmt.close();
	    		stmt = null;
	    	}catch (Exception e){
	    		e.printStackTrace();
	    	}
	    }

	    if (rs != null) {
	    	try{
	    		rs.close();
	    		rs = null;
	    	}catch (Exception e){
	    		e.printStackTrace();
	    	}	    	
	    }
}
%>
 
<html>
   <head>
      <title>Echo</title>
      <style>
      <jsp:include page="style.css" flush="true"/>
      </style>
   </head>
   <body>
      <h1>HTTP Request Headers Received</h1>
      <table border="1" cellpadding="4" cellspacing="0">
      <%
         Enumeration eNames = request.getHeaderNames();
         while (eNames.hasMoreElements()) {
            String name = (String) eNames.nextElement();
            String value = normalize(request.getHeader(name));
      %>
         <tr><td><%= name %></td><td><%= value %></td></tr>
      <%
         }
      %>
      </table>
   </body>
</html>
 
<%=status%>
<%!
   private String normalize(String value)
   {
      StringBuffer sb = new StringBuffer();
      for (int i = 0; i < value.length(); i++) {
         char c = value.charAt(i);
         sb.append(c);
         if (c == ';')
            sb.append("<br>");
      }
      return sb.toString();
   }
%>