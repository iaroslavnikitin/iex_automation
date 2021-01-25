/**
 * 
 */
package com.getinsured.cdn.cloud;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;

import junit.framework.Assert;

import org.apache.commons.io.FileUtils;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.BlockJUnit4ClassRunner;

/**
 * @author Yevgen Golubenko
 */
@RunWith(BlockJUnit4ClassRunner.class)
public class CDNProviderTest
{
	private CloudProvider provider = null;
	private File          temporaryFile = null;
	private static final Date   now                 = new Date();
	private static final String TEST_CONTAINER_NAME = "JUNITCONTAINERTEST";

	@Before
	public void setup() throws IOException
	{
		provider = new RackspaceCDNProvider();
		temporaryFile = new File(FileUtils.getTempDirectoryPath() + "/CDNProviderTest.txt");
		temporaryFile.setReadable(true);
		temporaryFile.setWritable(true);

		Assert.assertNotNull("provider is null, cannot run tests", provider);
		Assert.assertNotNull("Temporary file is null, cannot run tests", temporaryFile);

		final FileOutputStream fos = new FileOutputStream(temporaryFile);
		final String text = "This is text. Date: [" + now.toString() + "]";
		fos.write(text.getBytes());
		fos.close();
	}

	@After
	public void cleanup() throws IOException
	{
		if (temporaryFile != null)
		{
			temporaryFile.delete();
		}
	}

	@Test
	public void pushFileToCDN() throws IOException
	{

		final boolean pushed = provider.pushFileToCDN(temporaryFile);
		Assert.assertTrue("File was not pushed to CDN", pushed);
	}

	@Test
	public void purgeFileFromCDN()
	{
		final boolean pushed = provider.pushFileToCDN(temporaryFile);

		if (pushed)
		{
			final boolean purged = provider.purgeFileFromCDN(temporaryFile.getName());
			Assert.assertTrue("File was not purged from CDN", purged);
		}
	}

	@Test
	public void deleteFileFromCDN()
	{
		final boolean pushed = provider.pushFileToCDN(temporaryFile);

		if (pushed)
		{
			final boolean deleted = provider.deleteFileFromCDN(temporaryFile.getName());
			Assert.assertTrue("Was not able to delete file from CDN", deleted);
		}
	}

	@Test
	public void createContainer()
	{
		final boolean createdOrExisted = provider.createContainer(TEST_CONTAINER_NAME);

		if (createdOrExisted)
		{
			System.out.println("Container created [" + TEST_CONTAINER_NAME + "]");
		}
		else
		{
			System.out.println("Container already existed [" + TEST_CONTAINER_NAME + "]");
		}
	}

	@Test
	public void enableContainer()
	{
		final boolean enabled = provider.enableContainer(TEST_CONTAINER_NAME);
		Assert.assertTrue("Not able to enable container [" + TEST_CONTAINER_NAME + "]", enabled);
	}

	@Test
	public void disableContainer()
	{
		final boolean disabled = provider.disableContainer(TEST_CONTAINER_NAME);
		Assert.assertTrue("Not able to disable container [" + TEST_CONTAINER_NAME + "]", disabled);
	}
}
