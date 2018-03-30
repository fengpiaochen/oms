package com.cssweb.framework.web.util;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CookieUtils {
	
	public static void addCookie(HttpServletResponse response, String name, String value, String path) {
		Cookie cookie = new Cookie(name, value);
		cookie.setPath(path);
		response.addCookie(cookie);
	}
	
	public static String getCookieValue(HttpServletRequest request, String name) {
		Cookie[] cookies = request.getCookies();
		if (cookies == null) {
			return null;
		}
		for (Cookie cookie : cookies) {
			if (cookie.getName().equalsIgnoreCase(name)) {
				return cookie.getValue();
			}
		}
		return null;
	}
	
}
