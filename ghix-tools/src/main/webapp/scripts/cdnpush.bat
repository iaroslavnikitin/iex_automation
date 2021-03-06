REM Someone please create bat file if you need it.
#!/bin/bash
LIBS=../WEB-INF/lib
CLASSES=../WEB-INF/classes
CLASSPATH=${CLASSPATH}
echo "***"
echo "Use FULL directory path, e.g. /home/user/webapp/resources and not ~/webapp/resources!!!"
echo "***"

if [ ! -e $LIBS ] ; then
	echo " ";
	echo "${LIBS} does not exist."
	echo "This file meant to be run from extracted WAR file. Looks like you are running it not from within extracted WAR."
	echo " ";
	exit;
fi

if [ ! -e $CLASSES ] ; then
	echo " ";
	echo "$CLASSES does not exist."
	echo "This file meant to be run from extracted WAR file. Looks like you are running it not from within extracted WAR."
	echo " ";
	exit;
fi

for jar in `ls $LIBS` ; do
	CLASSPATH=$CLASSPATH';'$LIBS/$jar;
	echo $jar
done
CLASSPATH=$CLASSPATH';'$CLASSES;

CLOUD_SERVER_API_URL=https://identity.api.rackspacecloud.com/v2.0/
CLOUD_SERVER_LOGIN_NAME=getinsuredbuild
CLOUD_SERVER_API_KEY=630c21b0fb0ada6bfb8074e66be55664
CLOUD_SERVER_ACCOUNT_NUMBER=668207
PROVIDER=rackspace-cloudfiles-us
REGION=DFW
COMMAND_NAME=$1
BUCKET_KEY=$2
FILE_PATH=$3
FILE_NAME=$4
java -classpath $CLASSPATH com.getinsured.cdn.cloud.RackspaceCDNProvider $CLOUD_SERVER_API_URL $CLOUD_SERVER_LOGIN_NAME $CLOUD_SERVER_API_KEY $CLOUD_SERVER_ACCOUNT_NUMBER $PROVIDER $REGION $COMMAND_NAME $BUCKET_KEY $FILE_PATH $FILE_NAME
