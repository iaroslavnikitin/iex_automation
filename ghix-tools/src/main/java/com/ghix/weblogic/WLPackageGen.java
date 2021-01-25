package com.ghix.weblogic;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.jar.JarFile;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * <p>
 * This program reads all jar files from
 * C:\workspace_ghix\ghix-ear\target\ghix\lib and generates
 * <package-name>antlr.*</package-name> elements for weblogic-application.xml
 * file.
 * </p>
 * 
 * @author polimetla_b
 * @since 3/18/2013
 */
public class WLPackageGen {

	private static String ROOT = "C:/workspace_ghix/ghix-ear/target/ghix/lib/";

	private static final Logger LOGGER = LoggerFactory
			.getLogger(WLPackageGen.class);

	/**
	 * @param args
	 */
	public static void main(String[] args) {

		Map<String, ArrayList<String>> jarFiles = new HashMap<String, ArrayList<String>>();
		String files;
		File folder = new File(ROOT);
		File[] listOfFiles = folder.listFiles();

		for (int i = 0; i < listOfFiles.length; i++) {

			if (listOfFiles[i].isFile()) {
				files = listOfFiles[i].getName();
				if (files.contains(".jar")) {
					LOGGER.info("Processing-->" + files);
					ArrayList<String> filesList = getAllClasses(ROOT + files);
					jarFiles.put(files, filesList);
				}
			}
		}

		writeToFile(jarFiles);
		writeToFilePackage(jarFiles);

	}

	public static void writeToFile(Map<String, ArrayList<String>> jarFiles) {
		FileWriter fileWriter = null;
		try {
			File newTextFile = new File(ROOT + "mapping.txt");
			fileWriter = new FileWriter(newTextFile);
			for (String key : jarFiles.keySet()) {
				for (String class1 : jarFiles.get(key)) {
					fileWriter.write(key + ";" + class1 + "\n");
				}
			}
		} catch (IOException ex) {
			LOGGER.error("", ex);
		} finally {
			IOUtils.closeQuietly(fileWriter);
		}
	}

	public static void writeToFilePackage(
			Map<String, ArrayList<String>> jarFiles) {
		FileWriter fileWriter = null;

		Set<String> jarPackage = new HashSet<String>();

		try {
			File newTextFile = new File(ROOT + "packages.txt");
			fileWriter = new FileWriter(newTextFile);
			
			for (String key : jarFiles.keySet()) {
				for (String class1 : jarFiles.get(key)) {
					// fileWriter.write(key + ";" + class1+"\n");
					jarPackage.add(key + ";" + getPackage(class1));
				}
			}

			// Package extraction is over...now write to files.
			for (String key : jarPackage) {
				fileWriter.write(key + "\n");
			}

		} catch (IOException ex) {
			LOGGER.error("", ex);
		} finally {
			IOUtils.closeQuietly(fileWriter);
		}

	}

	public static String getPackage(String fileName) {
		String[] tokens = fileName.split("/");
		// LOGGER.info(tokens.length);
		if (2 == tokens.length) {
			return tokens[0] + ".*";
		}
		if (3 == tokens.length) {
			return tokens[0] + "." + tokens[1] + ".*";
		}
		if (tokens.length >= 4) {
			return tokens[0] + "." + tokens[1] + "." + tokens[2] + ".*";
		}
		return fileName;

	}

	public static ArrayList<String> getAllClasses(String fileName) {
		ArrayList<String> files = new ArrayList<String>();
		JarFile jarFile = null;
		try {
			jarFile = new JarFile(fileName);
		} catch (IOException e) {
			LOGGER.info("Failed to parse" + fileName);

		}
		for (Enumeration em = jarFile.entries(); em.hasMoreElements();) {
			String s = em.nextElement().toString();
			if (s.contains("class")) {
				files.add(s);
			}
		}

		return files;
	}

}
