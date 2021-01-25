#!/bin/bash

MAIN_DIR=$(pwd)
set -x
#WORK_PATH=$HOME/testrun/$1
#CY_BIN_DIR=$WORK_PATH/cypress-e2e/node_modules/.bin
TEST_ENV=$1


echo "Build #$1; working directory: ${WORK_PATH}; current directory: ${MAIN_DIR}";

exit_codes=0
function sec {
        exit_codes=$((exit_codes + $1))
}



echo "Navigate to WORK_PATH"
#cd $MAIN_DIR
#cp -r $MAIN_DIR/iex/qa-automation $WORK_PATH
#cd $WORK_PATH/cypress-e2e

#echo "NPM run"
#npm install; sec $?

#npm run runSpec
#npm run cleanup; sec $?
#
concurTestCases=5

cd ..

pwd


#for tc in cypress/integration/regression/cic/*
#do
#		npx cypress run --spec ${tc} --env configFile=$TEST_ENV --browser chrome --reporter mochawesome; sec $?
#done


testCases=()
#for tc in cypress/integration/regression/**/*
for tc in cypress/integration/regression/rerun/*
do
	testCases+=( "$tc" )
done

for (( n=0; n<${#testCases[@]}; n+=${concurTestCases} ))
do
	pids=""
	for (( k=0; k < ${concurTestCases}; k++))
		do
			index=$n+$k
			if [[ $index -lt ${#testCases[@]} ]]; then
				echo "Processing ${testCases[$index]}"
				echo "...."
				sleep 30; npx cypress run --spec ${testCases[$n+$k]} --env configFile=$TEST_ENV --reporter mochawesome &
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