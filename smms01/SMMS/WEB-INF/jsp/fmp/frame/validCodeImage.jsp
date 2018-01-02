<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.awt.*,java.awt.image.*,java.util.*,javax.imageio.*"%>
<%@ page import="java.io.OutputStream"%>
<%!Color getRandColor(int fc, int bc) {
		//给定范围获得随机颜色  
		Random random = new Random();
		if (fc > 255)
			fc = 255;
		if (bc > 255)
			bc = 255;
		int r = fc + random.nextInt(bc - fc);
		int g = fc + random.nextInt(bc - fc);
		int b = fc + random.nextInt(bc - fc);
		return new Color(r, g, b);
	}%>
<%
	String randCode = "";	
	try {
		//设置页面不缓存  
		response.setHeader("Pragma", "No-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 0);
		// 在内存中创建图象   
		int width = 60, height = 20;
		BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
		//返回客户端的输出流
		OutputStream os = response.getOutputStream();
		// 获取图形上下文   
		Graphics g = image.getGraphics();
		//生成随机类对象   
		Random random = new Random();
		// 设定背景色  
		g.setColor(getRandColor(200, 250));
		g.fillRect(0, 0, width, height);
		//设定字体
		g.setFont(new Font("Times New Roman", Font.PLAIN, 18));
		//随机生成155条干扰线
		g.setColor(getRandColor(160, 200));
		for (int i = 0; i < 155; i++) {
			int x = random.nextInt(width);
			int y = random.nextInt(height);
			int xl = random.nextInt(12);
			int yl = random.nextInt(12);
			g.drawLine(x, y, x + xl, y + yl);
		}
		//随机生成 Aa-Zz 0-9的4位验证码！ 
		
		char[] str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".toCharArray();
		for (int i = 0; i < 4; i++) {
			String rand = String.valueOf(str[random.nextInt(36)]);
			randCode += rand;
			// 将认证码显示到图象中  
			g.setColor(new Color(20 + random.nextInt(110), 20 + random
					.nextInt(110), 20 + random.nextInt(110)));
			g.drawString(rand, 13 * i + 6, 16);
		}

		// 将认证码存入SESSION 
		session.setAttribute("randCode", randCode);
		// 图象生效 
		g.dispose();

		//输出图像到页面！
		ImageIO.write(image, "JPEG", os);
		os.flush();
		os.close();
		os = null;
		response.flushBuffer();
	
		out.clear();
		out = pageContext.pushBody();
	} catch (IllegalStateException e) {
		System.out.println(e.getMessage());
		e.printStackTrace();
	}
%>
