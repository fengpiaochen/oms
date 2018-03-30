<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>oms</title>
    <style type="text/css">
    	#loading {
			position: absolute;
			top: 50%;
			width: 100%;
			margin-top: -70px
		}
		
		#loading .title {
			font-family: "Exo", sans-serif;
			font-size: 2em;
			color: gray;
			text-align: center;
			white-space: nowrap;
			display: block
		}
		
		#loading .logo {
			background: url(resources/images/loading.gif) no-repeat center;
			display: block;
			height: 120px
		}
    </style>
 </head>
<body>
  <div id="loading"><span class="title">资源加载中，请稍后......</span><span class="logo"></span></div>
  <jsp:include page="/resources.jsp"></jsp:include>
</body>
</html>