echo "==============================="
echo "Deploying on sahithyandev.github.io"
echo "==============================="
echo ""

FOLDER_NAME="../blog-deploy/"

## Fail if the folder doesn't already exists
if [ ! -d $FOLDER_NAME ]; then
	echo "ERROR::" $FOLDER_NAME "doesn't exist"
	exit
fi

if [ ! -d $FOLDER_NAME/.git ]; then
	echo "ERROR::" $FOLDER_NAME "is not a git repo"
	exit
fi

node scripts/generate-sitemap.js

## These commands will export the site into a folder named "out"

yarn run build
yarn run export

# git clone git@github.com:sahithyandev/sahithyandev.github.io.git $FOLDER_NAME

rm -r $FOLDER_NAME/*
echo "Deleted the files inside" $FOLDER_NAME

## Move out/* into that folder
cp -r out/* $FOLDER_NAME
echo "Copied the files from out/ to" $FOLDER_NAME

cd $FOLDER_NAME

touch .nojekyll
git add .
git commit -a -m "Automated deployment"

git push origin main

echo ""
echo "Deployed successfully"