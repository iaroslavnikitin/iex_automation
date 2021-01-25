/**
 * 
 */
package com.getinsured.cdn.cloud;

import java.io.File;

/**
 * File filter for CDN files.
 * 
 * @author Yevgen Golubenko,BK
 */
public class CloudFileFilter implements java.io.FileFilter
{
	private String singleFile = null;

	public CloudFileFilter()
	{
		singleFile = null;
	}

	public CloudFileFilter(final String singleFile)
	{
		this.singleFile = singleFile;
	}

	/**
	 * Routine to accept only files that we are interested
	 * in to be hosted on remote CDN server.
	 */
	@Override
	public boolean accept(final File pathname)
	{
		if (singleFile != null)
		{
			if (pathname.isDirectory() || pathname.getAbsolutePath().contains(singleFile))
			{
				System.out.println("\nAccepting file: " + pathname);
				return true;
			}

			return false;
		}
		else if (singleFile != null)
		{
			return false;
		}

		// If its not hidden and we can read it and it doesn't start
		// with the dot '.' - We accept directories here because we do recursive 
		// loop to add directories and sub directories with files.
		if (/* pathname.isFile() && */
				!pathname.isHidden() &&
				pathname.canRead() && 
				!pathname.getName().startsWith("."))
		{
			if (pathname.isDirectory() ||
					pathname.getName().toLowerCase().endsWith(".js") ||
					pathname.getName().toLowerCase().endsWith(".json") ||
					pathname.getName().toLowerCase().endsWith(".css") ||
					pathname.getName().toLowerCase().endsWith(".png") ||
					pathname.getName().toLowerCase().endsWith(".jpg") ||
					pathname.getName().toLowerCase().endsWith(".txt") ||
					pathname.getName().toLowerCase().endsWith(".gif") ||
					pathname.getName().toLowerCase().endsWith(".swf") ||
					pathname.getName().toLowerCase().endsWith(".flv") ||
					pathname.getName().toLowerCase().endsWith(".pdf") ||
					pathname.getName().toLowerCase().endsWith(".jpeg") ||
					pathname.getName().toLowerCase().endsWith(".bmp") ||
			        pathname.getName().toLowerCase().endsWith(".tiff") ||
			        pathname.getName().toLowerCase().endsWith(".woff") ||
			        pathname.getName().toLowerCase().endsWith(".tff") ||
			        pathname.getName().toLowerCase().endsWith(".map") ||
			        pathname.getName().toLowerCase().endsWith(".ico") ||
			        pathname.getName().toLowerCase().endsWith(".htc") ||
			        pathname.getName().toLowerCase().endsWith(".scss") ||
			        pathname.getName().toLowerCase().endsWith(".otf") ||
			        pathname.getName().toLowerCase().endsWith(".ttf") ||
			        pathname.getName().toLowerCase().endsWith(".eot") ||
			        pathname.getName().toLowerCase().endsWith(".woff2") ||
			        pathname.getName().toLowerCase().endsWith(".svg"))
			{
				System.out.println("Queuing file: " + pathname.getName());
				return true;
			}
		}
		System.out.println("Ignoring file: " + pathname.getName());
		return false;
	}
}
