package com.getinsured.xsdmapper;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.channels.Channels;
import java.nio.channels.ReadableByteChannel;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * <p>
 * This program downloads list of XSD files from given list of files. At the end
 * prepares mapping file.
 * </p>
 * 
 * @author polimetla_b
 * @since 11/29/2012
 */
public class XSDDownloader {

	private static String ROOT = "D:/PROJECT/ID-R2/xsd_work/";
	private static StringBuffer ERRORS = new StringBuffer();
	//private static final Logger LOGGER = LoggerFactory.getLogger(XSDDownloader.class);

	private static void createROOT() {
		boolean success = (new File(ROOT)).mkdirs();
		if (!success) {
			System.out.println("Failed to create folder");
		}
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {

		// Step 0: Create output folder
		createROOT();

		//String INPUT_FILE = "list_of_xsd_files_20feb2013.txt";
		String INPUT_FILE = "xsd_files_17nov2014_id.txt";
		
		StringBuffer mappingFile = new StringBuffer();

		// Step 1: Read input file and load it
		List<String> list = getFileContents(ROOT + INPUT_FILE);
		//List<String> list = getFileContents(INPUT_FILE);

		// Step 2: Create folders in given location
		for (String file : list) {

			try {
				URL aURL = new URL(file);
				System.out.println("path = " + aURL.getPath());
				String[] parts = aURL.getPath().split("/");

				StringBuffer sbPart = new StringBuffer();
				for (int i = 0; i < parts.length - 1; i++) {
					sbPart.append(parts[i]).append("/");
				}
				String targetDir = ROOT + "/META-INF/xsd/" + sbPart.toString();

				System.out.println("folder path==>" + targetDir);

				// Create Directories
				File dir = new File(targetDir);
				dir.mkdirs();

				// Download File
				String targetFile = ROOT + "/META-INF/xsd/" + aURL.getPath();
				downloadFile(file, targetFile);

				// Create Mapping File
				// http\://drools.org/schema/drools-service-spring.xsd=drools-service-spring.xsd
				mappingFile.append(file).append("=").append("/META-INF/xsd/")
						.append(aURL.getPath()).append("\n");

			} catch (MalformedURLException e) {
				e.printStackTrace();
			}

		} // End of for loop

		System.out.println("mapping file content==>");
		String mappingContent = mappingFile.toString();
		mappingContent = mappingContent.replaceAll("//", "/");
		mappingContent = mappingContent.replaceAll("http:", "http\\\\:/");
		System.out.println(mappingContent);

		// spring.schemas
		writeToFile(mappingContent);
		writeErrorsToFile(ERRORS.toString());
		System.out.println("----------------- END -----------------");
	}

	public static void writeToFile(String fileContent) {
		FileWriter fileWriter = null;
		try {
			File newTextFile = new File(ROOT + "spring.schemas");
			fileWriter = new FileWriter(newTextFile);
			fileWriter.write(fileContent);
		} catch (IOException ex) {
			ex.printStackTrace();
		} finally {
				IOUtils.closeQuietly(fileWriter);
		}
	}
	
	public static void writeErrorsToFile(String fileContent) {
		FileWriter fileWriter = null;
		try {
			File newTextFile = new File(ROOT + "errors.txt");
			fileWriter = new FileWriter(newTextFile);
			fileWriter.write(fileContent);
		} catch (IOException ex) {
			ex.printStackTrace();
		} finally {
			IOUtils.closeQuietly(fileWriter);
		}
	}

	private static void downloadFile(String url, String destinationFile) {
		FileOutputStream fos = null;
		try {
			URL website = new URL(url);
			ReadableByteChannel rbc = Channels.newChannel(website.openStream());
			fos = new FileOutputStream(destinationFile);
			fos.getChannel().transferFrom(rbc, 0, 1 << 24);
		} catch (Exception ex) {
			ex.printStackTrace();
			ERRORS.append(url).append("\n");
		}finally{
			IOUtils.closeQuietly(fos);
		}
	}

	private static List<String> getFileContents(String fileName) {
		List<String> files = new ArrayList<String>();
		BufferedReader br = null;
		FileInputStream fstream = null;
		try {

			//String path = XSDDownloader.class.getClassLoader().getResource(".").getPath();
			System.out.println("fileName==>"+fileName);
			//System.out.println("path==>"+path);
			//FileInputStream fstream = new FileInputStream(path + "/xsdmapper/"+ fileName);
			fstream = new FileInputStream(fileName);
			if (null == fstream)
				return files;

			// Get the object of DataInputStream
			DataInputStream in = new DataInputStream(fstream);
			if (null == in)
				return files;

			br = new BufferedReader(new InputStreamReader(in));

			if (null == br)
				return files;

			String strLine;
			// Read File Line By Line
			while ((strLine = br.readLine()) != null) {
				// Print the content on the console
				System.out.println(strLine);
				files.add(strLine);
			}
			// Close the input stream
			in.close();
		} catch (Exception e) {// Catch exception if any
			e.printStackTrace();
		}finally{
			IOUtils.closeQuietly(br);
			IOUtils.closeQuietly(fstream);
		}

		return files;
	}

}
