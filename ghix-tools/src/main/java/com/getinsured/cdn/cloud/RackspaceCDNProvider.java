/**
 * 
 */
package com.getinsured.cdn.cloud;

import static java.util.concurrent.Executors.newFixedThreadPool;

import java.io.Closeable;
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.jclouds.ContextBuilder;
import org.jclouds.blobstore.BlobStore;
import org.jclouds.blobstore.BlobStoreContext;
import org.jclouds.io.Payload;
import org.jclouds.io.Payloads;
import org.jclouds.openstack.swift.v1.domain.Container;
import org.jclouds.openstack.swift.v1.domain.ObjectList;
import org.jclouds.openstack.swift.v1.domain.SwiftObject;
import org.jclouds.openstack.swift.v1.features.ObjectApi;
import org.jclouds.openstack.swift.v1.options.ListContainerOptions;
import org.jclouds.rackspace.cloudfiles.v1.CloudFilesApi;
import org.jclouds.rackspace.cloudfiles.v1.domain.CDNContainer;
import org.jclouds.rackspace.cloudfiles.v1.features.CDNApi;
import org.jclouds.rackspace.cloudfiles.v1.options.CreateContainerOptions;
import org.jclouds.rackspace.cloudfiles.v1.options.UpdateCDNContainerOptions;

import com.google.common.collect.ImmutableMap;
import com.google.common.collect.Lists;
import com.google.common.io.ByteSource;
import com.google.common.io.Closeables;
import com.google.common.io.Files;
import com.google.common.util.concurrent.Futures;
import com.google.common.util.concurrent.ListenableFuture;
import com.google.common.util.concurrent.ListeningExecutorService;
import com.google.common.util.concurrent.MoreExecutors;

/**
 * Implementation of Cloud provider for Rackspace file cloud.
 * 
 * @author Yevgen Golubenko,BK
 */
public class RackspaceCDNProvider implements CloudProvider, Closeable
{
	// we can also use this url: https://lon.identity.api.rackspacecloud.com/v2.0/ (from rackspace docs)
	//http://docs.rackspace.com/files/api/v1/cf-devguide/content/Overview-d1e70.html
	public static  String  CLOUD_SERVER_API_URL        = "https://identity.api.rackspacecloud.com/v2.0/";
	public static  String  CLOUD_SERVER_LOGIN_NAME     = "getinsuredbuild";
	public static  String  CLOUD_SERVER_API_KEY        = "630c21b0fb0ada6bfb8074e66be55664";
	public static  String  CLOUD_SERVER_ACCOUNT_NUMBER = "668207";

	private static  String PROVIDER  = System.getProperty("provider.cf", "rackspace-cloudfiles-us");
	private static  String REGION    = System.getProperty("region", "DFW");

	private static String       CONTAINER                   = "cdn";
	private static final int    THREADS                     = Integer.getInteger("upload.threadpool.size", 10);

	private static CloudFileFilter fileFilter                  = null;

	private CloudFilesApi       cloudFilesApi;
	private final BlobStore     blobStore;

	public RackspaceCDNProvider(final String container)
	{
		CONTAINER = container;
		final ContextBuilder cbuilder = ContextBuilder.newBuilder(PROVIDER);
		cbuilder.credentials(getLoginName(), getAPIKey());
		blobStore = cbuilder.buildView(BlobStoreContext.class).getBlobStore();
		cloudFilesApi = blobStore.getContext().unwrapApi(CloudFilesApi.class);
	}

	public RackspaceCDNProvider()
	{
		final ContextBuilder cbuilder = ContextBuilder.newBuilder(PROVIDER);
		cbuilder.credentials(getLoginName(), getAPIKey());
		blobStore = cbuilder.buildView(BlobStoreContext.class).getBlobStore();
		cloudFilesApi = blobStore.getContext().unwrapApi(CloudFilesApi.class);
	}

	/**
	 * {@inheritDoc}
	 * 
	 * @see CloudProvider#pushFileToCDN(java.lang.String)
	 */
	@Override
	public boolean pushFileToCDN(final File file)
	{
		final ObjectApi objectApi = cloudFilesApi.objectApiInRegionForContainer(REGION, CONTAINER);
		
		final ByteSource byteSource = Files.asByteSource(file);
		final Payload payload = Payloads.newByteSourcePayload(byteSource);
		//SwiftObject payload1 = SwiftObject.builder().headers(ImmutableMultimap.<String, String> of(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN,"*")).payload(payload).build();
		//final Map<String, String> metadata = ImmutableMap.of("Access-Control-Allow-Origin", "*");
		final Map<String, String> metadata = new HashMap<String, String>();
		final String etag = objectApi.replace(file.getName(), payload, metadata);
		

		return (etag != null);
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public boolean pushDirectoryToCDN(final String directory, final String includeFile)
	{
		fileFilter = new CloudFileFilter(includeFile);
		final int res = pushDirectoryToCDN(directory);
		return res >= 0;
	}

	/**
	 * {@inheritDoc}
	 * 
	 * @see CloudProvider#pushDirectoryToCDN(String)
	 */
	@Override
	public int pushDirectoryToCDN(final String directory)
	{
		final File dir = new File(directory);

		if (!dir.isDirectory())
		{
			System.err.println("Given path is not a directory: " + directory);
			return -1;
		}

		if (!dir.canRead())
		{
			System.err.println("Cannot read given directory: " + directory);
			return -1;
		}

		System.out.format("Uploading %s to %s", dir.getAbsolutePath(), CONTAINER);
		final List<BlobDetail> blobDetails = Lists.newArrayList();
		generateFileList(dir, "resources/", blobDetails);

		try
		{
			uploadFiles(CONTAINER, blobDetails);
			
		}
		catch (InterruptedException | ExecutionException e)
		{
			e.printStackTrace();
			System.err.println("Unable to upload directory: " + e.getMessage());
		}

		return 0;
	}

	/**
	 * Only 25 cdn object purges allowed per day.
	 * {@inheritDoc}
	 * 
	 * @see CloudProvider#purgeFileFromCDN(String)
	 */
	@Override
	public boolean purgeFileFromCDN(final String filePath)
	{
		final CDNApi cdnApi = cloudFilesApi.cdnApiInRegion(REGION);

		final List<String> emails = new ArrayList<>();
		//emails.add("yevgen.golubenko@getinsured.com");
		//emails.add("vinayak@getinsured.com");
		emails.add("biswakalyan.nayak@xoriant.com");

		final boolean result = cdnApi.purgeObject(CONTAINER, filePath, emails);

		System.out.println("Purged file: " + filePath + " = " + result);

		return result;
	}

	/**
	 * {@inheritDoc}
	 * 
	 * @see CloudProvider#deleteFileFromCDN(String)
	 */
	@Override
	public boolean deleteFileFromCDN(final String filePath)
	{
		final ObjectApi objectApi = cloudFilesApi.objectApiInRegionForContainer(REGION, CONTAINER);
		final ObjectList objects = objectApi.list(ListContainerOptions.NONE);

		for (final SwiftObject object : objects)
		{
			if (object.getName().equals(filePath))
			{
				System.out.println(object.getName() + "; " + object.getLastModified() + "; uri: " + object.getUri() + "; etag: "
						+ object.getEtag());
				objectApi.delete(object.getName());
				System.out.format("DELETED file from bucket : %s%n", filePath);
				return true;
			}
		}

		return false;
	}
	
	/**
	 * {@inheritDoc}
	 * 
	 * @see CloudProvider#deleteFilesFromCDN(List)
	 */
	@Override
	public int deleteFilesFromCDN(final List<String> filePaths)
	{
		final ObjectApi objectApi = cloudFilesApi.objectApiInRegionForContainer(REGION, CONTAINER);
		final ObjectList objects = objectApi.list(ListContainerOptions.NONE);

		/*
		 * BulkApi bulkApi = cloudApi.bulkApiInRegion(REGION);
		 * bulkApi.bulkDelete(filePaths);
		 */

		int count = 0;
		for (final String path : filePaths)
		{
			for (final SwiftObject object : objects)
			{
				if (object.getName().equals(path))
				{
					System.out.println(object.getName() + "; " + object.getLastModified() + "; uri: " + object.getUri() + "; etag: "
							+ object.getEtag());
					objectApi.delete(object.getName());
					count++;
				}
			}
		}

		return count;
	}
	
	/**
	 * Delete all file content from bucket.
	 * {@inheritDoc}
	 * 
	 * @see CloudProvider#deleteFileFromCDN()
	 */
	@Override
	public int deleteFileFromCDN()
	{
		final ObjectApi objectApi = cloudFilesApi.objectApiInRegionForContainer(REGION, CONTAINER);
		final ObjectList objects = objectApi.list(ListContainerOptions.NONE);
		int count = 0;
		for (final SwiftObject object : objects)
		{
			try {
				System.out.println(object.getName() + "; " + object.getLastModified() + "; uri: " + object.getUri() + "; etag: "+ object.getEtag());
				objectApi.delete(object.getName());
				System.out.println("DELETED file from CDN: " +  object.getName());
				count++;
			} catch (Exception e) {
				System.out.println("DELETE fail for file from CDN: " +  object.getName());
			}
		}

		return count;
	}

	/**
	 * This method will create a container on remote server where you can store
	 * and retrieve any kind of digital asset.
	 * 
	 * @param name name of the container.
	 * @return true if container was created, false if container already
	 *         existed.
	 */
	@Override
	public boolean createContainer(final String name)
	{
		 Map<String, String> headers = ImmutableMap.of("X-Container-Meta-Access-Control-Allow-Origin", "*",
			        "X-Container-Meta-Access-Control-Expose-Headers", "Access-Control-Allow-Origin X-Container-Meta-Access-Control-Allow-Origin");
		CreateContainerOptions options = CreateContainerOptions.Builder.metadata(headers);
		final boolean created = cloudFilesApi.containerApiInRegion(REGION).createIfAbsent(name, options);
		return created;
	}

	/**
	 * This method will put your container on a CDN and
	 * make it 100% publicly accessible over the Internet.
	 * 
	 * @param name name of the container.
	 */
	@Override
	public boolean enableContainer(final String name)
	{
		final CDNApi cdnApi = cloudFilesApi.cdnApiInRegion(REGION);
		final URI cdnURI = cdnApi.enable(name);
		return (cdnURI != null);
	}
	
	
	/**
	 * This method will return your container  SSL URI.
	 * 
	 * @param name name of the container.
	 */
	@Override
	public URI getSSLUriOfContainer(final String bucketName)
	{
		return cloudFilesApi.cdnApiInRegion(REGION).get(bucketName).getSslUri();
	}

	/**
	 * {@inheritDoc}
	 * 
	 * @see CloudProvider#disableContainer(String)
	 */
	@Override
	public boolean disableContainer(final String name)
	{
		final CDNApi cdnApi = cloudFilesApi.cdnApiInRegion(REGION);
		return cdnApi.disable(name);
	}

	/**
	 * {@inheritDoc}
	 * 
	 * @see CloudProvider#getFileURL(java.lang.String)
	 */
	@Override
	public String getFileURL(final String filePath)
	{
		final CDNApi cdnApi = cloudFilesApi.cdnApiInRegion(REGION);
		@SuppressWarnings("unused")
		final CDNContainer container = cdnApi.get(CONTAINER);
		return "";
	}

	/**
	 * {@inheritDoc}
	 * 
	 * @see CloudProvider#getLoginName()
	 */
	@Override
	public String getLoginName()
	{
		return CLOUD_SERVER_LOGIN_NAME;
	}

	/**
	 * {@inheritDoc}
	 * 
	 * @see CloudProvider#getAPIKey()
	 */
	@Override
	public String getAPIKey()
	{
		return CLOUD_SERVER_API_KEY;
	}

	/**
	 * {@inheritDoc}
	 * 
	 * @see CloudProvider#getAccountNumber()
	 */
	@Override
	public String getAccountNumber()
	{
		return CLOUD_SERVER_ACCOUNT_NUMBER;
	}

	/**
	 * {@inheritDoc}
	 * 
	 * @see CloudProvider#getAPIURL()
	 */
	@Override
	public String getAPIURL()
	{
		return CLOUD_SERVER_API_URL;
	}

	/**
	 * Closes cloud api.
	 */
	@Override
	public void close() throws IOException
	{
		Closeables.close(cloudFilesApi, true);
	}

	/**
	 * Recursively generate the list of files to upload.
	 */
	private void generateFileList(final File localDir, final String remotePath, final List<BlobDetail> blobDetails)
	{
		for (final File localFile : localDir.listFiles(getFileFilter()))
		{
			final String remoteBlobName = remotePath + localFile.getName();

			if (localFile.isFile())
			{
				blobDetails.add(new BlobDetail(remoteBlobName, localFile));
			}
			else
			{
				generateFileList(localFile, remoteBlobName + "/", blobDetails);
			}
		}
	}

	/**
	 * Returns file filter to be used.
	 * 
	 * @return {@link CloudFileFilter}
	 */
	private CloudFileFilter getFileFilter()
	{
		if (fileFilter == null)
		{
			return new CloudFileFilter();
		}

		return fileFilter;
	}

	/**
	 * Upload the files in parallel.
	 */
	private void uploadFiles(final String container, final List<BlobDetail> blobDetails)
			throws InterruptedException, ExecutionException
	{
		final ListeningExecutorService executor = MoreExecutors.listeningDecorator(newFixedThreadPool(THREADS));
		final List<ListenableFuture<BlobDetail>> blobUploaderFutures = Lists.newArrayList();
		final BlobUploaderCallback blobUploaderCallback = new BlobUploaderCallback();

		try
		{
			for (final BlobDetail blobDetail : blobDetails)
			{
				
				final BlobUploader blobUploader = new BlobUploader(container, blobDetail, blobStore);
				final ListenableFuture<BlobDetail> blobDetailFuture = executor.submit(blobUploader);
				blobUploaderFutures.add(blobDetailFuture);

				Futures.addCallback(blobDetailFuture, blobUploaderCallback);
			}

			final ListenableFuture<List<BlobDetail>> future = Futures.successfulAsList(blobUploaderFutures);

			// start upload
			final List<BlobDetail> uploadedBlobDetails = future.get();

			System.out.format("%n");

			for (int i = 0; i < uploadedBlobDetails.size(); i++)
			{
				if (uploadedBlobDetails.get(i) != null)
				{
					final BlobDetail blobDetail = uploadedBlobDetails.get(i);
					System.out.format("  %s (eTag: %s)%n", blobDetail.getRemoteBlobName(), blobDetail.getETag());
				}
				else
				{
					System.out.format(" %s (ERROR)%n", blobDetails.get(i).getLocalFile().getAbsolutePath());
				}
			}
		}
		finally
		{
			executor.shutdown();
		}
	}

	/**
	 * Updates container and enables CORS on it.
	 * 
	 * @param containerName name of the container.
	 */
	public void updateCorsContainer(final String containerName)
	{
		final Map<String, String> corsMetadata = ImmutableMap.of(
		        "Access-Control-Allow-Origin", "*",
		        "X-Container-Meta-Access-Control-Allow-Origin", "*",
		        "X-Container-Meta-Access-Control-Expose-Headers", "Access-Control-Allow-Origin X-Container-Meta-Access-Control-Allow-Origin");// containerName.substring(4));

		cloudFilesApi.containerApiInRegion(REGION).updateMetadata(containerName, corsMetadata);
		final Container container = cloudFilesApi.containerApiInRegion(REGION).get(containerName);
		System.out.format("metadata => %s%n", container.getMetadata());
	}
	
	/**
	 * Updates container and set ttl on it. minimum ttl can be 900
	 * 
	 * @param containerName name of the container.
	 * @ttl time 
	 */
	public void updateContainerTTL(final String containerName, int ttl)
	{
		final CDNApi cdnApi = cloudFilesApi.cdnApiInRegion(REGION);
		UpdateCDNContainerOptions options = new UpdateCDNContainerOptions().ttl(ttl);
		cdnApi.update(containerName, options);
		
	}
	
	/**
	 * Updates container and set logRetention on it. value is boolean
	 * 
	 * @param containerName name of the container.
	 * @param logRetentionBoolean boolean true or false 
	 */
	public boolean updateContainerLogRetention(final String containerName, boolean logRetentionBoolean)
	{
		final CDNApi cdnApi = cloudFilesApi.cdnApiInRegion(REGION);
		UpdateCDNContainerOptions options = new UpdateCDNContainerOptions().logRetention(logRetentionBoolean);
		return cdnApi.update(containerName, options);
		
	}
	
	public static void main(final String[] args)
	{
		if(args != null && args.length>=6){
			populateBasicData(args);
			String command = args[6];
			
			if (args != null && args.length == 9 && command.equals("--setup-bucket"))
			{
				CDNCommandLineHelper.setupContainer(args);
				
			}else if (args != null && args.length == 8 && command.equals("--create-bucket"))
			{
				CDNCommandLineHelper.createContainer(args);
			}else if (args != null && args.length == 8 && command.equals("--enable-bucket"))
			{
				CDNCommandLineHelper.enableContainer(args);
			}else if (args != null && args.length == 8 && command.equals("--disable-bucket"))
			{
				CDNCommandLineHelper.disableContainer(args);
			}else if (args != null && args.length == 9 && command.equals("--set-ttl"))
			{
				CDNCommandLineHelper.updateTTLForContainer(args);
			}else if (args != null && args.length == 8 && command.equals("--enable-logging"))
			{
				CDNCommandLineHelper.updateLogRetentionForContainer(args);
			}else if (args != null && args.length == 8 && command.equals("--disable-logging"))
			{
				CDNCommandLineHelper.updateLogRetentionForContainer(args);
			}else if (args != null && args.length == 9 && command.equals("--enable-cors-file"))
			{
				System.out.println("Funactonality Currently Not Available.");
			}else if (args != null && args.length == 8 && command.equals("--enable-cors"))
			{
				CDNCommandLineHelper.enableCors(args);
			}else if (args != null && args.length == 9 && command.equals("--purge"))
			{
				System.out.println("Funactonality Currently Not Available.");
			}else if (args != null && args.length >= 7 && command.startsWith("--delete"))
			{
				CDNCommandLineHelper.deleteFile(args);
			}else if(args != null && args.length >= 8 && command.startsWith("--push")){
				CDNCommandLineHelper.pushToContainer(args);
			}else{
				System.out.println("No command found. Please check the provided parameter.");
			}
		}else{
			System.err.format("%nInvalid number of arguments: %s . Please provide valid parameter list.%n",Arrays.asList(args));
		}
		
		
		//		try
		//		{
		//			//provider.pushFileToCDN("file.png");
		//			//provider.purgeFileFromCDN(FILE_TEST_NAME + ".txt");
		//			//final boolean deleted = provider.deleteFileFromCDN(FILE_TEST_NAME + ".txt");
		//			//provider.pushDirectoryToCDN("/home/jeneag/projects/state-main/ghix/ghix-web/src/main/webapp/resources");
		//			//provider.close();
		//		}
		//		catch (final IOException e)
		//		{
		//			e.printStackTrace();
		//			System.err.println("Could not close RackspaceCDNProvider: " + e.getMessage());
		//		}
	}

	private static void populateBasicData(String[] args) {
		System.out.format("%nProvide basic parameter list: %s%n",Arrays.asList(args));
		//This validate basic argument should not be empty or null.
		validateBasicInputData(args);
		//For safe hand populating default but default value never considered.
		CLOUD_SERVER_API_URL		=args[0]!=null?args[0]:CLOUD_SERVER_API_URL;//https://identity.api.rackspacecloud.com/v2.0/
		CLOUD_SERVER_LOGIN_NAME		=args[1]!=null?args[1]:CLOUD_SERVER_LOGIN_NAME;//getinsuredbuild
		CLOUD_SERVER_API_KEY		=args[2]!=null?args[2]:CLOUD_SERVER_API_KEY;//630c21b0fb0ada6bfb8074e66be55664
		CLOUD_SERVER_ACCOUNT_NUMBER	=args[3]!=null?args[3]:CLOUD_SERVER_ACCOUNT_NUMBER;//668207
		PROVIDER					=args[4]!=null?args[4]:PROVIDER;//rackspace-cloudfiles-us
		REGION						=args[5]!=null?args[5]:REGION;//DFW
	}

	private static boolean validateBasicInputData(String[] args) {
		boolean isValid = false;
		for (int plaeHolder = 0; plaeHolder < args.length; plaeHolder++) {
			if(args[plaeHolder] == null || args[plaeHolder].isEmpty()){
				System.err.format("%n%nInvalid argument. PLease check the argument value");
				System.exit(-1);
			}
		}
		
		return isValid;
	}
		
		//		try
		//		{
		//			//provider.pushFileToCDN("file.png");
		//			//provider.purgeFileFromCDN(FILE_TEST_NAME + ".txt");
		//			//final boolean deleted = provider.deleteFileFromCDN(FILE_TEST_NAME + ".txt");
		//			//provider.pushDirectoryToCDN("/home/jeneag/projects/state-main/ghix/ghix-web/src/main/webapp/resources");
		//			//provider.close();
		//		}
		//		catch (final IOException e)
		//		{
		//			e.printStackTrace();
		//			System.err.println("Could not close RackspaceCDNProvider: " + e.getMessage());
		//		}
	
}
