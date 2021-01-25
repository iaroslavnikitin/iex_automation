package com.getinsured.cdn.cloud;

import java.io.File;
import java.io.IOException;
import java.net.URI;

public class CDNCommandLineHelper {
	
	public static void setupContainer(String[] args) {
		final String bucketAccess = args[7];
		final String bucketName = CDNCommandLineHelper.getValue(bucketAccess,1);
		final String accessKey = CDNCommandLineHelper.getValue(bucketAccess,2);
		validateBucket(bucketName, accessKey);
		
		try
		{
			int ttl = Integer.parseInt(args[8]);
			final RackspaceCDNProvider provider = new RackspaceCDNProvider();
			System.out.format("Creating Bucket Name: %s%n", bucketName);
			provider.createContainer(bucketName);
			System.out.format("Bucket : %s created%n",bucketName);
			System.out.format("Enabling Bucket : %s%n", bucketName);
			provider.enableContainer(bucketName);
			System.out.format("Bucket: %s is now active.%n", bucketName);
			System.out.format("Updating Bucket: %s TTL to : %s%n", bucketName,ttl);
			provider.updateContainerTTL(bucketName, ttl);
			System.out.format("TTL => %s Updated For Container => %s%n",ttl, bucketName);
			System.out.format("Updating CORS for Bucket : %s%n", bucketName);
			provider.updateCorsContainer(bucketName);
			System.out.format("CORS setting updated for Bucket : %s%n", bucketName);
			URI sslUri = provider.getSSLUriOfContainer(bucketName);
			System.out.format("%nBucket : %s Configured with SSL URI :%s%n",bucketName,sslUri);
			provider.close();
		}catch (NumberFormatException ne) {
			System.err.format("Invalid TTL found: %s%n . Setup stoped: %s%n " ,args[8], ne.getMessage());
		}
		catch (final IOException e)
		{
			e.printStackTrace();
			System.err.println("Could not close CDN Provider threads: " + e.getMessage());
		}
	}
	
	public static void createContainer(String[] args){
		final String bucketAccess = args[7];
		final String bucketName = CDNCommandLineHelper.getValue(bucketAccess,1);
		final String accessKey = CDNCommandLineHelper.getValue(bucketAccess,2);
		validateBucket(bucketName, accessKey);
		
		try
		{
			System.out.format("Creating Bucket Name: %s%n", bucketName);
			final RackspaceCDNProvider provider = new RackspaceCDNProvider();
			provider.createContainer(bucketName);
			System.out.format("Bucket %s created%n",bucketName);
			provider.close();
		}
		catch (final IOException e)
		{
			e.printStackTrace();
			System.err.println("Could not close CDN Provider threads: " + e.getMessage());
		}
	}
	
	public static void enableContainer(String[] args){
		final String bucketAccess = args[7];
		final String bucketName = CDNCommandLineHelper.getValue(bucketAccess,1);
		final String accessKey = CDNCommandLineHelper.getValue(bucketAccess,2);
		validateBucket(bucketName, accessKey);
		
		try {
			System.out.format("Enabling Bucket Name: %s%n", bucketName);
			final RackspaceCDNProvider provider = new RackspaceCDNProvider(bucketName);
			provider.enableContainer(bucketName);
			provider.close();
			System.out.format("Bucket Name: %s now active.%n", bucketName);
		} catch (IOException e) {
			e.printStackTrace();
			System.err.println("Could not close CDN Provider threads: " + e.getMessage());
		}
	}
	
	public static void disableContainer(String[] args){
		final String bucketAccess = args[7];
		final String bucketName = CDNCommandLineHelper.getValue(bucketAccess,1);
		final String accessKey = CDNCommandLineHelper.getValue(bucketAccess,2);
		validateBucket(bucketName, accessKey);
		
		try {
			System.out.format("Enabling Bucket Name: %s%n", bucketName);
			final RackspaceCDNProvider provider = new RackspaceCDNProvider(bucketName);
			provider.disableContainer(bucketName);
			provider.close();
			System.out.format("Bucket Name: %s now disabled.%n", bucketName);
		} catch (IOException e) {
			e.printStackTrace();
			System.err.println("Could not close CDN Provider threads: " + e.getMessage());
		}
	}

	
	public static void updateTTLForContainer(String[] args){
		final String bucketAccess = args[7];
		final String bucketName = CDNCommandLineHelper.getValue(bucketAccess,1);
		final String accessKey = CDNCommandLineHelper.getValue(bucketAccess,2);
		
		validateBucket(bucketName, accessKey);
		
		try
		{
			final int ttl = Integer.parseInt(args[8]);
			System.out.format("Upadting Time To Live for Bucket Name: %s%n", bucketName);
			final RackspaceCDNProvider provider = new RackspaceCDNProvider(bucketName);
			provider.updateContainerTTL(bucketName, ttl);
			provider.close();
			System.out.format("TTL => %s Updated For Container => %s%n",ttl, bucketName);
		}
		catch (NumberFormatException ne) {
			System.err.format("Invalid TTL found: %s%n . Setup stoped: %s%n " ,args[8], ne.getMessage());
		}
		catch (final IOException e)
		{
			e.printStackTrace();
			System.err.println("Could not close CDN Provider threads: " + e.getMessage());
		}
			
	}
	
	public static void enableCors(String[] args){
		final String bucketAccess = args[7];
		final String bucketName = getValue(bucketAccess,1);
		final String accessKey = getValue(bucketAccess,2);
		validateBucket(bucketName, accessKey);
		
		try
		{
			final RackspaceCDNProvider provider = new RackspaceCDNProvider(bucketName);
			System.out.format("Enabling CORS for Bucket: %s%n " , bucketName);
			provider.updateCorsContainer(bucketName);
			System.out.format("CORS setting updated for Bucket : %s%n", bucketName);
			provider.close();
		}
		catch (final IOException e1)
		{
			e1.printStackTrace();
			System.err.println("Could not close CDN Provider threads: " + e1.getMessage());
		}
	}
	
	public static void purgeFile(String[] args){
		final String bucketAccess = args[7];
		final String bucketName = getValue(bucketAccess,1);
		final String accessKey = getValue(bucketAccess,2);
		final String filePath = args[8];

		validateBucket(bucketName, accessKey);
		try
		{
			final RackspaceCDNProvider provider = new RackspaceCDNProvider(bucketName);
			System.out.println("Purge file from remote provider: " + bucketName);
			provider.purgeFileFromCDN(filePath);
			provider.close();
			
		}
		catch (final IOException e1)
		{
			e1.printStackTrace();
			System.err.println("Could not close CDN Provider threads: " + e1.getMessage());
		}
	}
	
	public static void deleteFile(String[] args){
		final String bucketAccess = args[7];
		final String bucketName = getValue(bucketAccess,1);
		final String accessKey = getValue(bucketAccess,2);
		String filePath = null;
		if (args.length > 8)
		{
			filePath = args[8];
		}
		validateBucket(bucketName, accessKey);
		
		try
		{
			final RackspaceCDNProvider provider = new RackspaceCDNProvider(bucketName);
			System.out.println("Deleting file from remote provider: " + bucketName);
			if(args[6].equals("--delete-all")){
				provider.deleteFileFromCDN();
			}else if(args[6].equals("--delete-file") && filePath!=null){
				provider.deleteFileFromCDN(filePath);
			}else{
				System.err.println("\n\nE: Invalid number of arguments, should  be --delete-all or --delete \n\n");
			}
			provider.close();
		}
		catch (final IOException e1)
		{
			e1.printStackTrace();
		}
	}
	
	public static void updateLogRetentionForContainer(String[] args){
		final String bucketAccess = args[7];
		final String bucketName = CDNCommandLineHelper.getValue(bucketAccess,1);
		final String accessKey = CDNCommandLineHelper.getValue(bucketAccess,2);
		boolean logRetentionBoolean = false;
		validateBucket(bucketName, accessKey);
		
		try
		{
			if(args[6].equals("--enable-logging")){
				logRetentionBoolean = true;
			}else if(args[6].equals("--disable-logging")){
				logRetentionBoolean = false;
			}else{
				System.err.println("\n\nE: Invalid argument, should  be --enable-logging or --disable-logging \n\n");
			}
			System.out.format("Upadting Logging for Bucket Name: %s%n", bucketName);
			final RackspaceCDNProvider provider = new RackspaceCDNProvider(bucketName);
			provider.updateContainerLogRetention(bucketName, logRetentionBoolean);
			provider.close();
			System.out.format("Logging => %s Updated For Container => %s%n",logRetentionBoolean, bucketName);
		}
		catch (final IOException e)
		{
			e.printStackTrace();
			System.err.println("Could not close CDN Provider threads: " + e.getMessage());
		}
			
	}
	
	public static void pushToContainer(String[] args){
				
		final String bucketAccess = args[7];
		final String bucketName = CDNCommandLineHelper.getValue(bucketAccess,1);
		final String accessKey = CDNCommandLineHelper.getValue(bucketAccess,2);
		final String startDir = args[8];
		String fileFilter = null;

		if (args.length > 9)
		{
			fileFilter = args[9];
		}
		
		System.out.println("\n\n\nExecuting with arguments\n");
		System.out.format("Access Key: %s%nBucket Name: %s%nStarting Directory:%s%n", accessKey, bucketName, startDir);

		final boolean hasAccess = BucketAccessRules.isAccessAllowed(accessKey, bucketName);

		if (!hasAccess)
		{
			System.err.println("\n\nE: Sorry, you don't have access to push to: " + bucketName + "\n\n");
			System.exit(-1);
		}

		try
		{
			final RackspaceCDNProvider provider = new RackspaceCDNProvider(bucketName);
			if(isValidFolderPath(startDir)){
				if (fileFilter != null)
				{
					System.out.println("Applying custom file filter: " + fileFilter);
					provider.pushDirectoryToCDN(startDir, fileFilter);
				}else{
					System.out.println("Using default file filter.");
					provider.pushDirectoryToCDN(startDir);
				}
				System.out.println("Finished pushing files from " + startDir + " to CDN");
				provider.close();
			}
			
		}
		catch (final IOException e)
		{
			e.printStackTrace();
			System.err.println("Could not close CDN Provider threads: " + e.getMessage());
		}
	}
	
	/**
	 * Validate the path is a directory with name resources
	 * @param directory
	 * @return
	 */
	private static boolean isValidFolderPath(String directory) {
		final File dir = new File(directory);
		boolean flag = true;
		if (!dir.isDirectory() || !directory.endsWith("resources") )
		{
			System.err.println("Given path is not a directory name resources: " + directory);
			flag =  false;
		}
		return flag;
	}

	/**
	 * Bucket name and key will be passed with a equal symbol separator and this key is optional
	 * @param bucketAccess e.g cdn.getinsured.com=06e5c0d0f9eabd9525e5f9dc4f6f37cf
	 * @param position e.g 1
	 * @return
	 */
	
	private static String getValue(final String bucketAccess, int position) {
		String value = BucketAccessRules.NULLANDEMPTY;
		if(null != bucketAccess){
			String [] bucketAccessArr = bucketAccess.split("=");
			switch (position) {
			case 1:
				return bucketAccessArr[0];
			case 2:
				return (bucketAccessArr.length>1)?bucketAccessArr[1]:value;
			default:
				return value;
			}
			
		}
		return value;
	}
	
	
	private static void validateBucket(final String bucketName,
			final String accessKey) {
		final boolean hasAccess = BucketAccessRules.isAccessAllowed(accessKey, bucketName);

		if (!hasAccess)
		{
			System.err.format("%n%nE: Sorry, you don't have access to : %s%n " ,bucketName );
			System.exit(-1);
		}
	}

	
	
	

}
