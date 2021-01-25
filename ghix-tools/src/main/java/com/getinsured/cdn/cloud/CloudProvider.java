/**
 * 
 */
package com.getinsured.cdn.cloud;

import java.io.File;
import java.net.URI;
import java.util.List;

/**
 * Cloud CDN provider interface.
 * 
 * @author Yevgen Golubenko
 */
public interface CloudProvider
{
	/**
	 * Pushes local file to remote providers server.
	 * 
	 * @param file File to push.
	 * @return true if push was successful.
	 */
	public boolean pushFileToCDN(final File file);

	/**
	 * Pushes local directory and it's content to remote server.
	 * 
	 * @param directory directory to push.
	 * @return total number of files pushed.
	 */
	public int pushDirectoryToCDN(final String directory);

	/**
	 * Purges file from remote provider.
	 * 
	 * @param filePath file path to purge.
	 * @return true if purge is successful.
	 */
	public boolean purgeFileFromCDN(final String filePath);

	/**
	 * Deletes object from remote provider.
	 * 
	 * @param filePath file path to delete.
	 * @return true if deleted, false if file not found or delete was not
	 *         successful.
	 */
	public boolean deleteFileFromCDN(final String filePath);

	/**
	 * Deletes multiple files from remote provider.
	 * 
	 * @param filePaths list of file paths to delete.
	 * @return number of files that were deleted. Compare this to original
	 *         request
	 *         to make sure you've deleted everything that was needed.
	 */
	public int deleteFilesFromCDN(final List<String> filePaths);
	
	/**
	 * Deletes All files from remote bucket.
	 * 
	 * @return number of files that were deleted. 
	 */
	public int deleteFileFromCDN();

	/**
	 * Returns file URL on the remote server.
	 * 
	 * @param filePath relative file path.
	 * @return full url.
	 */
	public String getFileURL(final String filePath);
	
	/**
	 * Creates a container on remote server where you can store
	 * and retrieve any kind of digital asset.
	 * 
	 * @param name name of the container.
	 * @return true if container was created, false if container already
	 *         existed.
	 */
	public boolean createContainer(final String name);

	/**
	 * Puts given container on a CDN and makes it publicly accessible to the
	 * world.
	 * 
	 * @param name name of the container.
	 * @return true if container was enabled.
	 */
	public boolean enableContainer(final String name);

	/**
	 * Disables container on remote server and makes it unaccessible to the
	 * world.
	 * 
	 * @param name name of the container.
	 * @return true if container was disabled.
	 */
	public boolean disableContainer(final String name);

	/**
	 * Returns login name for accessing remote api.
	 * 
	 * @return login name to be used for remote authentication.
	 */
	public String getLoginName();

	/**
	 * Returns API key/token to be used in remote authentication.
	 * 
	 * @return api key/token to be used when authenticating with remote cloud
	 *         provider.
	 */
	public String getAPIKey();

	/**
	 * Returns optional account number associated with remote cloud provider.
	 * 
	 * @return account number for remote provider.
	 */
	public String getAccountNumber();

	/**
	 * Remote api url that will be used by implementation to communicate with
	 * remote provider.
	 * 
	 * @return returns remote url that this provider 'listens' on.
	 */
	public String getAPIURL();

	/**
	 * Pushes directory to remote server with only specified file filter. Useful
	 * when just want to push single file.
	 * 
	 * @param directory directory to push
	 * @param includeFile name of the file to include.
	 * @return true if pushed.
	 */
	public boolean pushDirectoryToCDN(String directory, String includeFile);

	/**
	 * This method will return your container  SSL URI.
	 * @param bucketName name of the container.
	 * @return
	 */
	public URI getSSLUriOfContainer(String bucketName);

	/**
	 * Updates container and set logRetention on it. value is boolean
	 * 
	 * @param containerName name of the container.
	 * @param logRetentionBoolean boolean true or false 
	 */
	public boolean updateContainerLogRetention(final String containerName, boolean logRetentionBoolean);

}
