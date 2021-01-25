/**
 * 
 */
package com.getinsured.cdn.cloud;

import java.io.File;

/**
 * Blob details class.
 * 
 * @author Yevgen Golubenko
 */
public class BlobDetail
{
	private final String remoteBlobName;
	private final File   localFile;
	private final String eTag;

	protected BlobDetail(final String remoteBlobName, final File localFile)
	{
		this(remoteBlobName, localFile, null);
	}

	protected BlobDetail(final String remoteBlobName, final File localFile, final String eTag)
	{
		this.remoteBlobName = remoteBlobName;
		this.localFile = localFile;
		this.eTag = eTag;
	}

	public String getRemoteBlobName()
	{
		return remoteBlobName;
	}

	public File getLocalFile()
	{
		return localFile;
	}

	public String getETag()
	{
		return eTag;
	}

	public boolean isUploaded()
	{
		return eTag != null;
	}
}
