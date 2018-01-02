package com.zstar.SMMS.constant;

import java.io.*;

public class FileOperateUtil {

	private static String filenameTemp;

	public static void createFiles(String path, String fileContent, String fileFormat) {
		filenameTemp = path + fileFormat;
		File f = new File(path);
		File file = new File(filenameTemp);
		try {
			if (!f.exists()) {
				f.mkdir();
			}
			if (!file.exists()) {
				file.createNewFile();

				System.out.println("success create file, the file is " + filenameTemp);

				writeFileContent(filenameTemp, fileContent);
			} else {
				writeFileContent(filenameTemp, fileContent);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void writeFileContent(String filenameTemp, String newstr) {
		String filein;
		FileInputStream fis;
		InputStreamReader isr;
		BufferedReader br;
		FileOutputStream fos;
		PrintWriter pw;
		filein = (new StringBuilder(String.valueOf(newstr))).append("\r\n").toString();
		fis = null;
		isr = null;
		br = null;
		fos = null;
		pw = null;
		try {
			File file = new File(filenameTemp);
			fis = new FileInputStream(file);
			isr = new InputStreamReader(fis);
			br = new BufferedReader(isr);
			StringBuffer buffer = new StringBuffer();
			String temp;
			for (int i = 0; (temp = br.readLine()) != null; i++) {
				buffer.append(temp);
				buffer = buffer.append(System.getProperty("line.separator"));
			}

			buffer.append(filein);
			fos = new FileOutputStream(file);
			pw = new PrintWriter(fos);
			pw.write(buffer.toString().toCharArray());
			pw.flush();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (pw != null)
					pw.close();
				if (fos != null)
					fos.close();
				if (br != null)
					br.close();
				if (isr != null)
					isr.close();
				if (fis != null)
					fis.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	public static boolean copyGeneralFile(String srcPath, String destDir) {
		boolean flag = false;
		File file = new File(srcPath);
		if (!file.exists()) {
			return false;
		}
		if (file.isFile()) {
			flag = copyFile(srcPath, destDir);
		} else if (file.isDirectory()) {
			flag = copyDirectory(srcPath, destDir);
		}
		return flag;
	}

	public static boolean copyFile(String srcPath, String destDir) {
		return copyFile(srcPath, destDir, true);
	}

	public static boolean copyDirectory(String srcPath, String destDir) {
		return copyDirectory(srcPath, destDir, true);
	}

	public static boolean copyFile(String srcPath, String destDir, boolean overwriteExistFile) {
		boolean flag = false;

		File srcFile = new File(srcPath);
		if ((!srcFile.exists()) || (!srcFile.isFile())) {
			return false;
		}
		String fileName = srcFile.getName();
		String destPath = destDir + File.separator + fileName;
		File destFile = new File(destPath);
		if (destFile.getAbsolutePath().equals(srcFile.getAbsolutePath())) {
			return false;
		}
		if ((destFile.exists()) && (!overwriteExistFile)) {
			return false;
		}
		File destFileDir = new File(destDir);
		if ((!destFileDir.exists()) && (!destFileDir.mkdirs())) {
			return false;
		}
		try {
			FileInputStream fis = new FileInputStream(srcPath);
			FileOutputStream fos = new FileOutputStream(destFile);
			byte[] buf = new byte['?'];
			int c;
			while ((c = fis.read(buf)) != -1) {
				fos.write(buf, 0, c);
			}
			fos.flush();
			fis.close();
			fos.close();

			flag = true;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return flag;
	}

	public static boolean copyDirectory(String srcPath, String destDir, boolean overwriteExistDir) {
		if (destDir.contains(srcPath)) {
			return false;
		}
		boolean flag = false;

		File srcFile = new File(srcPath);
		if ((!srcFile.exists()) || (!srcFile.isDirectory())) {
			return false;
		}
		String dirName = srcFile.getName();

		String destDirPath = destDir + File.separator + dirName + File.separator;
		File destDirFile = new File(destDirPath);
		if (destDirFile.getAbsolutePath().equals(srcFile.getAbsolutePath())) {
			return false;
		}
		if ((destDirFile.exists()) && (destDirFile.isDirectory()) && (!overwriteExistDir)) {
			return false;
		}
		if ((!destDirFile.exists()) && (!destDirFile.mkdirs())) {
			return false;
		}
		File[] fileList = srcFile.listFiles();
		if (fileList.length == 0) {
			flag = true;
		} else {
			File[] arrayOfFile1;
			int j = (arrayOfFile1 = fileList).length;
			for (int i = 0; i < j; i++) {
				File temp = arrayOfFile1[i];
				if (temp.isFile()) {
					flag = copyFile(temp.getAbsolutePath(), destDirPath, overwriteExistDir);
				} else if (temp.isDirectory()) {
					flag = copyDirectory(temp.getAbsolutePath(), destDirPath, overwriteExistDir);
				}
				if (!flag) {
					break;
				}
			}
		}
		return flag;
	}

	public static boolean deleteFile(String path) {
		boolean flag = false;

		File file = new File(path);
		if (!file.exists()) {
			return flag;
		}
		flag = file.delete();

		return flag;
	}

	public static boolean cutGeneralFile(String srcPath, String destDir) {
		boolean flag = false;
		if ((copyGeneralFile(srcPath, destDir)) && (deleteFile(srcPath))) {
			flag = true;
		}
		return flag;
	}

	public static void main(String[] args) {
		String mdfPath = "D:\\AC_LOG\\keywords\\";
		String toMdfPath = "D:\\AC_LOG\\action\\app_1505202753.ok";
		cutGeneralFile(toMdfPath, mdfPath);
	}
}
