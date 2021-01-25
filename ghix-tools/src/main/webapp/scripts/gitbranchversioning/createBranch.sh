. branching.properties
cd $GHIX_HOME
echo 'New branch will be created with name:' $NEW_BRANCH_NAME
echo 'Snapshot version of the new branch will be:' $NEW_BRANCH_SNAPSHOT_VERSION
read -p 'Press 'Enter' to continue.'

SOURCE_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo 'Creating branch from '$SOURCE_BRANCH

git checkout -b $NEW_BRANCH_NAME
NEW_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo 'Created Branch :'$NEW_BRANCH

version=$NEW_BRANCH_SNAPSHOT_VERSION
mvn versions:set versions:update-child-modules -DgenerateBackupPoms=false -DnewVersion=$version

if test ${PIPESTATUS[0]} -eq 0
then
git status
read -p 'Press any key to continue.'
git commit -am 'DEVOPS-459:Created branch '$NEW_BRANCH' from '$SOURCE_BRANCH' and updated pom versions with snapshot versions '$version
git push -u origin $NEW_BRANCH
git diff $SOURCE_BRANCH...$NEW_BRANCH
else 
echo 'Failed to update poms'
fi
