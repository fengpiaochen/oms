<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*,
                 com.cssweb.framework.web.util.*,
                 org.apache.commons.lang3.*,
                 javax.servlet.http.*" %>
<%
	String ext = new String("<script type='text/javascript' src='ext/ext-all.js'></script>");
	String appJs = new String("<script type='text/javascript' src='app/app.min.js'></script>");
	String appCss = new String("<link rel='stylesheet' href='resources/css/app.css'/>");
 	
	String defaultProfile = "triton";
	
	String profile = CookieUtils.getCookieValue(request, "profile");
	
	if (StringUtils.isBlank(profile)) {
		profile = defaultProfile;
		Cookie cookie = new Cookie("profile", profile);
		cookie.setMaxAge(Integer.MAX_VALUE);
		cookie.setPath("/");
		response.addCookie(cookie);
	}
	
	if (profile.equals("neptune")) {
%>
		<link rel="stylesheet" href="ext/neptune-en/resources/KitchenSink-all_1.css"/>
	    <link rel="stylesheet" href="ext/neptune-en/resources/KitchenSink-all_2.css"/>
	    <%=appCss %>
	    <%=ext %>
	    <script type="text/javascript" src="ext/neptune-en/theme-neptune.js"></script>
	    <%=appJs %>
<%		
	} else if (profile.equals("neptune-touch")) {
%>
		<link rel="stylesheet" href="ext/neptune-touch-en/resources/KitchenSink-all_1.css"/>
	    <link rel="stylesheet" href="ext/neptune-touch-en/resources/KitchenSink-all_2.css"/>
	    <%=appCss %>
	    <%=ext %>
	    <script type="text/javascript" src="ext/neptune-touch-en/theme-neptune-touch.js"></script>
	    <%=appJs %>
<%		
	} else if (profile.equals("crisp")) {
%>
		<link rel="stylesheet" href="ext/crisp-en/resources/KitchenSink-all_1.css"/>
	    <link rel="stylesheet" href="ext/crisp-en/resources/KitchenSink-all_2.css"/>
	    <%=appCss %>
	    <%=ext %>
	    <script type="text/javascript" src="ext/crisp-en/theme-crisp.js"></script>
	    <%=appJs %>
<%		
	} else if (profile.equals("crisp-touch")) {
%>
		<link rel="stylesheet" href="ext/crisp-touch-en/resources/KitchenSink-all_1.css"/>
	    <link rel="stylesheet" href="ext/crisp-touch-en/resources/KitchenSink-all_2.css"/>
	    <%=appCss %>
	    <%=ext %>
	    <script type="text/javascript" src="ext/crisp-touch-en/theme-crisp-touch.js"></script>
	    <%=appJs %>
<%		
	} else if (profile.equals("classic")) {
%>
		<link rel="stylesheet" href="ext/classic-en/resources/KitchenSink-all_1.css"/>
	    <link rel="stylesheet" href="ext/classic-en/resources/KitchenSink-all_2.css"/>
	    <%=appCss %>
	    <%=ext %>
	    <script type="text/javascript" src="ext/classic-en/theme-classic.js"></script>
	    <%=appJs %>
<%		
	} else if (profile.equals("gray")) {
%>
		<link rel="stylesheet" href="ext/gray-en/resources/KitchenSink-all_1.css"/>
	    <link rel="stylesheet" href="ext/gray-en/resources/KitchenSink-all_2.css"/>
	    <%=appCss %>
	    <%=ext %>
	    <script type="text/javascript" src="ext/gray-en/theme-gray.js"></script>
	    <%=appJs %>
<%		
	} else {
%>
		<link rel="stylesheet" href="ext/triton-en/resources/KitchenSink-all_1.css"/>
	    <link rel="stylesheet" href="ext/triton-en/resources/KitchenSink-all_2.css"/>
	    <%=appCss %>
	    <%=ext %>
	    <script type="text/javascript" src="ext/triton-en/theme-triton.js"></script>
	    <%=appJs %>
<%
	}
%>