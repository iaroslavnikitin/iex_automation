package com.getinsured.cdn.cloud;

import com.google.common.util.concurrent.FutureCallback;

/**
 * 
 * @author Yevgen Golubenko
 */
public class BlobUploaderCallback implements FutureCallback<BlobDetail>
{
	@Override
	public void onSuccess(final BlobDetail result)
	{
		System.out.format("%nPushed: %s to %s [E-Tag: %s]%n", result.getLocalFile(), result.getRemoteBlobName(), result.getETag());
	}

	@Override
	public void onFailure(final Throwable t)
	{
		System.out.format("X %s", t);
	}
}
