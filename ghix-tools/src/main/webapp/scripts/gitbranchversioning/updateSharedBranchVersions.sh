. branching.properties
cd $GHIX_HOME
SOURCE_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo 'Updating '$SOURCE_BRANCH' shared.branch.version to' $NEW_BRANCH_SHARED_MODEL_DEPENDENCY_VERSION
read -p 'Press 'Enter' key to continue.'

mvn replacer:replace -Dreplacer.shared.branch.version=$NEW_BRANCH_SHARED_MODEL_DEPENDENCY_VERSION -Pversioning

	if test ${PIPESTATUS[0]} -eq 0
	then	
	git status
	read -p 'Press any key to continue.'
	git commit -am 'Updated shared dependencies for '$SOURCE_BRANCH' with '$NEW_BRANCH_SHARED_MODEL_DEPENDENCY_VERSION
	git push -u origin $SOURCE_BRANCH
	else 
	echo 'Failed to update shared dependencies'
	fi
