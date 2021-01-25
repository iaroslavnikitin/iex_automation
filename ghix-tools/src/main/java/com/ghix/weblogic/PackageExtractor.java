package com.ghix.weblogic;

public class PackageExtractor {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		
		String temp = getPackage("asdf/sadf/runtime/Cflow$Depth.class");
		System.out.println(temp);
	
	}
	
	public static String getPackage(String fileName)
	{	
		String[] tokens = fileName.split("/");
		System.out.println(tokens.length);
		if(2 == tokens.length)
		{
			return tokens[0]+".*";
		}
		if(3 == tokens.length)
		{
			return tokens[0]+"."+tokens[1]+".*";
		}
		if(4 == tokens.length)
		{
			return tokens[0]+"."+tokens[1]+"."+tokens[2]+".*";
		}
		return fileName;
		
	}

}
