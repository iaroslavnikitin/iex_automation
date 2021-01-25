/**
 * 
 */
package com.getinsured.cdn.cloud.compressor;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.io.Writer;

import org.apache.commons.io.IOUtils;
import org.mozilla.javascript.ErrorReporter;
import org.mozilla.javascript.EvaluatorException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.yahoo.platform.yui.compressor.JavaScriptCompressor;

/**
 * Compresses JavaScript/CSS files.
 * 
 * @author Yevgen Golubenko
 */
public class CloudCompressor
{
	private static final Logger log = LoggerFactory.getLogger(CloudCompressor.class);

	public static void main(final String[] args)
	{
		log.info("CloudCompressor()");
	}

	/**
	 * Compresses given JavaScript file.
	 * 
	 * @param inputFilename input file to compress
	 * @param outputFilename output file
	 * @param o options
	 * @throws IOException if io exception is thrown
	 */
	public static void compressJavaScript(final String inputFilename, final String outputFilename, final Options o) throws IOException
	{
		Reader in = null;
		Writer out = null;
		try
		{
			in = new InputStreamReader(new FileInputStream(inputFilename), o.charset);

			final JavaScriptCompressor compressor = new JavaScriptCompressor(in, new CloudErrorReporter());
			in.close();
			in = null;

			out = new OutputStreamWriter(new FileOutputStream(outputFilename), o.charset);
			compressor.compress(out, o.lineBreakPos, o.munge, o.verbose, o.preserveAllSemiColons, o.disableOptimizations);
		}
		finally
		{
			IOUtils.closeQuietly(in);
			IOUtils.closeQuietly(out);
		}
	}

	private static class CloudErrorReporter implements ErrorReporter
	{
		@Override
		public void warning(final String message, final String sourceName, final int line, final String lineSource, final int lineOffset)
		{
			if (line < 0)
			{
				log.warn(message);
			}
			else
			{
				log.warn(line + ':' + lineOffset + ':' + message);
			}
		}

		@Override
		public void error(final String message, final String sourceName, final int line, final String lineSource, final int lineOffset)
		{
			if (line < 0)
			{
				log.error(message);
			}
			else
			{
				log.error(line + ':' + lineOffset + ':' + message);
			}
		}

		@Override
		public EvaluatorException runtimeError(final String message, final String sourceName, final int line, final String lineSource, final int lineOffset)
		{
			error(message, sourceName, line, lineSource, lineOffset);
			return new EvaluatorException(message);
		}
	}

	public static class Options
	{
		public String  charset               = "UTF-8";
		public int     lineBreakPos          = -1;
		public boolean munge                 = true;
		public boolean verbose               = true;
		public boolean preserveAllSemiColons = false;
		public boolean disableOptimizations  = false;
	}
}
