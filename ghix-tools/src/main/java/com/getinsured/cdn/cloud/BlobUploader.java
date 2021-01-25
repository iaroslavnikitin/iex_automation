package com.getinsured.cdn.cloud;

import java.io.File;
import java.util.concurrent.Callable;

import org.jclouds.blobstore.BlobStore;
import org.jclouds.blobstore.domain.Blob;
import org.jclouds.io.Payloads;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.getinsured.cdn.cloud.compressor.CloudCompressor;
import com.google.common.io.ByteSource;
import com.google.common.io.Files;

/**
 * @author Yevgen Golubenko
 */
public class BlobUploader implements Callable<BlobDetail>
{
	private final String     container;
	private final BlobDetail toBeUploadedBlobDetail;
	private final BlobStore  blobStore;
	private static final Logger LOGGER = LoggerFactory.getLogger(BlobUploader.class);

	public BlobUploader(final String container, final BlobDetail toBeUploadedBlobDetail, final BlobStore blobStore)
	{
		this.container = container;
		this.toBeUploadedBlobDetail = toBeUploadedBlobDetail;
		this.blobStore = blobStore;
	}

	@Override
	public BlobDetail call() throws Exception
	{
		ByteSource byteSource = null;

		final File originalLocalFile = toBeUploadedBlobDetail.getLocalFile();
		final String name = originalLocalFile.getName();

		File tmpCompressed = null;
		if (name.endsWith(".js"))
		{
			final File tmp = File.createTempFile("tmp-minified-file", ".js");
			tmp.deleteOnExit();
			//System.out.println("Compressing: " + originalLocalFile.getAbsolutePath() + " > " + tmp.getAbsolutePath());
			try
			{
				CloudCompressor.compressJavaScript(originalLocalFile.getAbsolutePath(), tmp.getAbsolutePath(), new CloudCompressor.Options());
				byteSource = Files.asByteSource(tmp);
				tmpCompressed = tmp;
			}
			catch (final Exception e)
			{
				// Fallback to original file content
				LOGGER.error(""+e);
				byteSource = Files.asByteSource(originalLocalFile);
			}
		}
		else
		{
			byteSource = Files.asByteSource(originalLocalFile);
		}

		final Blob blob = blobStore.blobBuilder(toBeUploadedBlobDetail.getRemoteBlobName())
				.payload(Payloads.newByteSourcePayload(byteSource))
				.contentType("") // content type to be determinated by the rackspace cloud file storage
				.build();

		final String eTag = blobStore.putBlob(container, blob);
		BlobDetail uploadedBlobDetail = null;

		if (tmpCompressed == null)
		{
			//System.out.println("publishing un-compressed file: " + toBeUploadedBlobDetail.getLocalFile().getName());
			uploadedBlobDetail = new BlobDetail(
					toBeUploadedBlobDetail.getRemoteBlobName(), toBeUploadedBlobDetail.getLocalFile(), eTag);
		}
		else
		{
			//System.out.println("publishing compressed file: " + tmpCompressed.getName());
			uploadedBlobDetail = new BlobDetail(
			        toBeUploadedBlobDetail.getRemoteBlobName(), tmpCompressed, eTag);
		}

		return uploadedBlobDetail;
	}
}