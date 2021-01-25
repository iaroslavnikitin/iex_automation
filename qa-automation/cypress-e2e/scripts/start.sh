#!/bin/bash

MAIN_DIR=$(pwd)
set -x
WORK_PATH=$HOME/testrun/$1
CY_BIN_DIR=$WORK_PATH/cypress-e2e/node_modules/.bin
TEST_ENV=$2

if [ -d "iex_bk" ]; then
  rm -r -f iex_bk
fi
mv iex iex_bk
git clone https://yevgengolubenko@bitbucket.org/getinsured/iex

if [ -z ${3+x} ]
then echo "branch is unset - using master"
else cd iex; git checkout $3
cd ~/
fi

echo "Build #$1; working directory: ${WORK_PATH}; current directory: ${MAIN_DIR}";

exit_codes=0
function sec {
        exit_codes=$((exit_codes + $1))
}


echo "GIT commands"
cd $MAIN_DIR/iex


echo "Navigate to WORK_PATH"
cd $MAIN_DIR
cp -r $MAIN_DIR/iex/qa-automation $WORK_PATH
cd $WORK_PATH/cypress-e2e

echo "NPM run"
npm install; sec $?

#npm run runSpec
npm run cleanup; sec $?

concurTestCases=5

pwd
testCases=()
for tc in cypress/integration/regression/**/*
#for tc in cypress/integration/regression/cic/*
do
	testCases+=( "$tc" )
done

for (( n=0; n<=${#testCases[@]}; n+=${concurTestCases} ))
do
	pids=""
	for (( nn=0; nn<${concurTestCases}; nn++))
		do
			index=$n+$nn
			if [[ $index -lt ${#testCases[@]} ]]; then
				echo "Processing ${testCases[$index]}"
				echo "...."
				sleep 30; xvfb-run -a -d "npx cypress run --spec ${testCases[$n+$nn]} --env configFile=$TEST_ENV --reporter mochawesome" &
				pids="$pids $!"
			fi
		done
	for pid in $pids; do
		wait $pid; sec $?
	done
	sleep 30
	echo "next set of files"
done

echo "Regression complete"


npm run merge_reports; sec $?
npm run generate_mochawesome_report; sec $?

echo "Exit codes: ${exit_codes}"
exit ${exit_codes}