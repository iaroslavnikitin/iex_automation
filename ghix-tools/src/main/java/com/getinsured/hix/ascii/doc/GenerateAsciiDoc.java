package com.getinsured.hix.ascii.doc;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.OutputStreamWriter;
import java.io.StringWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;

import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import freemarker.template.Configuration;
import freemarker.template.Template;


public class GenerateAsciiDoc {

	public static void main(String[] args) {

		String fileName = "src/main/resources/ToAsciiDoc.xlsx";
		String directory = "src/main/asciidoc";
		String asciidoc="src/main/asciidoc/api-guide.asciidoc";
		
		try {
			File dir=new File(directory) ;
			if(!dir.exists())
			{
				dir.mkdir();
				System.out.println("Directory Created");
			}
			
			File file = new File(asciidoc);
			
			 if (!file.exists()) {
		            file.createNewFile();
		        }
			
			
			FileWriter fileWriter=new FileWriter(file);
			
			
			Template template=loadTemplateForDoc("src/main/resources/asciiInitDoc.txt");
			 Writer writerinit = new StringWriter();
			 template.process(null, writerinit);
			fileWriter.write(writerinit.toString());
			 template=loadTemplateForDoc("src/main/resources/asciidoc.txt");


			//** Creating Input Stream **//*
			// InputStream myInput= ReadExcelFile.class.getResourceAsStream(
			// fileName );
			FileInputStream myInput = new FileInputStream(fileName);	

			XSSFWorkbook wb = new XSSFWorkbook(myInput);

			XSSFSheet mySheet = wb.getSheetAt(0);

			
			XSSFRow xssfRow;
			
			for (int row = 1; row <= mySheet.getLastRowNum(); row++) {
				xssfRow = mySheet.getRow(row);
				Map<String,Object> replaceableVal=new HashMap<String,Object>();
				replaceableVal.put("heading",xssfRow.getCell(0)!=null ? xssfRow.getCell(0).getStringCellValue().length()!=0 ? xssfRow.getCell(0) : xssfRow.getCell(1)  :xssfRow.getCell(1));
				replaceableVal.put("url", xssfRow.getCell(1)!=null ? xssfRow.getCell(1).getStringCellValue().length()!=0? "["+xssfRow.getCell(1)+"]" : "Not Provided" : "Not Provided");
				replaceableVal.put("input", xssfRow.getCell(6)!=null ? xssfRow.getCell(6).getStringCellValue().length()!=0?xssfRow.getCell(6) : "Not Provided" : "Not Provided");
				replaceableVal.put("output", xssfRow.getCell(7)!=null ? xssfRow.getCell(7).getStringCellValue().length()!=0?xssfRow.getCell(7) : "Not Provided" : "Not Provided");
				replaceableVal.put("method", xssfRow.getCell(3)!=null ? xssfRow.getCell(3).getStringCellValue().length()!=0?xssfRow.getCell(3) : "Not Provided" : "Not Provided");
				replaceableVal.put("owner",xssfRow.getCell(5)!=null? xssfRow.getCell(5).getStringCellValue().length()!=0 ? xssfRow.getCell(5) : "Not Provided" : "Not Provided");
				replaceableVal.put("description", xssfRow.getCell(2)!=null ? xssfRow.getCell(2).getStringCellValue().length()!=0?xssfRow.getCell(2) : "Not Provided" : "Not Provided");
				replaceableVal.put("linkUrl",xssfRow.getCell(6)!=null ? xssfRow.getCell(6).getStringCellValue().length()!=0?xssfRow.getCell(6) : "Not Provided" : "Not Provided");
				replaceableVal.put("responseFormat", xssfRow.getCell(8)!=null? xssfRow.getCell(8).getStringCellValue().length()!=0 ? xssfRow.getCell(8) :"JSON" :"JSON");
				replaceableVal.put("requireAuth", xssfRow.getCell(9)!=null? xssfRow.getCell(9).getStringCellValue().length()!=0 ? xssfRow.getCell(9) : "No"  : "No" );
				replaceableVal.put("sampleRequest", xssfRow.getCell(10)!=null? xssfRow.getCell(10).getStringCellValue().length()!=0 ? xssfRow.getCell(10) :"Sample Request Not Provided" :"Sample Request Not Provided");
				replaceableVal.put("sampleResponse", xssfRow.getCell(11)!=null? xssfRow.getCell(11).getStringCellValue().length()!=0 ? xssfRow.getCell(11) :"Sample Response Not Provided" :"Sample Response Not Provided" );
				
				 Writer out = new OutputStreamWriter(System.out);
		            template.process(replaceableVal, out);
		            out.flush();
		           
		            Writer writer = new StringWriter();
		            template.process(replaceableVal,writer);
		            String sample=writer.toString();
		            fileWriter.write(sample);
		           
		            
			}
			
			 fileWriter.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}


	private static  Template loadTemplateForDoc(String filename) {
		Configuration cfg = new Configuration();
		Template template = null;
		 try {
			 template = cfg.getTemplate(filename);
			
			
		} catch (Exception e) {
			System.out.println("Error in loading Template" +e);
		}
		 return template;
		
	} 
}