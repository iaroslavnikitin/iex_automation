/**
 * 
 */
package com.getinsured.cdn.cloud;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Pattern;

/**
 * CDN Bucket access rules.
 * 
 * @author Yevgen Golubenko,BK
 */
public class BucketAccessRules
{
	public static final String NULLANDEMPTY = "NULLANDEMPTY";
	private static Map<String, List<String>> accessList = null;
	private static List<String>              phixStageBuckets, phixProdBuckets  = null;
	private static Map<String, String> 		 bucketList = null;

		
	static
	{
		/*
		 * Old access key validation data. Not in Use
		 */
		accessList = new HashMap<String, List<String>>();

		phixProdBuckets = new ArrayList<>();
		phixProdBuckets.add("cdn.getinsured.com");
		accessList.put("8264ee52f589f4c0191aa94f87aa1aeb", phixProdBuckets); // phix production

		phixStageBuckets = new ArrayList<>();
		phixStageBuckets.add("cdn-staging.getinsured.com");
		accessList.put("06e5c0d0f9eabd9525e5f9dc4f6f37cf", phixStageBuckets); // phix stage
		
		/*
		 * New access key validation data. Use regular expression for dynamic build number.
		 */
		bucketList = new HashMap<>();
		//PHIX
		bucketList.put("cdn(-\\d*)?\\.getinsured.com", "8264ee52f589f4c0191aa94f87aa1aeb");
		bucketList.put("cdn(-\\d*)?-staging.getinsured.com", "06e5c0d0f9eabd9525e5f9dc4f6f37cf");
		bucketList.put("cdn(-\\d*)?-phixstgqa.ghixqa.com", "ae1ef2053dc64ce9ae29ad84ef59cdaf");
		//ID
		bucketList.put("cdn(-\\d*)?\\.yourhealthidaho.org", "79b26ed67db0467b86a33629f9201d78");
		bucketList.put("cdn(-\\d*)?-yhistage.getinsured.com", "8efe08866b2f44d1b92bb669b187d323");
		bucketList.put("cdn(-\\d*)?-idstgqa.ghixqa.com", "6a41903b5483457cb82916297a118acf");
		//NM
		bucketList.put("cdn(-\\d*)?\\.nmhix.com", "42a75e74e0dd4fc49246dc3543cd9570");
		bucketList.put("cdn(-\\d*)?-staging.nmhix.com", "494004ed3bbd4ac08a35f3122f3c2425");
		bucketList.put("cdn(-\\d*)?-nmstgqa.ghixqa.com", "b58ced6f56fe473fb0d89a6966ef224e");
		//MS
		bucketList.put("cdn(-\\d*)?\\.ms-marketplace.com", "4318f0a3156140c58f7feb8e514e7f4f");
		bucketList.put("cdn(-\\d*)?-staging.ms-marketplace.com", "c58aba614fd242458eddbb2cb40a3f09");
		bucketList.put("cdn(-\\d*)?-msstgqa.ghixqa.com", "5106d9825d7e427f92b0952c3e150c17");
		
	}

	/**
	 * Returns list of buckets for given access key. 
	 * 
	 * @param accessKey list of buckets.
	 * @return list of buckets.
	 */
	public static List<String> getBucketsForAccessKey(final String accessKey)
	{
		List<String> list = accessList.get(accessKey);

		if (list == null)
		{
			list = new ArrayList<>();
		}

		return list;
	}

	/**
	 * Returns true or false if access to the given bucket is allowed for the
	 * given access key. Key are only used for stage and prod environment. Qa and dev open always.
	 * 
	 * @param accessKey access key.
	 * @param bucketName bucket name.
	 * @return true if access is allowed, false otherwise.
	 */
	public static boolean isAccessAllowed(final String accessKey, final String bucketName)
	{
		//Old access rules
		//final List<String> accessibleBuckets = getBucketsForAccessKey(accessKey);
		//return accessibleBuckets.contains(bucketName);
		
		//New access rules
		boolean status = false;
		String bucketToVerify = getMatchingBucket(bucketName);
		if(bucketList.containsKey(bucketToVerify) ){
			if( bucketList.get(bucketToVerify).matches(accessKey)){
				status = true;
			}
		}else{
			//This condition for pass all which are not configured 
			status = true;
		}
		return status;
	}
	
	private static String getMatchingBucket(String bucketName) {
		for(String bucket: bucketList.keySet()){
			if(Pattern.compile(bucket).matcher(bucketName).matches()){
				return bucket;
			}
		}
		return null;
	}

	/*
	 * cdn-iexqa.getinsured.com
	 * cdn-phixmain.getinsured.com
	 * cdn-staging.getinsured.com
	 * cdn-iexdev.getinsured.com
	 * cdn-phix1qa.getinsured.com
	 * 
	 * user = secret key
	 * user1 ->
	 * user2 -> staging,iexdev
	 * user3 -> phix1qa
	 * 
	 * take off cdn-(.*).\w+
	 */

	public static void printHelp(final String[] args)
	{
		if (args != null && args.length >= 1 && args[0] != null)
		{
			switch (args[0])
			{
				case "-b":
					if (args.length >= 2 && args[1] != null)
					{
						System.out.println("\nAccessible Buckets for access key: " + args[1]);
						
						if(accessList.get(args[1])!=null){
							for (final String k : accessList.get(args[1]))
							{
								System.out.println("\t" + k);
							}
						}
					}
					else
					{
						System.out.println("Usage: -b <access key>. Access key is required with this argument.");
					}
					break;
				
			}
		}
		else
		{
			System.out.println("Arguments:");
			System.out.println("\t-b <access key> - displays buckets available for given access key");
			System.out.println("\t-u - displays URL mappings for each bucket");
		}
	}

	public static void main(final String[] args)
	{
		
		System.out.println("https://getinsured.com/".substring(0, "https://getinsured.com/".length()-1));
		printHelp(new String[] { "-u" });
		printHelp(new String[] { "-b", "21232f297a57a5a743894a0e4a801fc3" });
		printHelp(new String[] { "-b", "8264ee52f589f4c0191aa94f87aa1aeb" });

		boolean accessAllowed = isAccessAllowed("8264ee52f589f4c0191aa94f87aa1aeb", "cdn-iexqa.getinsured.com");
		System.out.println("Access allowed (should be true) : " + accessAllowed);
		accessAllowed = isAccessAllowed("", "cdn-phix1qa.getinsured.com");
		System.out.println("Access allowed (should be true): " + accessAllowed);
		accessAllowed = isAccessAllowed("06e5c0d0f9eabd9525e5f9dc4f6f37cf", "cdn-staging.getinsured.com");
		System.out.println("Access allowed (should be true): " + accessAllowed);
		accessAllowed = isAccessAllowed("21232f297a57a5a743894a0e4a801fc3_BAD_", "cdn.getinsured.com");
		System.out.println("Access allowed (should be false): " + accessAllowed);
		System.out.println(UUID.randomUUID());
		System.out.println(Pattern.compile("cdn(-\\d*)?.getinsured.com").matcher("cdn.getinsured.com").matches());//cdn-4564387-staging.getinsured.com
		//cdn-8475986-phixstgqa.ghixqa.com
	}
}
